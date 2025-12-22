<script lang="ts">
	import { buttonVariants } from "$lib/registry/ui/button/button.svelte";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import IconPlaceholder from "./icon-placeholder/icon-placeholder.svelte";
	import PresetPicker from "../../routes/(app)/(layout)/(create)/components/preset-picker.svelte";
	import StylePicker from "../../routes/(app)/(layout)/(create)/components/style-picker.svelte";
	import BaseColorPicker from "../../routes/(app)/(layout)/(create)/components/base-color-picker.svelte";
	import ThemePicker from "../../routes/(app)/(layout)/(create)/components/theme-picker.svelte";
	import IconLibraryPicker from "../../routes/(app)/(layout)/(create)/components/icon-library-picker.svelte";
	import FontPicker from "../../routes/(app)/(layout)/(create)/components/font-picker.svelte";
	import RadiusPicker from "../../routes/(app)/(layout)/(create)/components/radius-picker.svelte";
	import MenuColorPicker from "../../routes/(app)/(layout)/(create)/components/menu-color-picker.svelte";
	import MenuAccentPicker from "../../routes/(app)/(layout)/(create)/components/menu-accent-picker.svelte";
	import CustomizerControls from "../../routes/(app)/(layout)/(create)/components/customizer-controls.svelte";
	import { cn } from "$lib/utils.js";
	import ModeSwitcher from "./mode-switcher.svelte";
	import { setMode, mode } from "mode-watcher";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
</script>

<Tooltip.Provider>
	<DropdownMenu.Root>
		<DropdownMenu.Trigger
			class={cn(buttonVariants({ variant: "ghost", size: "icon-sm" }), "hidden md:flex")}
		>
			<IconPlaceholder
				lucide="SlidersHorizontalIcon"
				phosphor="SlidersHorizontalIcon"
				hugeicons="SlidersHorizontalIcon"
				tabler="IconAdjustmentsHorizontal"
			/>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end" class="min-w-64">
			<Field.Group class="flex h-full flex-1 flex-row gap-2 md:flex-col md:gap-0">
				<PresetPicker submenu />
				<StylePicker submenu />
				<BaseColorPicker submenu />
				<ThemePicker submenu />
				<IconLibraryPicker submenu />
				<FontPicker submenu />
				<RadiusPicker submenu />
				<MenuColorPicker submenu />
				<MenuAccentPicker submenu />
				<DropdownMenu.Separator />
				<CustomizerControls submenu />
				<DropdownMenu.Separator />
				<DropdownMenu.Item
					closeOnSelect={false}
					onclick={() => {
						setMode(mode.current === "dark" ? "light" : "dark");
					}}
					class="border-foreground/10 bg-muted/50 h-[calc(--spacing(13.5))] w-[140px] touch-manipulation justify-between rounded-xl border select-none focus-visible:border-transparent focus-visible:ring-1 sm:rounded-lg md:w-full md:rounded-lg md:border-transparent md:bg-transparent md:pr-3.5! md:pl-2!"
				>
					<div class="flex flex-col justify-start text-left">
						<div class="text-muted-foreground text-xs">Mode</div>
						<div class="text-foreground text-sm font-medium">
							Switch to {mode.current === "dark" ? "Light" : "Dark"} Mode
						</div>
					</div>
					<div class="md:hidden [&_svg]:size-5">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="size-4.5"
						>
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
							<path d="M12 3l0 18" />
							<path d="M12 9l4.65 -4.65" />
							<path d="M12 14.3l7.37 -7.37" />
							<path d="M12 19.6l8.85 -8.85" />
						</svg>
						<span class="sr-only">Toggle theme</span>
					</div>
					<Kbd.Root class="bg-foreground/10 text-foreground hidden md:flex">D</Kbd.Root>
				</DropdownMenu.Item>
			</Field.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</Tooltip.Provider>
<ModeSwitcher class="md:hidden" />
