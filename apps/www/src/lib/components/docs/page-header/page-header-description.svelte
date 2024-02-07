<script lang="ts">
	import { cn } from "$lib/utils";

	export let balanced = true;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<p
	class={cn(
		"max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl text-balance",
		className
	)}
	{...$$restProps}
>
	{#if balanced}
		<slot />
	{:else}
		<slot />
	{/if}
</p>
