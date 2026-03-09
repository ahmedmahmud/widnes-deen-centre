/**
 * S3-compatible media storage — the only storage backend.
 *
 * Works with any S3-compatible service: RustFS, MinIO, AWS S3, Cloudflare R2, etc.
 *
 * Required env vars:
 *   S3_ENDPOINT    — e.g. http://84.8.145.185:9000
 *   S3_BUCKET      — bucket name, e.g. "widnes-deen-centre"
 *   S3_ACCESS_KEY  — access key
 *   S3_SECRET_KEY  — secret key
 *   S3_REGION      — region (default: "us-east-1", required by SDK, ignored by RustFS/MinIO)
 *   S3_PUBLIC_URL  — (optional) public base URL if different from endpoint
 */

import { randomUUID } from "node:crypto";
import {
	CreateBucketCommand,
	DeleteObjectCommand,
	GetObjectCommand,
	HeadBucketCommand,
	PutBucketPolicyCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3";

/* ── Types ── */

export type MediaUpload = {
	buffer: Uint8Array;
	filename: string;
	mimeType: string;
};

export type StoredMedia = {
	storagePath: string;
	publicUrl: string;
	sizeBytes: number;
};

/* ── Helpers ── */

function getEnv(key: string, fallback?: string): string {
	const val = process.env[key] ?? fallback;
	if (!val) throw new Error(`Missing required env var: ${key}`);
	return val;
}

const sanitizeFilename = (filename: string) =>
	filename.replace(/[^a-zA-Z0-9_.-]/g, "_");

/* ── Client (lazy singleton) ── */

let _client: S3Client | null = null;

function getClient(): S3Client {
	if (!_client) {
		_client = new S3Client({
			endpoint: getEnv("S3_ENDPOINT"),
			region: getEnv("S3_REGION", "us-east-1"),
			forcePathStyle: true, // required for RustFS / MinIO
			credentials: {
				accessKeyId: getEnv("S3_ACCESS_KEY"),
				secretAccessKey: getEnv("S3_SECRET_KEY"),
			},
		});
	}
	return _client;
}

function getBucket(): string {
	return getEnv("S3_BUCKET");
}

/**
 * Build the public URL for an object.
 * If S3_PUBLIC_URL is set, use that as the base. Otherwise: endpoint/bucket/key.
 */
function buildPublicUrl(key: string): string {
	const publicBase = process.env.S3_PUBLIC_URL;
	if (publicBase) {
		const base = publicBase.endsWith("/") ? publicBase.slice(0, -1) : publicBase;
		return `${base}/${key}`;
	}
	const endpoint = getEnv("S3_ENDPOINT").replace(/\/$/, "");
	return `${endpoint}/${getBucket()}/${key}`;
}

/* ── Ensure bucket exists ── */

let _bucketReady = false;

async function ensureBucket() {
	if (_bucketReady) return;
	const client = getClient();
	const bucket = getBucket();
	try {
		await client.send(new HeadBucketCommand({ Bucket: bucket }));
	} catch {
		await client.send(new CreateBucketCommand({ Bucket: bucket }));
	}

	// Set public-read policy so images are accessible without auth
	const policy = JSON.stringify({
		Version: "2012-10-17",
		Statement: [
			{
				Sid: "PublicRead",
				Effect: "Allow",
				Principal: "*",
				Action: ["s3:GetObject"],
				Resource: [`arn:aws:s3:::${bucket}/*`],
			},
		],
	});
	try {
		await client.send(
			new PutBucketPolicyCommand({ Bucket: bucket, Policy: policy }),
		);
	} catch (err) {
		// Non-fatal: bucket may already have the policy, or the S3 provider
		// may not support bucket policies (fall back to per-object ACLs)
		console.warn("Could not set bucket policy (non-fatal):", err);
	}

	_bucketReady = true;
}

/* ── Public API ── */

export const mediaStorage = {
	async upload(file: MediaUpload): Promise<StoredMedia> {
		await ensureBucket();
		const client = getClient();
		const bucket = getBucket();
		const safeName = sanitizeFilename(file.filename);
		const key = `uploads/${randomUUID()}-${safeName}`;

		await client.send(
			new PutObjectCommand({
				Bucket: bucket,
				Key: key,
				Body: file.buffer,
				ContentType: file.mimeType,
				ACL: "public-read",
			}),
		);

		return {
			storagePath: key,
			publicUrl: buildPublicUrl(key),
			sizeBytes: file.buffer.length,
		};
	},

	async getObject(key: string) {
		const client = getClient();
		const bucket = getBucket();
		const response = await client.send(
			new GetObjectCommand({ Bucket: bucket, Key: key }),
		);
		return response;
	},

	async delete(storagePath: string): Promise<void> {
		const client = getClient();
		const bucket = getBucket();

		// storagePath might be a full URL or just a key — extract the key
		let key = storagePath;
		try {
			const url = new URL(storagePath);
			const bucketPrefix = `/${bucket}/`;
			if (url.pathname.startsWith(bucketPrefix)) {
				key = url.pathname.slice(bucketPrefix.length);
			} else {
				key = url.pathname.startsWith("/") ? url.pathname.slice(1) : url.pathname;
			}
		} catch {
			// Not a URL — treat as a raw key
		}

		await client.send(
			new DeleteObjectCommand({ Bucket: bucket, Key: key }),
		);
	},
};
