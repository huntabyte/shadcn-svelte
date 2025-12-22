<script lang="ts">
	import * as Picker from "./picker/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";
	import type { MenuColorValue } from "$lib/registry/config.js";
	import { mode } from "mode-watcher";
	import { browser } from "$app/environment";
	import MenuIconDefault from "./menu-icon-default.svelte";
	import MenuIconInverted from "./menu-icon-inverted.svelte";

	type Props = {
		submenu?: boolean;
	};

	let { submenu = false }: Props = $props();

	const designSystem = useDesignSystem();
	const isMobile = new IsMobile();

	const MENU_OPTIONS = [
		{
			value: "default" as const,
			label: "Default",
			icon: MenuIconDefault,
		},
		{
			value: "inverted" as const,
			label: "Inverted",
			icon: MenuIconInverted,
		},
	] as const;

	const currentMenu = $derived(
		MENU_OPTIONS.find((menu) => menu.value === designSystem.menuColor) ?? MENU_OPTIONS[0]
	);

	const mounted = $derived(browser);
	const isDisabled = $derived(mounted && mode.current === "dark");
</script>

<div class="group/picker relative">
	<Picker.Root {submenu}>
		<Picker.Trigger disabled={isDisabled} {submenu} class="data-disabled:opacity-50">
			<div class="flex flex-col justify-start text-left">
				<div class="text-muted-foreground text-xs">Menu Color</div>
				<div class="text-foreground text-sm font-medium">
					{currentMenu.label}
				</div>
			</div>
			<div
				class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none"
			>
				<currentMenu.icon />
			</div>
		</Picker.Trigger>
		<Picker.Content
			side={isMobile.current ? "top" : "right"}
			align={isMobile.current ? "center" : "start"}
			{submenu}
		>
			<Picker.RadioGroup
				value={currentMenu?.value}
				onValueChange={(value) => {
					designSystem.menuColor = value as MenuColorValue;
				}}
			>
				<Picker.Group>
					{#each MENU_OPTIONS as menu (menu.value)}
						{@const Icon = menu.icon}
						<Picker.RadioItem value={menu.value} closeOnSelect={false}>
							<div class="flex items-center gap-2">
								<Icon />
								{menu.label}
							</div>
						</Picker.RadioItem>
					{/each}
				</Picker.Group>
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	<LockButton prop="menuColor" class="absolute top-1/2 right-10 -translate-y-1/2" />
</div>
