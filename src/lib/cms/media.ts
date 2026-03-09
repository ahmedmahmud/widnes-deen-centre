import { db } from "@/db/index";
import { mediaItems } from "@/db/schema";
import { mediaStorage } from "@/lib/media-storage";

type UploadInput = {
	file: File;
	userId?: string;
};

export async function uploadMedia({ file, userId }: UploadInput) {
	const buffer = new Uint8Array(await file.arrayBuffer());
	const stored = await mediaStorage.upload({
		buffer,
		filename: file.name,
		mimeType: file.type,
	});

	const [saved] = await db
    .insert(mediaItems)
    .values({
      filename: file.name,
      originalFilename: file.name,
      storagePath: stored.storagePath,
      mimeType: file.type,
      sizeBytes: stored.sizeBytes,
      createdByUserId: userId,
    })
		.returning();

	return saved;
}
