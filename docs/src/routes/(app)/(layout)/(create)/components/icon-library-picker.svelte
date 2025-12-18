<script lang="ts">
	import * as Picker from "./picker/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";
	import {
		iconLibraries,
		type IconLibraryName,
	} from "$lib/registry/config.js";
	import { HugeiconsIcon } from "@hugeicons/svelte";
	import type { Component } from "svelte";
	import LucideLogo from "$lib/registry/icons/logos/lucide.svelte";
	import TablerLogo from "$lib/registry/icons/logos/tabler.svelte";
	import HugeiconsLogo from "$lib/registry/icons/logos/hugeicons.svelte";
	import PhosphorLogo from "$lib/registry/icons/logos/phosphor.svelte";

	const designSystem = useDesignSystem();
	const isMobile = new IsMobile();

	const currentIconLibrary = $derived(
		iconLibraries[designSystem.iconLibrary as keyof typeof iconLibraries]
	);

	const logos = {
		lucide: LucideLogo,
		tabler: TablerLogo,
		hugeicons: HugeiconsLogo,
		phosphor: PhosphorLogo,
	} as const;

	const CurrentLogo = $derived(
		currentIconLibrary?.name ? logos[currentIconLibrary.name as keyof typeof logos] : null
	);

    // TODO: none of these icons will actually load until we use them in components
	const PREVIEW_ICONS = {
		lucide: [
			"CopyIcon",
			"CircleAlertIcon",
			"TrashIcon",
			"ShareIcon",
			"ShoppingBagIcon",
			"MoreHorizontalIcon",
			"Loader2Icon",
			"PlusIcon",
			"MinusIcon",
			"ArrowLeftIcon",
			"ArrowRightIcon",
			"CheckIcon",
			"ChevronDownIcon",
			"ChevronRightIcon",
		],
		tabler: [
			"IconCopy",
			"IconExclamationCircle",
			"IconTrash",
			"IconShare",
			"IconShoppingBag",
			"IconDots",
			"IconLoader",
			"IconPlus",
			"IconMinus",
			"IconArrowLeft",
			"IconArrowRight",
			"IconCheck",
			"IconChevronDown",
			"IconChevronRight",
		],
		hugeicons: [
			"Copy01Icon",
			"AlertCircleIcon",
			"Delete02Icon",
			"Share03Icon",
			"ShoppingBag01Icon",
			"MoreHorizontalCircle01Icon",
			"Loading03Icon",
			"PlusSignIcon",
			"MinusSignIcon",
			"ArrowLeft02Icon",
			"ArrowRight02Icon",
			"Tick02Icon",
			"ArrowDown01Icon",
			"ArrowRight01Icon",
		],
		phosphor: [
			"CopyIcon",
			"WarningCircleIcon",
			"TrashIcon",
			"ShareIcon",
			"BagIcon",
			"DotsThreeIcon",
			"SpinnerIcon",
			"PlusIcon",
			"MinusIcon",
			"ArrowLeftIcon",
			"ArrowRightIcon",
			"CheckIcon",
			"CaretDownIcon",
			"CaretRightIcon",
		],
	};
</script>

