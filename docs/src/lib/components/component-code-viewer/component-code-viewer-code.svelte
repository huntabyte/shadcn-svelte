<script lang="ts">
	import ComponentCodeViewerCodeTitle from "./component-code-viewer-code-title.svelte";
	import { ComponentCodeViewerContext } from "./component-code-viewer.svelte";

	const ctx = ComponentCodeViewerContext.get();
	const file = $derived(ctx.highlightedFiles.find((f) => f.target === ctx.activeFile));
	let codeContainer = $state<HTMLElement | null>(null);

	function handleKeydown(event: KeyboardEvent) {
		if (!codeContainer) return;
		if (event.key === "a" && (event.metaKey || event.ctrlKey)) {
			event.preventDefault();
			const range = document.createRange();
			range.selectNodeContents(codeContainer);

			const selection = window.getSelection();
			if (!selection) return;
			selection.removeAllRanges();
			selection.addRange(range);
		}
	}
</script>

<svelte:document onkeydown={handleKeydown} />

{#if file}
	<div
		class="bg-code text-code-foreground flex h-(--height) overflow-hidden rounded-xl border group-data-[view=preview]/block-view-wrapper:hidden"
	>
		<div class="mt-0 flex min-w-0 flex-1 flex-col rounded-xl border-none">
			<ComponentCodeViewerCodeTitle />
			<div
				bind:this={codeContainer}
				class="no-scrollbar overflow-y-auto"
				{@attach (node) => {
					if (file?.highlightedContent) {
						ctx.activeFileCodeToCopy = node.innerText;
					}
				}}
			>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -->
				{@html file?.highlightedContent}
			</div>
		</div>
	</div>
{/if}
