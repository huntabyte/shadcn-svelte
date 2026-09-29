<script lang="ts">
	import { DiceFaces05Icon } from "@hugeicons/core-free-icons";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	type Props = {
		submenu?: boolean;
	};

	let { submenu = false }: Props = $props();

	const designSystem = useDesignSystem();
</script>

{#if submenu}
	<DropdownMenu.Item
		onSelect={designSystem.randomize}
		closeOnSelect={false}
		class="h-[calc(--spacing(13.5))] w-[140px] touch-manipulation justify-between rounded-xl border border-foreground/10 bg-muted/50 select-none focus-visible:border-transparent focus-visible:ring-1 sm:rounded-lg md:w-full md:rounded-lg md:border-transparent md:bg-transparent md:pr-3.5! md:pl-2!"
	>
		<div class="flex flex-col justify-start text-left">
			<div class="text-xs text-muted-foreground">Shuffle</div>
			<div class="text-sm font-medium text-foreground">Try Random</div>
		</div>
		<HugeiconsIcon icon={DiceFaces05Icon} className="size-5 md:hidden" />
		<Kbd.Root class="hidden bg-foreground/10 text-foreground md:flex">R</Kbd.Root>
	</DropdownMenu.Item>
{:else}
	<Button
		variant="outline"
		onclick={designSystem.randomize}
		class="flex-1 touch-manipulation bg-transparent! px-2! py-0! text-sm! transition-none select-none hover:bg-muted! md:flex-none pointer-coarse:h-10!"
	>
		<span class="w-full text-center font-medium">Shuffle</span>
	</Button>
{/if}
