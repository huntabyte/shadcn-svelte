export interface HighlightedBlock {
	name: string;
	description?: string;
	meta?: Record<string, unknown>;
	type: string;
	files: HighlightedFile[];
}

export interface HighlightedFile {
	type:
		| "registry:file"
		| "registry:page"
		| "registry:ui"
		| "registry:component"
		| "registry:lib"
		| "registry:hook"
		| "registry:theme"
		| "registry:style";
	target: string;
	highlightedContent: string;
}