<div class="group/picker relative">
	<Picker.Root>
		<Picker.Trigger>
			<div class="flex flex-col justify-start text-left">
				<div class="text-muted-foreground text-xs">Icon Library</div>
				<div class="text-foreground text-sm font-medium">
					{currentIconLibrary?.title}
				</div>
			</div>
			<div
				class="text-foreground *:[svg]:text-foreground! pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none"
			>
				{#if CurrentLogo}
					<CurrentLogo class="size-4" />
				{/if}
			</div>
		</Picker.Trigger>
		<Picker.Content
			side={isMobile.current ? "top" : "right"}
			align={isMobile.current ? "center" : "start"}
		>
			<Picker.RadioGroup bind:value={designSystem.iconLibrary}>
				<Picker.Group>
					{#each Object.values(iconLibraries) as iconLibrary, index (iconLibrary.name)}
						<Picker.RadioItem
							value={iconLibrary.name}
							class="pr-2 *:data-[slot=dropdown-menu-radio-item-indicator]:hidden"
						>
							<Item.Root size="sm">
								<Item.Content class="gap-1">
									<Item.Title class="text-muted-foreground text-xs font-medium">
										{iconLibrary.title}
									</Item.Title>
									{@render IconLibraryPreview(iconLibrary.name)}
								</Item.Content>
							</Item.Root>
						</Picker.RadioItem>
						{#if index < Object.values(iconLibraries).length - 1}
							<Picker.Separator class="opacity-50" />
						{/if}
					{/each}
				</Picker.Group>
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	<LockButton
		prop="iconLibrary"
		class="absolute top-1/2 right-10 -translate-y-1/2"
	/>
</div>

{#snippet IconLibraryPreview(iconLibrary: IconLibraryName)}
	{@const previewIcons = PREVIEW_ICONS[iconLibrary]}
	{#if previewIcons}
		{#if iconLibrary === "lucide"}
			{@render IconLibraryPreviewLucide(previewIcons)}
		{:else if iconLibrary === "tabler"}
			{@render IconLibraryPreviewTabler(previewIcons)}
		{:else if iconLibrary === "hugeicons"}
			{@render IconLibraryPreviewHugeicons(previewIcons)}
		{:else if iconLibrary === "phosphor"}
			{@render IconLibraryPreviewPhosphor(previewIcons)}
		{/if}
	{/if}
{/snippet}

{#snippet IconLibraryPreviewLucide(previewIcons: string[])}
	{#await import("$lib/registry/icons/__lucide__.js")}
		<div class="-mx-1 grid w-full grid-cols-7 gap-2">
			{#each previewIcons as iconName (iconName)}
				<div
					class="bg-muted size-6 animate-pulse rounded"
				></div>
			{/each}
		</div>
	{:then mod}
		<div class="-mx-1 grid w-full grid-cols-7 gap-2">
			{#each previewIcons as iconName (iconName)}
				{@const Icon = (mod as unknown as Record<string, Component>)[iconName]}
				{#if Icon}
					<div class="flex size-6 items-center justify-center *:[svg]:size-5">
						<Icon />
					</div>
				{/if}
			{/each}
		</div>
	{/await}
{/snippet}

{#snippet IconLibraryPreviewTabler(previewIcons: string[])}
	{#await import("$lib/registry/icons/__tabler__.js")}
		<div class="-mx-1 grid w-full grid-cols-7 gap-2">
			{#each previewIcons as iconName (iconName)}
				<div
					class="bg-muted size-6 animate-pulse rounded"
				></div>
			{/each}
		</div>
	{:then mod}
		<div class="-mx-1 grid w-full grid-cols-7 gap-2">
			{#each previewIcons as iconName (iconName)}
				{@const Icon = (mod as unknown as Record<string, Component>)[iconName]}
				{#if Icon}
					<div class="flex size-6 items-center justify-center *:[svg]:size-5">
						<Icon />
					</div>
				{/if}
			{/each}
		</div>
	{/await}
{/snippet}

{#snippet IconLibraryPreviewHugeicons(previewIcons: string[])}
	{#await import("$lib/registry/icons/__hugeicons__.js")}
		<div class="-mx-1 grid w-full grid-cols-7 gap-2">
			{#each previewIcons as iconName (iconName)}
				<div
					class="bg-muted size-6 animate-pulse rounded"
				></div>
			{/each}
		</div>
	{:then mod}
		<div class="-mx-1 grid w-full grid-cols-7 gap-2">
			{#each previewIcons as iconName (iconName)}
				{@const Icon = (mod as Record<string, unknown>)[iconName]}
				{#if Icon}
					<div class="flex size-6 items-center justify-center">
						<HugeiconsIcon icon={Icon} strokeWidth={2} className="size-5" />
					</div>
				{/if}
			{/each}
		</div>
	{/await}
{/snippet}

{#snippet IconLibraryPreviewPhosphor(previewIcons: string[])}
	{#await import("$lib/registry/icons/__phosphor__.js")}
		<div class="-mx-1 grid w-full grid-cols-7 gap-2">
			{#each previewIcons as iconName (iconName)}
				<div
					class="bg-muted size-6 animate-pulse rounded"
				></div>
			{/each}
		</div>
	{:then mod}
		<div class="-mx-1 grid w-full grid-cols-7 gap-2">
			{#each previewIcons as iconName (iconName)}
				{@const Icon = (mod as unknown as Record<string, Component>)[iconName]}
				{#if Icon}
					<div class="flex size-6 items-center justify-center *:[svg]:size-5">
						<Icon />
					</div>
				{/if}
			{/each}
		</div>
	{/await}
{/snippet}
