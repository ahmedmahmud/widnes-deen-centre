import { useCallback, useEffect, useRef, useState } from "react";
import type { RichText } from "@/lib/cms/types";
import { normalizeRichText } from "@/lib/cms/rich-text";
import { Plate, PlateContent, usePlateEditor } from "platejs/react";
import {
	BlockquotePlugin,
	BoldPlugin,
	ItalicPlugin,
	UnderlinePlugin,
} from "@platejs/basic-nodes/react";
import { FontColorPlugin } from "@platejs/basic-styles/react";

const PALETTE_COLORS = [
	{ label: "Default", value: undefined },
	{ label: "Forest", value: "#0f3e30" },
	{ label: "Clay", value: "#c25e40" },
	{ label: "Gold", value: "#d4a94b" },
	{ label: "Sand", value: "#f3e9d2" },
	{ label: "Cream", value: "#fffbf0" },
	{ label: "Plum", value: "#3b1e2e" },
] as const;

const BLOCK_TYPE_OPTIONS: Array<{ label: string; value: RichTextBlockType }> = [
	{ label: "Text", value: "p" },
	{ label: "Subtitle", value: "blockquote" },
];

type RichTextBlockType = "p" | "blockquote";
type MarkState = { bold: boolean; italic: boolean; underline: boolean };

type RichTextEditorProps = {
	label: string;
	value: RichText;
	onChange: (value: RichText) => void;
	hint?: string;
	minHeight?: number;
	disabled?: boolean;
};

