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
	import MenuColorPicker from "./menu-picker.svelte";
	import MenuAccentPicker from "./menu-accent-picker.svelte";
	import RandomButton from "./random-button.svelte";
	import CopyPreset from "./copy-preset.svelte";
	import OpenPreset from "./open-preset.svelte";
	import MainMenu from "./main-menu.svelte";
	import Cta from "$lib/components/cta.svelte";
	import Ethical from "$lib/components/ethical.svelte";
	import { FONT_HEADING_OPTIONS, FONTS } from "$lib/fonts.js";
	import ProjectForm from "./project-form.svelte";
</script>

<Tooltip.Provider>
	<div
		class="top-24 right-12 isolate z-10 flex min-h-0 w-full flex-col gap-2 md:w-(--customizer-width)"
	>
		<Card.Root
			class="dark bg-card/90 top-24 right-12 isolate z-10 max-h-full min-h-0 w-full self-start rounded-2xl shadow-xl backdrop-blur-xl md:w-(--customizer-width)"
			size="sm"
		>
			<Card.Header
				class="hidden items-center justify-between gap-2 border-b group-data-reversed/layout:flex-row-reverse md:flex"
			>
				<MainMenu />
			</Card.Header>
			<Card.Content
				class="no-scrollbar min-h-0 flex-1 overflow-x-auto overflow-y-hidden md:overflow-y-auto"
			>
				<FieldGroup.Group
					class="flex-row gap-2.5 py-px **:data-[slot=field-separator]:-mx-4 **:data-[slot=field-separator]:w-auto md:flex-col md:gap-3.25"
				>
					<StylePicker />
					<FieldGroup.Separator class="hidden md:block" />
					<BaseColorPicker />
					<ThemePicker />
					<ChartColorPicker />
					<FieldGroup.Separator class="hidden md:block" />
					<FontPicker label="Heading" param="fontHeading" fonts={FONT_HEADING_OPTIONS} />
					<FontPicker label="Font" param="font" fonts={FONTS} />
					<FieldGroup.Separator class="hidden md:block" />
					<IconLibraryPicker />
					<RadiusPicker />
					<FieldGroup.Separator class="hidden md:block" />
					<MenuColorPicker />
					<MenuAccentPicker />
				</FieldGroup.Group>
			</Card.Content>
			<Card.Footer
				class="flex min-w-0 gap-2 md:flex-col md:rounded-b-none md:**:[button,a]:w-full"
			>
				<CopyPreset class="min-w-0 flex-1 md:flex-none" />
				<OpenPreset class="max-w-20 min-w-0 flex-1 sm:max-w-none md:flex-none" />
				<RandomButton class="max-w-20 min-w-0 flex-1 sm:max-w-none md:flex-none" />
			</Card.Footer>
			<Card.Footer
				class="-mt-3 hidden min-w-0 gap-2 md:flex md:flex-col md:**:[button,a]:w-full"
			>
				<ProjectForm />
			</Card.Footer>
		</Card.Root>
		<div class="hidden w-full flex-1 flex-col justify-end gap-2 md:flex">
			<Cta /><!--<Ethical />-->
		</div>
	</div>
</Tooltip.Provider>
