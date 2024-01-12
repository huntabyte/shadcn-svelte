<script lang="ts">
	import Balancer from "svelte-wrap-balancer";
	import { cn } from "$lib/utils";

	export let balanced = true;

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<p
	class={cn("max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl", className)}
	{...$$restProps}
>
	{#if balanced}
		<Balancer>
			<slot />
		</Balancer>
	{:else}
		<slot />
	{/if}
</p>
