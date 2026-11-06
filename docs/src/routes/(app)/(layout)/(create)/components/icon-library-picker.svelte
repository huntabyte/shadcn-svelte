<script lang="ts">
	import * as Picker from "$lib/components/picker/index.js";
	import HugeiconsLogo from "$lib/registry/icons/logos/hugeicons.svelte";
	import LucideLogo from "$lib/registry/icons/logos/lucide.svelte";
	import PhosphorLogo from "$lib/registry/icons/logos/phosphor.svelte";
	import RemixiconLogo from "$lib/registry/icons/logos/remixicon.svelte";
	import TablerLogo from "$lib/registry/icons/logos/tabler.svelte";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { iconLibraries } from "$lib/registry/config.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";
	import { CreatePicker } from "./picker-state.svelte.js";
	import { usePreviewOverride } from "./preview-override-context.svelte.js";

	type Props = {
		submenu?: boolean;
	};

	let { submenu = false }: Props = $props();

	const designSystem = useDesignSystem();
	const previewOverride = usePreviewOverride();
	const isMobile = new IsMobile();

	const currentIconLibrary = $derived(iconLibraries[designSystem.iconLibrary]);

	const logos = {
		lucide: LucideLogo,
		tabler: TablerLogo,
		hugeicons: HugeiconsLogo,
		phosphor: PhosphorLogo,
		remixicon: RemixiconLogo,
	} as const;

	const CurrentLogo = $derived(logos[currentIconLibrary.name]);

	const picker = new CreatePicker(() => previewOverride.clearOverride());
</script>

<div class="group/picker relative">
	<Picker.Root bind:open={picker.open} {submenu}>
		<Picker.Trigger
			onpointerdown={picker.capture}
			onkeydown={(event) => {
				if (event.key === "Enter" || event.key === " ") picker.capture();
			}}
			{submenu}
		>
			<div class="flex flex-col justify-start text-left">
				<div class="text-xs text-muted-foreground">Icon Library</div>
				<div class="text-sm font-medium text-foreground">
					{currentIconLibrary?.title}
				</div>
			</div>
			<div
				class="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base text-foreground select-none *:[svg]:text-foreground!"
			>
				<CurrentLogo class="size-4" />
			</div>
		</Picker.Trigger>
		<Picker.Content
			onmouseleave={() => previewOverride.clearOverride()}
			preventScroll={false}
			customAnchor={isMobile.current ? picker.layout?.anchor : undefined}
			class="max-md:w-(--bits-dropdown-menu-anchor-width)"
			side={isMobile.current ? "top" : submenu ? "left" : "right"}
			align={isMobile.current ? "center" : "start"}
			sideOffset={isMobile.current ? 8 : submenu ? 5 : 20}
			{submenu}
		>
			<Picker.RadioGroup bind:value={designSystem.iconLibrary}>
				<Picker.Group>
					{#each Object.values(iconLibraries) as iconLibrary (iconLibrary.name)}
						<Picker.RadioItem
							onItemPreview={isMobile.current
								? undefined
								: (value) =>
										previewOverride.setOverride({
											iconLibrary: value as typeof designSystem.iconLibrary,
										})}
							closeOnSelect={false}
							value={iconLibrary.name}
						>
							{iconLibrary.title}
						</Picker.RadioItem>
					{/each}
				</Picker.Group>
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	<LockButton prop="iconLibrary" class="absolute top-1/2 right-10 -translate-y-1/2" />
</div>
