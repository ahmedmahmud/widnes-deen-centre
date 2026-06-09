import type { RichText, RichTextBlockType, RichTextNode } from "./types";

export const createRichTextNode = (
	type: RichTextBlockType = "p",
	text = "",
): RichTextNode => ({
	type,
	children: [{ text }],
});

export const normalizeRichText = (value?: RichText | null): RichText => {
	if (!Array.isArray(value) || value.length === 0) {
		return [createRichTextNode()];
	}

	return value.map((node) => ({
		type: node?.type ?? "p",
		children:
			Array.isArray(node?.children) && node.children.length > 0
				? node.children.map((child) => ({
						text: typeof child?.text === "string" ? child.text : "",
						bold: child?.bold,
						italic: child?.italic,
						underline: child?.underline,
						color: child?.color ?? undefined,
					}))
				: [{ text: "" }],
	}));
};

/**
 * Check if rich text content is empty (no visible text).
 */
export function isRichTextEmpty(value: RichText): boolean {
	return normalizeRichText(value).every((node) =>
		node.children.every((child) => child.text.trim() === ""),
	);
}

/**
 * Extract plain text from rich text (for fallback / SEO / comparisons).
 */
export function richTextToPlainString(value: RichText): string {
	return normalizeRichText(value)
		.map((node) => {
			return node.children.map((child) => child.text).join("");
		})
		.join("\n");
}
