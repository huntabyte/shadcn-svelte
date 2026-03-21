<script lang="ts">
	import * as Picker from "./picker/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";
	import type { MenuColorValue } from "$lib/registry/config.js";
	import { mode } from "mode-watcher";
	import { browser } from "$app/environment";
	import MenuIcon from "@lucide/svelte/icons/menu";

	type ColorChoice = "default" | "inverted";
	type SurfaceChoice = "solid" | "translucent";

	type Props = {
		submenu?: boolean;
	};

	let { submenu = false }: Props = $props();

	const designSystem = useDesignSystem();
	const isMobile = new IsMobile();

	const MENU_OPTIONS: { value: MenuColorValue; label: string }[] = [
		{ value: "default", label: "Default / Solid" },
		{ value: "default-translucent", label: "Default / Translucent" },
		{ value: "inverted", label: "Inverted / Solid" },
		{ value: "inverted-translucent", label: "Inverted / Translucent" },
	];

	function getMenuColorValue(color: ColorChoice, translucent: boolean): MenuColorValue {
		if (color === "default") {
			return translucent ? "default-translucent" : "default";
		}
		return translucent ? "inverted-translucent" : "inverted";
	}

	function isTranslucentMenuColor(value: MenuColorValue): boolean {
		return value === "default-translucent" || value === "inverted-translucent";
	}

	const currentMenu = $derived(
		MENU_OPTIONS.find((menu) => menu.value === designSystem.menuColor) ?? MENU_OPTIONS[0]
	);

	const colorChoice = $derived<ColorChoice>(
		designSystem.menuColor === "inverted" || designSystem.menuColor === "inverted-translucent"
			? "inverted"
			: "default"
	);

	const surfaceChoice = $derived<SurfaceChoice>(
		designSystem.menuColor === "default-translucent" ||
			designSystem.menuColor === "inverted-translucent"
			? "translucent"
			: "solid"
	);

	const mounted = $derived(browser);
	const isDark = $derived(mounted && mode.current === "dark");

	let lastSolidMenuAccent = $state(designSystem.menuAccent);

	$effect(() => {
		if (surfaceChoice === "solid") {
			lastSolidMenuAccent = designSystem.menuAccent;
		}
	});

	function setColor(color: ColorChoice) {
		const nextMenuColor = getMenuColorValue(color, surfaceChoice === "translucent");
		designSystem.menuColor = nextMenuColor;
		if (isTranslucentMenuColor(nextMenuColor)) {
			designSystem.menuAccent = "subtle";
		}
	}

	function setSurface(choice: SurfaceChoice) {
		const isTranslucent = choice === "translucent";
		const nextMenuColor = getMenuColorValue(colorChoice, isTranslucent);
		designSystem.menuColor = nextMenuColor;
		designSystem.menuAccent = isTranslucent ? "subtle" : lastSolidMenuAccent;
	}
</script>

<div class="group/picker relative">
	<Picker.Root {submenu}>
		<Picker.Trigger {submenu}>
			<div
				class="flex min-w-0 flex-1 flex-col justify-start overflow-hidden pe-8 text-start md:pe-7"
			>
				<div class="text-muted-foreground text-xs">Menu</div>
				<div
					class="text-foreground overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap"
				>
					{currentMenu.label}
				</div>
			</div>
			<div
				class="text-foreground pointer-events-none absolute end-4 top-1/2 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none md:end-2.5"
			>
				<MenuIcon class="size-4" strokeWidth={2} />
			</div>
		</Picker.Trigger>
		<Picker.Content
			side={isMobile.current ? "top" : submenu ? "left" : "right"}
			align={isMobile.current ? "center" : "start"}
			sideOffset={submenu ? 5 : 20}
			{submenu}
		>
			<Picker.Group>
				<Picker.Label>Color</Picker.Label>
				<Picker.RadioGroup
					value={colorChoice}
					onValueChange={(value) => setColor(value as ColorChoice)}
				>
					<Picker.RadioItem value="default" closeOnSelect={isMobile.current}>
						Default
					</Picker.RadioItem>
					<Picker.RadioItem
						value="inverted"
						closeOnSelect={isMobile.current}
						disabled={isDark}
					>
						Inverted
					</Picker.RadioItem>
				</Picker.RadioGroup>
			</Picker.Group>
			<Picker.Separator />
			<Picker.Group>
				<Picker.Label>Appearance</Picker.Label>
				<Picker.RadioGroup
					value={surfaceChoice}
					onValueChange={(value) => setSurface(value as SurfaceChoice)}
				>
					<Picker.RadioItem value="solid" closeOnSelect={isMobile.current}>
						Solid
					</Picker.RadioItem>
					<Picker.RadioItem value="translucent" closeOnSelect={isMobile.current}>
						Translucent
					</Picker.RadioItem>
				</Picker.RadioGroup>
			</Picker.Group>
		</Picker.Content>
	</Picker.Root>
	<LockButton prop="menuColor" class="absolute end-8 top-1/2 -translate-y-1/2" />
</div>
