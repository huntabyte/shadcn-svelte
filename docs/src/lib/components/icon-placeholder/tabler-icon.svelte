<script lang="ts">
	import type { Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";
	import type { TablerIconName } from "$lib/registry/icons/__tabler__.js";
	import { cn } from "$lib/utils.js";

	type Props = SVGAttributes<SVGSVGElement> & {
		icon: TablerIconName;
		placeholder: Snippet;
	};

	let { icon, placeholder, class: className, ...restProps }: Props = $props();

	const IconPromise = $derived(
		import("$lib/registry/icons/__tabler__.js").then((mod) => mod[icon])
	);

	const rp = $derived(restProps as Record<string, unknown>);
</script>

{#await IconPromise}
	{@render placeholder?.()}
{:then Icon}
	<Icon class={cn(className)} {...rp} />
{/await}
