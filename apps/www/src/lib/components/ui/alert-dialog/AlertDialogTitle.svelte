<script lang="ts">
	import { cn } from "$lib/utils";
	import { ctx, melt } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h3";
	const title = ctx.getTitle();
</script>

<svelte:element
	this={level}
	use:melt={$title}
	class={cn("text-lg font-semibold", className)}
	{...$$restProps}
>
	<slot />
</svelte:element>
