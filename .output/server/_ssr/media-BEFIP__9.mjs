import { d as db, m as mediaItems } from "./index-Dinle6nz.mjs";
import { randomUUID } from "node:crypto";
import { D as DeleteObjectCommand, P as PutObjectCommand, S as S3Client, H as HeadBucketCommand, C as CreateBucketCommand, a as PutBucketPolicyCommand } from "../_libs/aws-sdk__client-s3.mjs";
import "../_libs/pg.mjs";
import "../_libs/react.mjs";
import "events";
import "../_libs/pg-types.mjs";
import "../_libs/postgres-array.mjs";
import "../_libs/postgres-date.mjs";
import "../_libs/postgres-interval.mjs";
import "../_libs/xtend.mjs";
import "../_libs/postgres-bytea.mjs";
import "../_libs/pg-int8.mjs";
import "util";
import "crypto";
import "dns";
import "../_libs/pg-connection-string.mjs";
import "fs";
import "../_libs/pg-protocol.mjs";
import "net";
import "tls";
import "../_libs/pg-cloudflare.mjs";
import "../_libs/pgpass.mjs";
import "path";
import "stream";
import "../_libs/split2.mjs";
import "string_decoder";
import "../_libs/pg-pool.mjs";
import "../_libs/drizzle-orm.mjs";
import "../_libs/@aws-sdk/middleware-expect-continue+[...].mjs";
import "../_libs/smithy__protocol-http.mjs";
import "../_libs/smithy__types.mjs";
import "../_libs/@aws-sdk/middleware-host-header+[...].mjs";
import "../_libs/smithy__core.mjs";
import "../_libs/smithy__util-utf8.mjs";
import "../_libs/smithy__util-buffer-from.mjs";
import "../_libs/smithy__is-array-buffer.mjs";
import "buffer";
import "../_libs/@smithy/util-body-length-browser+[...].mjs";
import "../_libs/smithy__util-middleware.mjs";
import "../_libs/smithy__util-base64.mjs";
import "../_libs/smithy__middleware-serde.mjs";
import "../_libs/smithy__util-stream.mjs";
import "node:stream";
import "../_libs/smithy__util-hex-encoding.mjs";
import "../_libs/smithy__fetch-http-handler.mjs";
import "../_libs/smithy__node-http-handler.mjs";
import "../_libs/smithy__querystring-builder.mjs";
import "../_libs/smithy__util-uri-escape.mjs";
import "http";
import "https";
import "http2";
import "../_libs/smithy__uuid.mjs";
import "../_libs/@smithy/middleware-content-length+[...].mjs";
import "../_libs/aws-sdk__core.mjs";
import "../_libs/smithy__property-provider.mjs";
import "../_libs/smithy__signature-v4.mjs";
import "../_libs/smithy__smithy-client.mjs";
import "../_libs/smithy__middleware-stack.mjs";
import "../_libs/aws-sdk__xml-builder.mjs";
import "../_libs/fast-xml-parser.mjs";
import "../_libs/strnum.mjs";
import "../_libs/aws-sdk__util-endpoints.mjs";
import "../_libs/smithy__util-endpoints.mjs";
import "../_libs/smithy__url-parser.mjs";
import "../_libs/smithy__querystring-parser.mjs";
import "../_libs/smithy__middleware-endpoint.mjs";
import "../_libs/smithy__shared-ini-file-loader.mjs";
import "fs/promises";
import "os";
import "node:fs/promises";
import "../_libs/smithy__node-config-provider.mjs";
import "../_libs/@aws-sdk/signature-v4-multi-region+[...].mjs";
import "../_libs/aws-sdk__middleware-sdk-s3.mjs";
import "../_libs/smithy__util-config-provider.mjs";
import "../_libs/aws-sdk__util-arn-parser.mjs";
import "../_libs/smithy__hash-node.mjs";
import "../_libs/@smithy/util-defaults-mode-node+[...].mjs";
import "../_libs/smithy__config-resolver.mjs";
import "../_libs/smithy__hash-stream-node.mjs";
import "../_libs/smithy__eventstream-serde-node.mjs";
import "../_libs/@smithy/eventstream-serde-universal+[...].mjs";
import "../_libs/smithy__eventstream-codec.mjs";
import "../_libs/aws-crypto__crc32.mjs";
import "tslib";
import "../_libs/aws-crypto__util.mjs";
import "../_libs/@aws-sdk/credential-provider-node+[...].mjs";
import "../_libs/@aws-sdk/credential-provider-env+[...].mjs";
import "../_libs/smithy__util-body-length-node.mjs";
import "node:fs";
import "../_libs/aws-sdk__util-user-agent-node.mjs";
import "node:os";
import "node:process";
import "node:path";
import "../_libs/aws-sdk__middleware-user-agent.mjs";
import "../_libs/smithy__util-retry.mjs";
import "../_libs/@smithy/service-error-classification+[...].mjs";
import "../_libs/@aws-sdk/middleware-bucket-endpoint+[...].mjs";
import "../_libs/smithy__middleware-retry.mjs";
import "../_libs/@aws-sdk/middleware-flexible-checksums+[...].mjs";
import "../_libs/aws-sdk__crc64-nvme.mjs";
import "node:zlib";
import "../_libs/aws-crypto__crc32c.mjs";
import "../_libs/@aws-sdk/region-config-resolver+[...].mjs";
import "../_libs/@smithy/eventstream-serde-config-resolver+[...].mjs";
import "../_libs/aws-sdk__middleware-logger.mjs";
import "../_libs/@aws-sdk/middleware-recursion-detection+[...].mjs";
import "../_libs/aws__lambda-invoke-store.mjs";
import "../_libs/@aws-sdk/middleware-location-constraint+[...].mjs";
import "../_libs/aws-sdk__middleware-ssec.mjs";
function getEnv(key, fallback) {
  const val = process.env[key] ?? fallback;
  if (!val) throw new Error(`Missing required env var: ${key}`);
  return val;
}
const sanitizeFilename = (filename) => filename.replace(/[^a-zA-Z0-9_.-]/g, "_");
let _client = null;
function getClient() {
  if (!_client) {
    _client = new S3Client({
      endpoint: getEnv("S3_ENDPOINT"),
      region: getEnv("S3_REGION", "us-east-1"),
      forcePathStyle: true,
      // required for RustFS / MinIO
      credentials: {
        accessKeyId: getEnv("S3_ACCESS_KEY"),
        secretAccessKey: getEnv("S3_SECRET_KEY")
      }
    });
  }
  return _client;
}
function getBucket() {
  return getEnv("S3_BUCKET");
}
function buildPublicUrl(key) {
  const publicBase = process.env.S3_PUBLIC_URL;
  if (publicBase) {
    const base = publicBase.endsWith("/") ? publicBase.slice(0, -1) : publicBase;
    return `${base}/${key}`;
  }
  const endpoint = getEnv("S3_ENDPOINT").replace(/\/$/, "");
  return `${endpoint}/${getBucket()}/${key}`;
}
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
  const policy = JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Sid: "PublicRead",
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucket}/*`]
      }
    ]
  });
  try {
    await client.send(
      new PutBucketPolicyCommand({ Bucket: bucket, Policy: policy })
    );
  } catch (err) {
    console.warn("Could not set bucket policy (non-fatal):", err);
  }
  _bucketReady = true;
}
const mediaStorage = {
  async upload(file) {
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
        ACL: "public-read"
      })
    );
    return {
      storagePath: key,
      publicUrl: buildPublicUrl(key),
      sizeBytes: file.buffer.length
    };
  },
  async delete(storagePath) {
    const client = getClient();
    const bucket = getBucket();
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
    }
    await client.send(
      new DeleteObjectCommand({ Bucket: bucket, Key: key })
    );
  }
};
async function uploadMedia({ file, userId }) {
  const buffer = new Uint8Array(await file.arrayBuffer());
  const stored = await mediaStorage.upload({
    buffer,
    filename: file.name,
    mimeType: file.type
  });
  const [saved] = await db.insert(mediaItems).values({
    filename: file.name,
    originalFilename: file.name,
    storagePath: stored.publicUrl,
    mimeType: file.type,
    sizeBytes: stored.sizeBytes,
    createdByUserId: userId
  }).returning();
  return saved;
}
export {
  uploadMedia
};
