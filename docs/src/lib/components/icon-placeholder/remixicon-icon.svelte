<script lang="ts">
	import type { Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";
	import type { RemixIconIconName } from "$lib/registry/icons/__remixicon__/index.js";
	import { remixiconIconLoader } from "./icon-loader.js";

	type Props = SVGAttributes<SVGSVGElement> & {
		icon: RemixIconIconName;
		placeholder: Snippet;
	};

	let { icon, placeholder, class: className, ...restProps }: Props = $props();

	// svelte-ignore state_referenced_locally
	const IconPromise = remixiconIconLoader(icon);

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
