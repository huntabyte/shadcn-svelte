<script lang="ts">
	import { cn } from "cn";
	import type { TablerIconName } from "$lib/registry/icons/__tabler__/index.js";
	import { tablerIconLoader } from "./icon-loader.js";
	import type { Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";

	type Props = SVGAttributes<SVGSVGElement> & {
		icon: TablerIconName;
		placeholder: Snippet;
	};

	let { icon, placeholder, class: className, ...restProps }: Props = $props();

	// svelte-ignore state_referenced_locally
	const IconPromise = tablerIconLoader(icon);

	const rp = $derived(restProps as Record<string, unknown>);
</script>

{#await IconPromise}
	{@render placeholder?.()}
{:then Icon}
	{#if Icon !== null}
		<Icon class={cn(className)} {...rp} />
	{:else}
		{@render placeholder?.()}
	{/if}
{/await}