export function RichTextEditor({
	label,
	value,
	onChange,
	hint,
	minHeight = 100,
	disabled,
}: RichTextEditorProps) {
	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;

	const normalizedValue = normalizeRichText(value);
	const [currentBlockType, setCurrentBlockType] = useState<RichTextBlockType>("p");
	const [markState, setMarkState] = useState<MarkState>({
		bold: false,
		italic: false,
		underline: false,
	});

	const editor = usePlateEditor({
		plugins: [
			BlockquotePlugin,
			BoldPlugin,
			ItalicPlugin,
			UnderlinePlugin,
			FontColorPlugin,
		],
		value: normalizedValue as any,
	});

	const lastExternalValueJson = useRef(JSON.stringify(normalizedValue));

	const readCurrentBlockType = useCallback((): RichTextBlockType => {
		try {
			const block = (editor as any)?.api?.block?.();
			const type = block?.[0]?.type ?? block?.type ?? "p";
			if (type === "p" || type === "blockquote") {
				return type;
			}
		} catch {
			// Ignore and fallback to paragraph.
		}
		return "p";
	}, [editor]);

	const readMarkState = useCallback((): MarkState => {
		try {
			const marks = (editor as any)?.api?.marks?.() ?? {};
			return {
				bold: Boolean(marks.bold),
				italic: Boolean(marks.italic),
				underline: Boolean(marks.underline),
			};
		} catch {
			return { bold: false, italic: false, underline: false };
		}
	}, [editor]);

	useEffect(() => {
		const nextValueJson = JSON.stringify(normalizedValue);
		if (nextValueJson !== lastExternalValueJson.current) {
			lastExternalValueJson.current = nextValueJson;
			editor.tf.setValue(normalizedValue as any);
		}
		setCurrentBlockType(readCurrentBlockType());
		setMarkState(readMarkState());
	}, [editor, normalizedValue, readCurrentBlockType, readMarkState]);

	const handleChange = useCallback(
		({ value: nextValue }: { value: any }) => {
			const normalizedNextValue = normalizeRichText(nextValue);
			lastExternalValueJson.current = JSON.stringify(normalizedNextValue);
			onChangeRef.current(normalizedNextValue);
			setCurrentBlockType(readCurrentBlockType());
			setMarkState(readMarkState());
		},
		[readCurrentBlockType, readMarkState],
	);

	const setBlockType = useCallback(
		(type: RichTextBlockType) => {
			switch (type) {
				case "blockquote":
					editor.tf.blockquote.toggle();
					break;
				case "p":
				default:
					editor.tf.toggleBlock("p");
			}
			setCurrentBlockType(type);
		},
		[editor],
	);

	const [showColorPicker, setShowColorPicker] = useState(false);
	const colorPickerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!showColorPicker) return;
		const handler = (event: MouseEvent) => {
			if (
				colorPickerRef.current &&
				!colorPickerRef.current.contains(event.target as Node)
			) {
				setShowColorPicker(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [showColorPicker]);

	return (
		<div className={`space-y-1.5 ${disabled ? "opacity-60" : ""}`}>
			<label className="block font-mono text-xs uppercase tracking-widest text-forest/70 font-bold">
				{label}
			</label>
			<div className="border-2 border-forest/10 bg-white rounded-sm overflow-hidden focus-within:border-forest/30 transition-colors">
				<div className="flex flex-wrap items-center gap-2 px-2 py-1.5 border-b border-forest/10 bg-sand/30">
					<label className="font-mono text-[10px] uppercase tracking-widest text-forest/50">
						Style
					</label>
					<select
						value={currentBlockType}
						onChange={(event) => setBlockType(event.target.value as RichTextBlockType)}
						disabled={disabled}
						className="h-7 px-2 border border-forest/20 bg-white text-forest font-mono text-[11px] uppercase tracking-wide disabled:opacity-50"
					>
						{BLOCK_TYPE_OPTIONS.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>

					<div className="w-px h-5 bg-forest/10" />

					<ToolbarButton
						disabled={disabled}
						active={markState.bold}
						onMouseDown={(event) => {
							event.preventDefault();
							editor.tf.bold.toggle();
							setMarkState(readMarkState());
						}}
						title="Bold"
					>
						<span className="font-bold text-xs">B</span>
					</ToolbarButton>
					<ToolbarButton
						disabled={disabled}
						active={markState.italic}
						onMouseDown={(event) => {
							event.preventDefault();
							editor.tf.italic.toggle();
							setMarkState(readMarkState());
						}}
						title="Italic"
					>
						<span className="italic text-xs">I</span>
					</ToolbarButton>
					<ToolbarButton
						disabled={disabled}
						active={markState.underline}
						onMouseDown={(event) => {
							event.preventDefault();
							editor.tf.underline.toggle();
							setMarkState(readMarkState());
						}}
						title="Underline"
					>
						<span className="text-xs underline">U</span>
					</ToolbarButton>

					<div className="w-px h-5 bg-forest/10" />

					<div className="relative" ref={colorPickerRef}>
						<ToolbarButton
							disabled={disabled}
							onMouseDown={(event) => {
								event.preventDefault();
								if (disabled) return;
								setShowColorPicker((prev) => !prev);
							}}
							title="Text color"
						>
							<span className="material-symbols-outlined text-sm">
								format_color_text
							</span>
						</ToolbarButton>
						{showColorPicker ? (
							<div className="absolute top-full left-0 mt-1 bg-white border border-forest/20 shadow-lg p-2 z-50 flex gap-1.5">
								{PALETTE_COLORS.map((color) => (
									<button
										key={color.label}
										type="button"
										onMouseDown={(event) => {
											event.preventDefault();
											if (color.value) {
												editor.tf.color.addMark(color.value);
											} else {
												editor.tf.removeMark("color");
											}
											setShowColorPicker(false);
										}}
										disabled={disabled}
										className="w-6 h-6 rounded-sm border border-forest/20 hover:scale-110 transition-transform flex items-center justify-center disabled:opacity-40"
										style={{ backgroundColor: color.value ?? "#ffffff" }}
										title={color.label}
									>
										{!color.value ? (
											<span className="text-[10px] text-forest/40">✕</span>
										) : null}
									</button>
								))}
							</div>
						) : null}
					</div>

					<div className="ml-auto" />
				</div>

				<Plate editor={editor as any} onChange={handleChange as any}>
					<PlateContent
						readOnly={disabled}
						onMouseUp={() => {
							setCurrentBlockType(readCurrentBlockType());
							setMarkState(readMarkState());
						}}
						onKeyUp={() => {
							setCurrentBlockType(readCurrentBlockType());
							setMarkState(readMarkState());
						}}
						className="px-3 py-3 text-forest outline-none [&_.slate-placeholder]:text-forest/30 [&_p]:font-mono [&_p]:text-sm [&_p]:leading-relaxed [&_blockquote]:border-l-4 [&_blockquote]:border-clay [&_blockquote]:bg-clay/5 [&_blockquote]:px-3 [&_blockquote]:py-1 [&_blockquote]:font-mono [&_blockquote]:text-sm [&_blockquote]:leading-relaxed"
						style={{ minHeight }}
						placeholder="Start typing..."
					/>
				</Plate>
			</div>
			{hint ? (
				<p className="text-[10px] font-mono text-forest/40 mt-1">{hint}</p>
			) : null}
		</div>
	);
}

function ToolbarButton({
	children,
	onMouseDown,
	title,
	disabled,
	active,
}: {
	children: React.ReactNode;
	onMouseDown: (event: React.MouseEvent) => void;
	title: string;
	disabled?: boolean;
	active?: boolean;
}) {
	return (
		<button
			type="button"
			onMouseDown={onMouseDown}
			title={title}
			disabled={disabled}
			className={`min-w-7 h-7 px-2 flex items-center justify-center rounded-sm transition-colors font-mono text-[11px] uppercase disabled:opacity-40 disabled:cursor-not-allowed ${
				active
					? "bg-forest text-sand"
					: "hover:bg-forest/10 text-forest/60 hover:text-forest"
			}`}
		>
			{children}
		</button>
	);
}
