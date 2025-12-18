<script lang="ts">
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import SquareIcon from "@lucide/svelte/icons/square";
	import LucideIcon from "./lucide-icon.svelte";
	import TablerIcon from "./tabler-icon.svelte";
	import PhosphorIcon from "./phosphor-icon.svelte";
	import HugeiconsIcon from "./hugeicons-icon.svelte";

	type Props = {
		/**
		 * Hugeicons icon in PascalCase
		 */
		hugeicons: string;
		/**
		 * Lucide icon in kebab-case
		 */
		lucide: string;
		/**
		 * Tabler icon in kebab-case
		 */
		tabler: string;
		/**
		 * Phosphor icon in PascalCase
		 */
		phosphor: string;
		class?: string;
		"data-slot"?: string;
	};

	let { hugeicons, lucide, tabler, phosphor, class: className, ...restProps }: Props = $props();

	const designSystem = useDesignSystem();
</script>

{#snippet placeholder()}
	<SquareIcon class={className} />
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
