<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as FieldGroup from "$lib/registry/ui/field/index.js";
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
	import MainMenu from "./main-menu.svelte";
	import Cta from "$lib/components/cta.svelte";
	import Ethical from "$lib/components/ethical.svelte";
	import Separator from "$lib/registry/ui/separator/separator.svelte";
	import { FONT_HEADING_OPTIONS, FONTS } from "$lib/fonts.js";
	import ProjectForm from "./project-form.svelte";
</script>

<div
	class="top-24 right-12 isolate z-10 flex min-h-0 w-full flex-col gap-2 md:w-(--customizer-width)"
>
	<Card.Root
		class="dark bg-card/90 max-h-full min-h-0 w-full gap-0 rounded-2xl shadow-xl backdrop-blur-xl"
		size="sm"
	>
		<Card.Header
			class="hidden items-center justify-between gap-2 border-b group-data-reversed/layout:flex-row-reverse md:flex"
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
		<Card.Footer
			class="flex min-w-0 gap-2 md:flex-col md:rounded-b-none md:**:[button,a]:w-full"
		>
			<CopyPreset class="flex-1 md:flex-none" />
			<RandomButton />
			<!-- <ActionMenu {itemsByBase} /> -->
		</Card.Footer>
		<Card.Footer class="hidden min-w-0 gap-2 md:flex md:flex-col md:**:[button,a]:w-full">
			<ProjectForm />
		</Card.Footer>
	</Card.Root>
	<div class="flex w-full flex-1 flex-col justify-end gap-2">
		<Cta /><Ethical />
	</div>
</div>
