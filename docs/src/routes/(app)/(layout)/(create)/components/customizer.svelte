<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as FieldGroup from "$lib/registry/ui/field/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import RadiusPicker from "./radius-picker.svelte";
	import StylePicker from "./style-picker.svelte";
	import ThemePicker from "./theme-picker.svelte";
	import ChartColorPicker from "./chart-color-picker.svelte";
	import BaseColorPicker from "./base-color-picker.svelte";
	import IconLibraryPicker from "./icon-library-picker.svelte";
	import FontPicker from "./font-picker.svelte";
	import MenuColorPicker from "./menu-color-picker.svelte";
	import MenuAccentPicker from "./menu-accent-picker.svelte";
	import RandomButton from "./random-button.svelte";
	import CopyPreset from "./copy-preset.svelte";
	import OpenPreset from "./open-preset.svelte";
	import MainMenu from "./main-menu.svelte";
	import Cta from "$lib/components/cta.svelte";
	import Ethical from "$lib/components/ethical.svelte";
	import Separator from "$lib/registry/ui/separator/separator.svelte";
	import { FONT_HEADING_OPTIONS, FONTS } from "$lib/fonts.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import SquareTerminal from "@lucide/svelte/icons/square-terminal";
	import { InitializeProjectCtx } from "./initialize-project-context.svelte.js";

	const initializeProjectCtx = InitializeProjectCtx.get();
</script>

<Tooltip.Provider>
	<div
		class="top-24 right-12 isolate z-10 flex min-h-0 w-full flex-col gap-2 self-start md:w-(--customizer-width)"
	>
		<Card.Root
			class="dark bg-card/90 max-h-(--preview-height) min-h-0 w-full gap-0 rounded-2xl shadow-xl backdrop-blur-xl"
			size="sm"
		>
			<Card.Header
				class="hidden items-center justify-between gap-2 border-b px-3! group-data-reversed/layout:flex-row-reverse md:flex"
			>
				<MainMenu />
			</Card.Header>
			<Card.Content
				class="no-scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-hidden p-0 md:overflow-y-auto"
			>
				<FieldGroup.Group class="flex-row gap-2.5 p-3 md:flex-col md:gap-3.25">
					<StylePicker />
				</FieldGroup.Group>
				<Separator />
				<FieldGroup.Group class="flex-row gap-2.5 p-3 md:flex-col md:gap-3.25">
					<BaseColorPicker />
					<ThemePicker />
					<ChartColorPicker />
				</FieldGroup.Group>
				<Separator />
				<FieldGroup.Group class="flex-row gap-2.5 p-3 md:flex-col md:gap-3.25">
					<FontPicker label="Heading" param="fontHeading" fonts={FONT_HEADING_OPTIONS} />
					<FontPicker label="Font" param="font" fonts={FONTS} />
				</FieldGroup.Group>
				<Separator />
				<FieldGroup.Group class="flex-row gap-2.5 p-3 md:flex-col md:gap-3.25">
					<IconLibraryPicker />
					<RadiusPicker />
				</FieldGroup.Group>
				<Separator />
				<FieldGroup.Group class="flex-row gap-2.5 p-3 md:flex-col md:gap-3.25">
					<MenuColorPicker />
					<MenuAccentPicker />
				</FieldGroup.Group>
			</Card.Content>
			<Card.Footer class="flex min-w-0 gap-2 px-3! md:flex-col md:**:[button,a]:w-full">
				<CopyPreset class="flex-1 md:flex-none" />
				<OpenPreset class="max-w-20 min-w-0 flex-1 sm:max-w-none md:flex-none" />
				<RandomButton />
			</Card.Footer>
			<Card.Footer class="flex min-w-0 gap-2 px-3! pt-2 md:flex-col md:**:[button,a]:w-full">
				<Button variant="default" onclick={() => (initializeProjectCtx.open = true)}>
					<SquareTerminal />
					Initialize Project
				</Button>
			</Card.Footer>
		</Card.Root>
		<div class="hidden w-full flex-1 flex-col gap-12 md:flex">
			<Cta />
		</div>
		<div class="hidden flex-col gap-12 md:flex">
			<Ethical />
		</div>
	</div>
</Tooltip.Provider>
