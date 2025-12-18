<script lang="ts">
	import type { Snippet } from "svelte";
    import type { SVGAttributes } from "svelte/elements";

	type Props = SVGAttributes<SVGSVGElement> & {
		icon: string;
        placeholder: Snippet
	};

	let { icon, placeholder, class: className, ...restProps }: Props = $props();

	const IconPromise = $derived(
		import('$lib/registry/icons/__phosphor__.js').then((mod) => mod[icon])
	);
</script>


{#await IconPromise}
	{@render placeholder?.()}
{:then Icon}
	<Icon class={className} {...restProps} />
{/await}