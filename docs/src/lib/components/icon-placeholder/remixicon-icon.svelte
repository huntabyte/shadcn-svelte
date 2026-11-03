<script lang="ts">
	import type { RemixIconIconName } from "$lib/registry/icons/__remixicon__/index.js";
	import { remixiconIconLoader } from "./icon-loader.js";
	import type { Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";

	type Props = SVGAttributes<SVGSVGElement> & {
		icon: RemixIconIconName;
		placeholder: Snippet;
	};

	let { icon, placeholder, class: className, ...restProps }: Props = $props();

	// Icons that are already loaded render synchronously; otherwise fall back to the async
	// placeholder. This avoids a double render for every icon after the first load.
	// svelte-ignore state_referenced_locally
	const CachedIcon = remixiconIconLoader.peek(icon);
	// svelte-ignore state_referenced_locally
	const IconPromise = CachedIcon === undefined ? remixiconIconLoader(icon) : null;

	const rp = $derived(restProps as Record<string, unknown>);
</script>

{#if CachedIcon}
	<CachedIcon class={className} {...rp} />
{:else if IconPromise}
	{#await IconPromise}
		{@render placeholder?.()}
	{:then Icon}
		{#if Icon !== null}
			<Icon class={className} {...rp} />
		{:else}
			{@render placeholder?.()}
		{/if}
	{/await}
{:else}
	{@render placeholder?.()}
{/if}
