<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { BlockViewerContext } from "./block-viewer.svelte";

	let { class: className }: { class?: string } = $props();
	const ctx = BlockViewerContext.get();

	// todo see if we need
	// let iframeHtml = `<iframe title="${ctx.item.name}" src="/view/${ctx.item.name}" height="930" class="bg-background no-scrollbar relative z-20 hidden w-full md:block"></iframe>`
</script>

{#key ctx.iframeKey}
	<iframe
		title={ctx.item.name}
		src="/view/{ctx.item.name}"
		height={typeof ctx.item.meta?.iframeHeight === "number" ? ctx.item.meta.iframeHeight : 930}
		class={cn("bg-background no-scrollbar relative z-20 w-full", className)}
		loading="lazy"
	></iframe>
{/key}
