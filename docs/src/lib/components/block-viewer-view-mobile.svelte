<script lang="ts">
	import type { Snippet } from "svelte";
	import { BlockViewerContext } from "./block-viewer.svelte";
	import { Heroshot } from "heroshot/sveltekit";

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
			<Heroshot
				name={`registry/${ctx.item.name}`}
				alt={ctx.item.name}
				class="object-cover"
			/>
		</div>
	{/if}
</div>
