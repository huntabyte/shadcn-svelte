<script lang="ts">
	import BlockViewerCopyCodeButton from "./block-viewer-copy-code-button.svelte";
	import BlockViewerFileTree from "./block-viewer-file-tree.svelte";
	import { BlockViewerContext } from "./block-viewer.svelte";
	import { getIconForLanguageExtension } from "./icons/icons.js";
	const ctx = BlockViewerContext.get();

	const file = $derived(ctx.item.files?.find((f) => f.target === ctx.activeFile));

	const language = $derived(file?.target?.split(".").pop() ?? "svelte");

	const Icon = $derived(getIconForLanguageExtension(language));
</script>

{#if file}
	<div
		class="bg-code text-code-foreground me-3.5 flex overflow-hidden rounded-xl border group-data-[view=preview]/block-view-wrapper:hidden md:h-(--height)"
	>
		<div class="w-72">
			<BlockViewerFileTree />
		</div>
		<figure
			data-rehype-pretty-code-figure
			class="mx-0! mt-0 flex min-w-0 flex-1 flex-col rounded-xl border-none"
		>
			<figcaption
				class="text-code-foreground [&_svg]:text-code-foreground flex h-12 shrink-0 items-center gap-2 border-b px-4 py-2 [&_svg]:size-4 [&_svg]:opacity-70"
				data-language={language}
			>
				<Icon />
				{file?.target}
				<div class="ms-auto flex items-center gap-2">
					<BlockViewerCopyCodeButton />
				</div>
			</figcaption>
			<div
				class="no-scrollbar overflow-y-auto"
				{@attach (node) => {
					if (file?.highlightedContent) {
						ctx.activeFileCodeToCopy = node.innerText;
					}
				}}
			>
				{#if file?.highlightedContent}
					<!--  eslint-disable-next-line svelte/no-at-html-tags -->
					{@html file?.highlightedContent}
				{/if}
			</div>
		</figure>
	</div>
{/if}
