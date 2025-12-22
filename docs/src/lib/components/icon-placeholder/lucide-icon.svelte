<script lang="ts">
	import type { Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";
	import type { LucideIconName } from "$lib/registry/icons/__lucide__.js";

	type Props = SVGAttributes<SVGSVGElement> & {
		icon: LucideIconName;
		placeholder: Snippet;
	};

	let { icon, placeholder, class: className, ...restProps }: Props = $props();

	const IconPromise = $derived(
		import("$lib/registry/icons/__lucide__.js").then((mod) => mod[icon])
	);

	const rp = $derived(restProps as Record<string, unknown>);
</script>

{#await IconPromise}
	{@render placeholder?.()}
{:then Icon}
	<Icon class={className} {...rp} />
{/await}
