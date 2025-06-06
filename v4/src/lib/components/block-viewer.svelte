<script lang="ts" module>
	import type { createFileTreeForRegistryItemFiles } from "$lib/registry/registry-utils.js";
	import type { RegistryItemFile, RegistryItem } from "@shadcn-svelte/registry";
	import { Pane } from "paneforge";
	import { Context } from "runed";
	import BlockViewerToolbar from "./block-viewer-toolbar.svelte";
	import BlockViewerView from "./block-viewer-view.svelte";
	import BlockViewerCode from "./block-viewer-code.svelte";
	import type { Snippet } from "svelte";
	import BlockViewerViewMobile from "./block-viewer-view-mobile.svelte";

	type BlockViewerContextType = {
		item: RegistryItem;
		view: "code" | "preview";
		activeFile: string | null;
		resizablePaneRef: Pane | null;
		tree: ReturnType<typeof createFileTreeForRegistryItemFiles> | null;
		highlightedFiles:
			| (RegistryItemFile & {
					highlightedContent: Promise<string>;
			  })[]
			| null;
	};

	export const BlockViewerContext = new Context<BlockViewerContextType>("BlockViewer");
</script>

<script lang="ts">
	let {
		item,
		tree,
		highlightedFiles,
		children,
	}: Pick<BlockViewerContextType, "item" | "tree" | "highlightedFiles"> & {
		children?: Snippet;
	} = $props();

	let view = $state<BlockViewerContextType["view"]>("preview");

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

	let activeFile = $state<BlockViewerContextType["activeFile"]>(
		getFirstFileTargetInTree() ?? null
	);
	let resizablePaneRef = $state<Pane>(null!);

	BlockViewerContext.set({
		get item() {
			return item;
		},
		get view() {
			return view;
		},
		set view(value) {
			view = value;
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
		set highlightedFiles(value) {
			highlightedFiles = value;
		},
	});
</script>

<div
	id={item.name}
	data-view={view}
	class="group/block-view-wrapper flex min-w-0 flex-col-reverse items-stretch gap-4 overflow-hidden md:flex-col"
	style="--height: {item.meta?.iframeHeight ?? '930px'}"
>
	<BlockViewerToolbar />
	<BlockViewerView />
	<BlockViewerCode />
	<BlockViewerViewMobile>{@render children?.()}</BlockViewerViewMobile>
</div>
