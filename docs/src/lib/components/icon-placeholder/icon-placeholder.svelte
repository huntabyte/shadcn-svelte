<script lang="ts">
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import SquareIcon from "@lucide/svelte/icons/square";
	import LucideIcon from "./lucide-icon.svelte";
	import TablerIcon from "./tabler-icon.svelte";
	import PhosphorIcon from "./phosphor-icon.svelte";
	import HugeiconsIcon from "./hugeicons-icon.svelte";
	import type { HugeIconsIconName } from "$lib/registry/icons/__hugeicons__/index.js";
	import type { LucideIconName } from "$lib/registry/icons/__lucide__/index.js";
	import type { TablerIconName } from "$lib/registry/icons/__tabler__/index.js";
	import type { PhosphorIconName } from "$lib/registry/icons/__phosphor__/index.js";

	type Props = {
		hugeicons: HugeIconsIconName;
		lucide: LucideIconName;
		tabler: TablerIconName;
		phosphor: PhosphorIconName;
		class?: string;
		"data-slot"?: string;
		"data-icon"?: string;
		"aria-hidden"?: boolean;
		"aria-label"?: string | null;
		role?: string;
	};

	let { hugeicons, lucide, tabler, phosphor, class: className, ...restProps }: Props = $props();

	const designSystem = useDesignSystem();
</script>

{#snippet PlaceholderIcon()}
	<SquareIcon class={className} {...restProps} />
{/snippet}

{#if designSystem.iconLibrary === "hugeicons"}
	<HugeiconsIcon icon={hugeicons} {className} {...restProps}>
		{#snippet placeholder()}
			{@render PlaceholderIcon()}
		{/snippet}
	</HugeiconsIcon>
{:else if designSystem.iconLibrary === "lucide"}
	<LucideIcon icon={lucide} class={className} {...restProps}>
		{#snippet placeholder()}
			{@render PlaceholderIcon()}
		{/snippet}
	</LucideIcon>
{:else if designSystem.iconLibrary === "tabler"}
	<TablerIcon icon={tabler} class={className} {...restProps}>
		{#snippet placeholder()}
			{@render PlaceholderIcon()}
		{/snippet}
	</TablerIcon>
{:else if designSystem.iconLibrary === "phosphor"}
	<PhosphorIcon icon={phosphor} class={className} {...restProps}>
		{#snippet placeholder()}
			{@render PlaceholderIcon()}
		{/snippet}
	</PhosphorIcon>
{/if}
