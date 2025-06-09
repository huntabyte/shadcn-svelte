<script lang="ts" module>
	import type { createFileTreeForRegistryItemFiles } from "$lib/registry/registry-utils.js";
	import { Pane } from "paneforge";
	import { Context } from "runed";
	import BlockViewerToolbar from "./block-viewer-toolbar.svelte";
	import BlockViewerView from "./block-viewer-view.svelte";
	import BlockViewerCode from "./block-viewer-code.svelte";
	import type { Snippet } from "svelte";
	import BlockViewerViewMobile from "./block-viewer-view-mobile.svelte";
	import type { HighlightedBlock } from "../../routes/api/block/[block]/+server.js";

	type BlockViewerContextType = {
		item: HighlightedBlock;
		view: "code" | "preview";
		activeFile: string | null;
		resizablePaneRef: Pane | null;
		tree: ReturnType<typeof createFileTreeForRegistryItemFiles> | null;
		iframeKey: number;
		activeFileCodeToCopy: string;
	};

	export const BlockViewerContext = new Context<BlockViewerContextType>("BlockViewer");
</script>

<script lang="ts">
	let {
		item,
		tree,
		children,
	}: Pick<BlockViewerContextType, "item" | "tree"> & {
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
	let iframeKey = $state<number>(0);
	let activeFileCodeToCopy = $state<string>("");

	BlockViewerContext.set({
		get item() {
			return item;
		},
		get iframeKey() {
			return iframeKey;
		},
		set iframeKey(value) {
			iframeKey = value;
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
		get activeFileCodeToCopy() {
			return activeFileCodeToCopy;
		},
		set activeFileCodeToCopy(value) {
			activeFileCodeToCopy = value;
		},
	});
</script>

<div
	id={item.name}
	data-view={view}
	class="group/block-view-wrapper flex min-w-0 scroll-mt-24 flex-col-reverse items-stretch gap-4 overflow-hidden md:flex-col"
	style="--height: {item.meta?.iframeHeight ?? '930px'}"
>
	<BlockViewerToolbar />
	<BlockViewerView />
	<BlockViewerCode />
	<BlockViewerViewMobile>{@render children?.()}</BlockViewerViewMobile>
</div>
