<script lang="ts" module>
	import { createFileTreeForRegistryItemFiles } from "$lib/registry/registry-utils.js";
	import type { Pane } from "paneforge";
	import { Context } from "runed";
	import ComponentCodeViewerCode from "./component-code-viewer-code.svelte";
	import CodeIcon from "@lucide/svelte/icons/code";

	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import { MediaQuery } from "svelte/reactivity";
	import { badgeVariants } from "$lib/registry/ui/badge/badge.svelte";
	import type { HighlightedBlock } from "../../../routes/api/block/[block]/+server.js";

	type ComponentCodeViewerContextType = {
		item: HighlightedBlock;
		activeFile: string | null;
		resizablePaneRef: Pane | null;
		tree: ReturnType<typeof createFileTreeForRegistryItemFiles> | null;
		highlightedFiles: HighlightedBlock["files"];
		activeFileCodeToCopy: string;
		allowSidebar?: boolean;
	};

	export const ComponentCodeViewerContext = new Context<ComponentCodeViewerContextType>(
		"ComponentCodeViewer"
	);
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
	const height = $derived(
		isMobile.current ? "75dvh" : "calc(100svh - (var(--header-height) * 2))"
	);
	let contentRef = $state<HTMLElement | null>(null);
</script>

<Dialog.Root>
	<Dialog.Trigger class={badgeVariants({ variant: "secondary" })} data-llm-ignore>
		Component Source <CodeIcon aria-hidden="true" />
	</Dialog.Trigger>
	<Dialog.Content
		bind:ref={contentRef}
		class="rounded-xl p-0 sm:max-w-[90%]"
		showCloseButton={false}
		onOpenAutoFocus={(e) => {
			if (!contentRef) return;
			const activeItem = contentRef.querySelector(
				"button[data-active=true]"
			) as HTMLElement | null;
			if (activeItem) {
				e.preventDefault();
				activeItem.focus();
			}
		}}
	>
		<Dialog.Header class="sr-only">
			<Dialog.Title>
				{item.name} Code
			</Dialog.Title>
			<Dialog.Description>
				View the code for the {item.name} component
			</Dialog.Description>
		</Dialog.Header>
		<div
			id={item.name}
			class="group/block-view-wrapper flex w-full min-w-0 flex-col-reverse items-stretch gap-4 overflow-hidden md:flex-col"
			style="--height: {height};"
		>
			<ComponentCodeViewerCode />
		</div>
		<Dialog.Close class="sr-only">Close</Dialog.Close>
	</Dialog.Content>
</Dialog.Root>
