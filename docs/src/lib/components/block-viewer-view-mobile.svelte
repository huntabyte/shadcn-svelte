<script lang="ts">
	import type { Snippet } from "svelte";
	import { BlockViewerContext } from "./block-viewer.svelte";

	const ctx = BlockViewerContext.get();
	let { children }: { children?: Snippet } = $props();
</script>

<div class="flex flex-col gap-2 lg:hidden">
	<div class="flex items-center gap-2 px-2">
		<div class="line-clamp-1 text-sm font-medium">
			{ctx.item.description}
		</div>
		<div class="text-muted-foreground ms-auto shrink-0 font-mono text-xs">
			{ctx.item.name}
		</div>
	</div>
	{#if ctx.item.meta?.mobile === "component"}
		{@render children?.()}
	{:else}
		<div class="overflow-hidden rounded-xl border">
			<img
				src="/img/registry/{ctx.item.name}-light.png"
				alt={ctx.item.name}
				data-block={ctx.item.name}
				width={1440}
				height={900}
				class="object-cover dark:hidden"
			/>
			<img
				src="/img/registry/{ctx.item.name}-dark.png"
				alt={ctx.item.name}
				data-block={ctx.item.name}
				width={1440}
				height={900}
				class="hidden object-cover dark:block"
			/>
		</div>
	{/if}
</div>
