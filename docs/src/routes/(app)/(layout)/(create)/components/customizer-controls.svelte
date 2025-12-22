<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
	import { cn } from "$lib/utils.js";
	import { DiceFaces05Icon, Undo02Icon } from "@hugeicons/core-free-icons";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";

	type Props = {
		class?: string;
		submenu?: boolean;
	};

	let { class: className, submenu = false }: Props = $props();

	const designSystem = useDesignSystem();
</script>

<div class={cn("items-center gap-0", className)}>
	{#if submenu}
		<DropdownMenu.Item
			onSelect={designSystem.randomize}
			closeOnSelect={false}
			class="border-foreground/10 bg-muted/50 h-[calc(--spacing(13.5))] w-[140px] touch-manipulation justify-between rounded-xl border select-none focus-visible:border-transparent focus-visible:ring-1 sm:rounded-lg md:w-full md:rounded-lg md:border-transparent md:bg-transparent md:pr-3.5! md:pl-2!"
		>
			<div class="flex flex-col justify-start text-left">
				<div class="text-muted-foreground text-xs">Shuffle</div>
				<div class="text-foreground text-sm font-medium">Try Random</div>
			</div>
			<HugeiconsIcon icon={DiceFaces05Icon} className="size-5 md:hidden" />
			<Kbd.Root class="bg-foreground/10 text-foreground hidden md:flex">R</Kbd.Root>
		</DropdownMenu.Item>
	{:else}
		<Button
			variant="ghost"
			size="sm"
			onclick={designSystem.randomize}
			class="border-foreground/10 bg-muted/50 h-[calc(--spacing(13.5))] w-[140px] touch-manipulation justify-between rounded-xl border select-none focus-visible:border-transparent focus-visible:ring-1 sm:rounded-lg md:w-full md:rounded-lg md:border-transparent md:bg-transparent md:pr-3.5! md:pl-2!"
		>
			<div class="flex flex-col justify-start text-left">
				<div class="text-muted-foreground text-xs">Shuffle</div>
				<div class="text-foreground text-sm font-medium">Try Random</div>
			</div>
			<HugeiconsIcon icon={DiceFaces05Icon} className="size-5 md:hidden" />
			<Kbd.Root class="bg-foreground/10 text-foreground hidden md:flex">R</Kbd.Root>
		</Button>
	{/if}
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
</div>
