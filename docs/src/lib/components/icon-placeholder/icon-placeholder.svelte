<script lang="ts">
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import SquareIcon from "@lucide/svelte/icons/square";
	import LucideIcon from "./lucide-icon.svelte";
	import TablerIcon from "./tabler-icon.svelte";
	import PhosphorIcon from "./phosphor-icon.svelte";
	import HugeiconsIcon from "./hugeicons-icon.svelte";
	import type { HugeIconsIconName } from "$lib/registry/icons/__hugeicons__.js";
	import type { LucideIconName } from "$lib/registry/icons/__lucide__.js";
	import type { TablerIconName } from "$lib/registry/icons/__tabler__.js";
	import type { PhosphorIconName } from "$lib/registry/icons/__phosphor__.js";

	type Props = {
		hugeicons: HugeIconsIconName;
		lucide: LucideIconName;
		tabler: TablerIconName;
		phosphor: PhosphorIconName;
		class?: string;
		"data-slot"?: string;
		"data-icon"?: string;
	};

	let { hugeicons, lucide, tabler, phosphor, class: className, ...restProps }: Props = $props();

	const designSystem = useDesignSystem();
</script>

{#snippet placeholder()}
	<SquareIcon class={className} {...restProps} />
{/snippet}

{#if designSystem.iconLibrary === "hugeicons"}
	<HugeiconsIcon icon={hugeicons} {className} {placeholder} {...restProps} />
{:else if designSystem.iconLibrary === "lucide"}
	<LucideIcon icon={lucide} class={className} {placeholder} {...restProps} />
{:else if designSystem.iconLibrary === "tabler"}
	<TablerIcon icon={tabler} class={className} {placeholder} {...restProps} />
{:else if designSystem.iconLibrary === "phosphor"}
	<PhosphorIcon icon={phosphor} class={className} {placeholder} {...restProps} />
{/if}
