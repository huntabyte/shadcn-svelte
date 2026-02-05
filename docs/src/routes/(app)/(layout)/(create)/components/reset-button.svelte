<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Undo02Icon } from "@hugeicons/core-free-icons";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";

	type Props = {
		submenu?: boolean;
	};

	let { submenu = false }: Props = $props();

	const designSystem = useDesignSystem();
</script>

{#if submenu}
	<DropdownMenu.Item
		onSelect={designSystem.reset}
		closeOnSelect={false}
		class="border-foreground/10 bg-muted/50 h-[calc(--spacing(13.5))] w-[140px] touch-manipulation justify-between rounded-xl border select-none focus-visible:border-transparent focus-visible:ring-1 sm:rounded-lg md:w-full md:rounded-lg md:border-transparent md:bg-transparent md:pr-3.5! md:pl-2!"
	>
		<div class="flex flex-col justify-start text-left">
			<div class="text-muted-foreground text-xs">Reset</div>
			<div class="text-foreground text-sm font-medium">Start Over</div>
		</div>
		<HugeiconsIcon icon={Undo02Icon} className="-translate-x-0.5" />
	</DropdownMenu.Item>
{:else}
	<Button
		variant="ghost"
		size="sm"
		onclick={designSystem.reset}
		class="border-foreground/10 bg-muted/50 h-[calc(--spacing(13.5))] w-[140px] touch-manipulation justify-between rounded-xl border select-none focus-visible:border-transparent focus-visible:ring-1 sm:rounded-lg md:w-full md:rounded-lg md:border-transparent md:bg-transparent md:pr-3.5! md:pl-2!"
	>
		<div class="flex flex-col justify-start text-left">
			<div class="text-muted-foreground text-xs">Reset</div>
			<div class="text-foreground text-sm font-medium">Start Over</div>
		</div>
		<HugeiconsIcon icon={Undo02Icon} className="-translate-x-0.5" />
	</Button>
{/if}
