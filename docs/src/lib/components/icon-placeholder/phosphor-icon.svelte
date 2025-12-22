<script lang="ts">
	import type { Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";
	import type { PhosphorIconName } from "$lib/registry/icons/__phosphor__/index.js";
	import { phosphorIconLoader } from "./icon-loader.js";

	type Props = SVGAttributes<SVGSVGElement> & {
		icon: PhosphorIconName;
		placeholder: Snippet;
	};

	let { icon, placeholder, class: className, ...restProps }: Props = $props();

	// eslint-disable-next-line svelte/no-unused-svelte-ignore
	// svelte-ignore state_referenced_locally
	const IconPromise = phosphorIconLoader(icon);

	const rp = $derived(restProps as Record<string, unknown>);
</script>

{#await IconPromise}
	{@render placeholder?.()}
{:then Icon}
	{#if Icon !== null}
		<Icon class={className} {...rp} />
	{:else}
		{@render placeholder?.()}
	{/if}
{/await}
