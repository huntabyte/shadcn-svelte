<script lang="ts">
	import * as Picker from "./picker/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";
	import { mode } from "mode-watcher";
	import {
		BASE_THEMES,
		getThemesForBaseColor,
		type BaseTheme,
		type Theme,
	} from "$lib/registry/config.js";
	import { PRESET_CHART_COLORS } from "shadcn-svelte/preset";

	type ChartColorName = (typeof PRESET_CHART_COLORS)[number];

	type Props = {
		submenu?: boolean;
	};

	let { submenu = false }: Props = $props();

	const designSystem = useDesignSystem();

	const isMobile = new IsMobile();

	const availableChartColors = $derived(getThemesForBaseColor(designSystem.baseColor));

	const currentChartColor = $derived(
		availableChartColors.find((theme) => theme.name === designSystem.chartColor) ??
			availableChartColors[0]
	);

	$effect(() => {
		if (availableChartColors.length === 0) return;
		if (!availableChartColors.some((t) => t.name === designSystem.chartColor)) {
			designSystem.chartColor = availableChartColors[0]!.name as ChartColorName;
		}
	});

	function isBaseColor(theme: Theme): theme is BaseTheme {
		return BASE_THEMES.some((baseColor) => baseColor.name === theme.name);
	}

	function getSwatchColor(theme: Theme) {
		const m = (mode.current ?? "light") as "light" | "dark";
		if (isBaseColor(theme)) {
			return theme.cssVars[m]["muted-foreground"];
		}
		return theme.cssVars[m]["primary"];
	}
</script>

<div class="group/picker relative">
	<Picker.Root {submenu}>
		<Picker.Trigger {submenu}>
			<div class="flex flex-col justify-start text-left">
				<div class="text-muted-foreground text-xs">Chart Color</div>
				<div class="text-foreground text-sm font-medium">
					{currentChartColor?.title}
				</div>
			</div>
			{#if mode.current}
				<div
					style="--color: {currentChartColor
						? getSwatchColor(currentChartColor)
						: 'transparent'};"
					class="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rounded-full bg-(--color) select-none md:right-2.5"
				></div>
			{/if}
		</Picker.Trigger>
		<Picker.Content
			side={isMobile.current ? "top" : submenu ? "left" : "right"}
			align={isMobile.current ? "center" : "start"}
			class="max-h-92 overflow-y-auto"
			sideOffset={submenu ? 5 : 20}
			{submenu}
		>
			<Picker.RadioGroup bind:value={designSystem.chartColor}>
				<Picker.Group>
					{#each availableChartColors.filter( (theme) => BASE_THEMES.some((baseColor) => baseColor.name === theme.name) ) as theme (theme.name)}
						<Picker.RadioItem value={theme.name} closeOnSelect={false}>
							{theme.title}
						</Picker.RadioItem>
					{/each}
				</Picker.Group>
				<Picker.Separator />
				<Picker.Group>
					{#each availableChartColors.filter((theme) => !BASE_THEMES.some((baseColor) => baseColor.name === theme.name)) as theme (theme.name)}
						<Picker.RadioItem value={theme.name} closeOnSelect={false}>
							{theme.title}
						</Picker.RadioItem>
					{/each}
				</Picker.Group>
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	<LockButton prop="chartColor" class="absolute top-1/2 right-10 -translate-y-1/2" />
</div>
