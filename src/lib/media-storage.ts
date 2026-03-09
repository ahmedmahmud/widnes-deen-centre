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

export interface MediaStorageAdapter {
	upload: (file: MediaUpload) => Promise<StoredMedia>;
	delete: (storagePath: string) => Promise<void>;
}

export const mediaStorage = {
	setAdapter(adapter: MediaStorageAdapter) {
		this.adapter = adapter;
	},
	adapter: null as MediaStorageAdapter | null,
	async upload(file: MediaUpload) {
		if (!this.adapter) {
			throw new Error("Media storage adapter not configured");
		}
		return this.adapter.upload(file);
	},
	async delete(storagePath: string) {
		if (!this.adapter) {
			throw new Error("Media storage adapter not configured");
		}
		return this.adapter.delete(storagePath);
	},
};
