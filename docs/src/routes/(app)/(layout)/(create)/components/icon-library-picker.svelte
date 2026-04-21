<script lang="ts">
	import * as Picker from "./picker/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";
	import { iconLibraries } from "$lib/registry/config.js";
	import LucideLogo from "$lib/registry/icons/logos/lucide.svelte";
	import TablerLogo from "$lib/registry/icons/logos/tabler.svelte";
	import HugeiconsLogo from "$lib/registry/icons/logos/hugeicons.svelte";
	import PhosphorLogo from "$lib/registry/icons/logos/phosphor.svelte";
	import RemixiconLogo from "$lib/registry/icons/logos/remixicon.svelte";

	type Props = {
		submenu?: boolean;
	};

	let { submenu = false }: Props = $props();

	const designSystem = useDesignSystem();
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
</script>

<div class="group/picker relative">
	<Picker.Root {submenu}>
		<Picker.Trigger {submenu}>
			<div class="flex flex-col justify-start text-left">
				<div class="text-muted-foreground text-xs">Icon Library</div>
				<div class="text-foreground text-sm font-medium">
					{currentIconLibrary?.title}
				</div>
			</div>
			<div
				class="text-foreground *:[svg]:text-foreground! pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none"
			>
				<CurrentLogo class="size-4" />
			</div>
		</Picker.Trigger>
		<Picker.Content
			side={isMobile.current ? "top" : submenu ? "left" : "right"}
			align={isMobile.current ? "center" : "start"}
			sideOffset={submenu ? 5 : 20}
			{submenu}
		>
			<Picker.RadioGroup bind:value={designSystem.iconLibrary}>
				<Picker.Group>
					{#each Object.values(iconLibraries) as iconLibrary (iconLibrary.name)}
						<Picker.RadioItem closeOnSelect={false} value={iconLibrary.name}>
							{iconLibrary.title}
						</Picker.RadioItem>
					{/each}
				</Picker.Group>
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	<LockButton prop="iconLibrary" class="absolute top-1/2 right-10 -translate-y-1/2" />
</div>
