<script lang="ts">
	import BlockViewerCopyCodeButton from "./block-viewer-copy-code-button.svelte";
	import BlockViewerFileTree from "./block-viewer-file-tree.svelte";
	import { BlockViewerContext } from "./block-viewer.svelte";
	import FileIcon from "@lucide/svelte/icons/file";
	const ctx = BlockViewerContext.get();

	const file = $derived(ctx.highlightedFiles?.find((f) => f.target === ctx.activeFile));
</script>

{#if file}
	<div
		class="md:h-(--height) mr-[14px] flex overflow-hidden rounded-xl bg-zinc-950 text-white group-data-[view=preview]/block-view-wrapper:hidden"
	>
		<div class="w-[280px]">
			<BlockViewerFileTree />
		</div>
		<div class="flex min-w-0 flex-1 flex-col">
			<div
				class="flex h-12 items-center gap-2 border-b border-zinc-700 bg-zinc-900 px-4 text-sm font-medium"
			>
				<FileIcon class="size-4" />
				{file.target}
				<div class="ml-auto flex items-center gap-2">
					<BlockViewerCopyCodeButton />
				</div>
			</div>

			<div
				data-rehype-pretty-code-fragment
				class="[&_pre]:h-(--height) relative flex-1 overflow-hidden after:absolute after:inset-y-0 after:left-0 after:w-10 after:bg-zinc-950 [&_.line:before]:sticky [&_.line:before]:left-2 [&_.line:before]:z-10 [&_.line:before]:translate-y-[-1px] [&_.line:before]:pr-1 [&_pre]:overflow-auto [&_pre]:!bg-transparent [&_pre]:pb-20 [&_pre]:pt-4 [&_pre]:font-mono [&_pre]:text-sm [&_pre]:leading-relaxed"
			>
				<!--  eslint-disable-next-line svelte/no-at-html-tags -->
				{@html file?.highlightedContent ?? ""}
			</div>
		</div>
	</div>
{/if}
