<script lang="ts">
	import { cn } from "$lib/utils.js";
</script>

{#snippet ImagePreviewItem({ name, className }: { name: string; className?: string })}
	<div
		class={cn("theme-taupe bg-muted overflow-hidden px-4 py-2 first:pt-4 last:pb-4", className)}
	>
		<img
			src="/images/{name}-light.png"
			alt={name}
			width={1440}
			height={900}
			class="dark:hidden"
		/>
		<img
			src="/images/{name}-dark.png"
			alt={name}
			width={1440}
			height={900}
			class="hidden dark:block"
		/>
	</div>
{/snippet}

<div class="mt-8 flex flex-col overflow-hidden md:hidden">
	{@render ImagePreviewItem({ name: "sera-01" })}
	{@render ImagePreviewItem({ name: "sera-03" })}
	{@render ImagePreviewItem({ name: "sera-02" })}
	{@render ImagePreviewItem({ name: "sera-06" })}
</div>
