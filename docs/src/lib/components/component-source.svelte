<script lang="ts" module>
	import { createFileTreeForRegistryItemFiles } from "$lib/registry/registry-utils.js";
	import type { Pane } from "paneforge";
	import { ComponentCodeViewerContext } from "$lib/components/component-code-viewer/component-code-viewer.svelte";
	import ComponentCodeViewerCode from "$lib/components/component-code-viewer/component-code-viewer-code.svelte";

	import { MediaQuery } from "svelte/reactivity";

	import type { HighlightedBlock } from "../../routes/api/block/[block]/+server.js";

	type ComponentCodeViewerContextType = {
		item: HighlightedBlock;
		activeFile: string | null;
		resizablePaneRef: Pane | null;
		tree: ReturnType<typeof createFileTreeForRegistryItemFiles> | null;
		highlightedFiles: HighlightedBlock["files"];
		activeFileCodeToCopy: string;
		allowSidebar?: boolean;
	};
</script>

<script lang="ts">
	let {
		item,
		allowSidebar = false,
	}: Pick<ComponentCodeViewerContextType, "item" | "allowSidebar"> = $props();

	const tree = $derived(createFileTreeForRegistryItemFiles(item.files));
	const highlightedFiles = $derived(item.files);

	function getFirstFileTargetInTree(_tree: typeof tree = tree): string | null {
		if (!_tree?.length) return null;

		for (const node of _tree) {
			if (node.path) return node.path;
			if (node.children) {
				const result = getFirstFileTargetInTree(node.children);
				if (result) return result;
			}
		}
		return null;
	}

	let activeFile = $state<ComponentCodeViewerContextType["activeFile"]>(
		getFirstFileTargetInTree() ?? null
	);
	let resizablePaneRef = $state<Pane>(null!);
	let activeFileCodeToCopy = $state<ComponentCodeViewerContextType["activeFileCodeToCopy"]>("");

	ComponentCodeViewerContext.set({
		get item() {
			return item;
		},
		get activeFile() {
			return activeFile;
		},
		set activeFile(value) {
			activeFile = value;
		},
		get resizablePaneRef() {
			return resizablePaneRef;
		},
		set resizablePaneRef(value) {
			resizablePaneRef = value;
		},
		get tree() {
			return tree;
		},
		get highlightedFiles() {
			return highlightedFiles;
		},
		get activeFileCodeToCopy() {
			return activeFileCodeToCopy;
		},
		set activeFileCodeToCopy(value) {
			activeFileCodeToCopy = value;
		},
		get allowSidebar() {
			return allowSidebar;
		},
	});

	const isMobile = new MediaQuery("(max-width: 768px)");

	const longestFileHeight = $derived.by(() => {
		if (!highlightedFiles || highlightedFiles.length === 0) return "100%";

		const maxLineCount = highlightedFiles.reduce((max, file) => {
			const lineCount = file.highlightedContent.split("\n").length;
			return Math.max(max, lineCount);
		}, 0);

		// Estimate height: ~1.5rem per line (adjust based on your font size)
		return `${maxLineCount * 1.5}rem`;
	});

	const viewportHeight = $derived(
		isMobile.current ? "75dvh" : "calc(100svh - (var(--header-height) * 2))"
	);

	const height = $derived(`min(${longestFileHeight}, ${viewportHeight})`);
</script>

<figure data-rehype-pretty-code-figure data-llm-ignore id={item.name}>
	<div
		class="group/block-view-wrapper flex w-full min-w-0 flex-col-reverse items-stretch gap-4 overflow-hidden"
		style="--height: {height};"
	>
		<ComponentCodeViewerCode />
	</div>
</figure>
