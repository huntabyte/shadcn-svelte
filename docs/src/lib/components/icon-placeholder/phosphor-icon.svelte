<script lang="ts">
	import type { Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";
	import type { PhosphorIconName } from "$lib/registry/icons/__phosphor__.js";
	import { phosphorIconLoader } from "./icon-loader.js";

	type Props = SVGAttributes<SVGSVGElement> & {
		icon: PhosphorIconName;
		placeholder: Snippet;
	};

	let { icon, placeholder, class: className, ...restProps }: Props = $props();

	const IconPromise = phosphorIconLoader(icon);

	const rp = $derived(restProps as Record<string, unknown>);
</script>

{#await IconPromise}
	{@render placeholder?.()}
{:then Icon}
	<Icon class={className} {...rp} />
{/await}
