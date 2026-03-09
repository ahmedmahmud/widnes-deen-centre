import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { type MediaUpload, mediaStorage } from "@/lib/media-storage";

const uploadsRoot = path.join(process.cwd(), "public", "uploads");

const sanitizeFilename = (filename: string) =>
	filename.replace(/[^a-zA-Z0-9_.-]/g, "_");

const toPublicUrl = (storagePath: string) =>
	storagePath.startsWith("/") ? storagePath : `/${storagePath}`;

export const localMediaStorage = {
	async upload(file: MediaUpload) {
		await mkdir(uploadsRoot, { recursive: true });
		const safeName = sanitizeFilename(file.filename);
		const uniquePrefix = randomUUID();
		const relativePath = path.join("uploads", `${uniquePrefix}-${safeName}`);
		const absolutePath = path.join(process.cwd(), "public", relativePath);
		await writeFile(absolutePath, file.buffer);

		const normalized = relativePath.replace(/\\/g, "/");
		return {
			storagePath: normalized,
			publicUrl: toPublicUrl(normalized),
			sizeBytes: file.buffer.length,
		};
	},
	async delete(storagePath: string) {
		const normalized = storagePath.startsWith("/")
			? storagePath.slice(1)
			: storagePath;
		const absolutePath = path.join(process.cwd(), "public", normalized);
		await unlink(absolutePath);
	},
};

mediaStorage.setAdapter(localMediaStorage);
