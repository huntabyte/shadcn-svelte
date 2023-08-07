<script lang="ts">
	import { cn } from "$lib/utils";
	import type { HeadingLevel } from ".";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let level: HeadingLevel = "h5";
</script>

<svelte:element
	this={level}
	class={cn("mb-1 font-medium leading-none tracking-tight", className)}
	{...$$restProps}
>
	<slot />
</svelte:element>
