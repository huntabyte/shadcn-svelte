<script lang="ts">
	import Settings2Icon from "@lucide/svelte/icons/settings-2";
    import * as Field from "$lib/registry/ui/field/index.js";
	import RadiusPicker from "./radius-picker.svelte";
</script>

<div
	class="no-scrollbar -mx-2.5 flex flex-col overflow-y-auto p-1 md:mx-0 md:h-[calc(100svh-var(--header-height)-2rem)] md:w-48 md:gap-0 md:py-0"
>
	<div
		class="hidden items-center gap-2 px-[calc(--spacing(2.5))] pb-1 md:flex md:flex-col md:items-start"
	>
		<Settings2Icon class="size-4" />
		<div class="relative flex flex-col gap-1 rounded-lg text-[13px]/snug">
			<div class="flex items-center gap-1 text-balance font-medium">
				Build your own shadcn-svelte
			</div>
			<div class="hidden md:flex">
				When you're done, click Create Project to start a new project.
			</div>
		</div>
	</div>
	<div
		class="no-scrollbar h-14 overflow-x-auto overflow-y-hidden p-px md:h-full md:overflow-x-hidden md:overflow-y-auto"
	>
		<Field.Group class="flex h-full flex-1 flex-row gap-2 md:flex-col md:gap-0">
			<!-- <PresetPicker presets={PRESETS} {isMobile} {anchorRef} />
			<StylePicker styles={STYLES} {isMobile} {anchorRef} />
			<BaseColorPicker {isMobile} {anchorRef} />
			<ThemePicker themes={availableThemes} {isMobile} {anchorRef} />
			<IconLibraryPicker {isMobile} {anchorRef} />
			<FontPicker fonts={FONTS} {isMobile} {anchorRef} /> -->
			<RadiusPicker />
			<!-- <MenuColorPicker {isMobile} {anchorRef} />
			<MenuAccentPicker {isMobile} {anchorRef} />
			<CustomizerControls className="mt-auto hidden w-full flex-col md:flex" /> -->
		</Field.Group>
	</div>
</div>