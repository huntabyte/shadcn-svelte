<script lang="ts">
	import SquareIcon from "@lucide/svelte/icons/square";
	import LucideIcon from "$lib/components/icon-placeholder/lucide-icon.svelte";
	import type { LucideIconName } from "$lib/registry/icons/__lucide__/index.js";
	import type { SVGAttributes } from "svelte/elements";
	let {
		lucide,
		class: className,
		...restProps
	}: SVGAttributes<SVGSVGElement> & { lucide: LucideIconName } = $props();
</script>

<LucideIcon icon={lucide} class={className} {...restProps}>
	{#snippet placeholder()}<SquareIcon class={className} />{/snippet}
</LucideIcon>
