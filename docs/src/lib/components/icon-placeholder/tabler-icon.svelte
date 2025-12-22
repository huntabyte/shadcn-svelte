<script lang="ts">
	import type { Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";
	import type { TablerIconName } from "$lib/registry/icons/__tabler__/index.js";
	import { cn } from "$lib/utils.js";
	import { tablerIconLoader } from "./icon-loader.js";

	type Props = SVGAttributes<SVGSVGElement> & {
		icon: TablerIconName;
		placeholder: Snippet;
	};

	let { icon, placeholder, class: className, ...restProps }: Props = $props();

	// eslint-disable-next-line svelte/no-unused-svelte-ignore
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
