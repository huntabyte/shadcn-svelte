<script lang="ts">
	import type { PhosphorIconName } from "$lib/registry/icons/__phosphor__/index.js";
	import { phosphorIconLoader } from "./icon-loader.js";
	import type { Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";

	type Props = SVGAttributes<SVGSVGElement> & {
		icon: PhosphorIconName;
		placeholder: Snippet;
	};

	let { icon, placeholder, class: className, ...restProps }: Props = $props();

	// Duotone, like Another UI. Arrows, carets, plus, check, X, minus and text-format icons are bold: a duotone fill makes a thin stroke glyph read as a smudge.
	const BOLD = /^(Arrow(?!Circle|Square)|Caret|Plus(?!Circle|Square)|Check(?!Circle|Square)|X(?!Circle|Square)|Minus(?!Circle|Square)|Text(B|Italic|Underline|Strikethrough|Aa|T|Align|H))/;
	const weight = $derived(BOLD.test(icon.replace(/Icon$/, "")) ? "bold" : "duotone");

	// Icons that are already loaded render synchronously; otherwise fall back to the async
	// placeholder. This avoids a double render for every icon after the first load.
	// svelte-ignore state_referenced_locally
	const CachedIcon = phosphorIconLoader.peek(icon);
	// svelte-ignore state_referenced_locally
	const IconPromise = CachedIcon === undefined ? phosphorIconLoader(icon) : null;

	const rp = $derived({ weight, ...restProps } as Record<string, unknown>);
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
