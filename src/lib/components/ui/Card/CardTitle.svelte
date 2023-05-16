<script lang="ts">
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" = "h3";
</script>

<svelte:element
	this={level}
	class={cn("text-lg font-semibold leading-none tracking-tight", className)}
	{...$$restProps}
>
	<slot />
</svelte:element>
