import type { RichText, RichTextNode } from "@/lib/cms/types";
import { normalizeRichText } from "@/lib/cms/rich-text";

type RichTextRendererProps = {
	value: RichText;
	className?: string;
	paragraphClassName?: string;
	blockquoteClassName?: string;
	h1ClassName?: string;
	h2ClassName?: string;
	h3ClassName?: string;
};

export function RichTextRenderer({
	value,
	className,
	paragraphClassName,
	blockquoteClassName,
	h1ClassName,
	h2ClassName,
	h3ClassName,
}: RichTextRendererProps) {
	const normalizedValue = normalizeRichText(value);
	const rootClassName = [className].filter(Boolean).join(" ");
	const paragraphClass = ["leading-relaxed whitespace-pre-wrap", paragraphClassName]
		.filter(Boolean)
		.join(" ");
	const blockquoteClass = [
		"pl-4 border-l-4 border-clay italic text-forest/80 whitespace-pre-wrap",
		blockquoteClassName,
	]
		.filter(Boolean)
		.join(" ");
	const h1Class = ["font-serif text-4xl font-black leading-tight whitespace-pre-wrap", h1ClassName]
		.filter(Boolean)
		.join(" ");
	const h2Class = ["font-serif text-3xl font-bold leading-tight whitespace-pre-wrap", h2ClassName]
		.filter(Boolean)
		.join(" ");
	const h3Class = ["font-serif text-2xl font-bold leading-tight whitespace-pre-wrap", h3ClassName]
		.filter(Boolean)
		.join(" ");

	return (
		<div className={rootClassName}>
			{normalizedValue.map((node, i) => (
				<RenderElement
					key={i}
					node={node}
					paragraphClassName={paragraphClass}
					blockquoteClassName={blockquoteClass}
					h1ClassName={h1Class}
					h2ClassName={h2Class}
					h3ClassName={h3Class}
				/>
			))}
		</div>
	);
}

function RenderElement({
	node,
	paragraphClassName,
	blockquoteClassName,
	h1ClassName,
	h2ClassName,
	h3ClassName,
}: {
	node: RichTextNode;
	paragraphClassName?: string;
	blockquoteClassName?: string;
	h1ClassName?: string;
	h2ClassName?: string;
	h3ClassName?: string;
}) {
	const children = node.children.map((child, i) => (
		<RenderLeaf key={i} leaf={child} />
	));
	const hasVisibleText = node.children.some((child) => child.text.trim().length > 0);
	const content = hasVisibleText ? children : "\u00A0";

	const baseClass = !hasVisibleText ? "min-h-[1.5em]" : "";

	switch (node.type) {
		case "h1":
			return <h1 className={`${h1ClassName} ${baseClass} mb-4`}>{content}</h1>;
		case "h2":
			return <h2 className={`${h2ClassName} ${baseClass} mb-3`}>{content}</h2>;
		case "h3":
			return <h3 className={`${h3ClassName} ${baseClass} mb-2`}>{content}</h3>;
		case "blockquote":
			return <blockquote className={`${blockquoteClassName} ${baseClass} mb-4`}>{content}</blockquote>;
		case "p":
		default:
			return <p className={`${paragraphClassName} ${baseClass} mb-4`}>{content}</p>;
	}
}

function RenderLeaf({
	leaf,
}: {
	leaf: RichTextNode["children"][number];
}) {
	let el: React.ReactNode = leaf.text;

	if (!leaf.text && leaf.text !== "") return null;

	if (leaf.bold) el = <strong>{el}</strong>;
	if (leaf.italic) el = <em>{el}</em>;
	if (leaf.underline) el = <u>{el}</u>;

	const style: React.CSSProperties = {};
	if (leaf.color) style.color = leaf.color;

	if (Object.keys(style).length > 0) {
		el = <span style={style}>{el}</span>;
	}

	return <>{el}</>;
}
