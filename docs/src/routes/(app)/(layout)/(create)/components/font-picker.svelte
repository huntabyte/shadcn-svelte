<script lang="ts">
	import * as Picker from "./picker/index.js";
	import { FONTS } from "$lib/fonts.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";

	type FontPickerOption = {
		name: string;
		value: string;
		type: string;
		font: {
			style: {
				fontFamily: string;
			};
		} | null;
	};

	type Props = {
		submenu?: boolean;
		label: string;
		param: "font" | "fontHeading";
		fonts: readonly FontPickerOption[];
	};

	let { submenu = false, fonts, label, param }: Props = $props();

	const designSystem = useDesignSystem();

	const isMobile = new IsMobile();

	const currentValue = $derived(param === "font" ? designSystem.font : designSystem.fontHeading);
	const currentFont = $derived(fonts.find((font) => font.value === currentValue));
	const currentBodyFont = $derived(FONTS.find((font) => font.value === designSystem.font));
	const inheritsBodyFont = $derived(param === "fontHeading" && currentValue === "inherit");
	const displayFontName = $derived(inheritsBodyFont ? currentBodyFont?.name : currentFont?.name);
	const inheritFontLabel = $derived(currentBodyFont ? currentBodyFont.name : "Body font");

	const groupedFonts = $derived.by(() => {
		const pickerFonts =
			param === "fontHeading" ? fonts.filter((font) => font.value !== "inherit") : [...fonts];
		const byType: Record<string, FontPickerOption[]> = {};
		const typeOrder: string[] = [];

		for (const font of pickerFonts) {
			if (!byType[font.type]) {
				byType[font.type] = [];
				typeOrder.push(font.type);
			}
			byType[font.type].push(font);
		}

		return typeOrder.map((type) => ({
			type,
			label: `${type.charAt(0).toUpperCase()}${type.slice(1)}`,
			items: byType[type],
		}));
	});

	const previewFontFamily = $derived(
		currentFont?.font?.style?.fontFamily ?? currentBodyFont?.font?.style?.fontFamily
	);
</script>

<div class="group/picker relative">
	<Picker.Root {submenu}>
		<Picker.Trigger {submenu}>
			<div class="flex flex-col justify-start text-left">
				<div class="text-muted-foreground text-xs">{label}</div>
				<div class="text-foreground text-sm font-medium">
					{displayFontName}
				</div>
			</div>
			<div
				class="text-foreground pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base select-none md:right-2.5"
				style="font-family: {previewFontFamily}"
			>
				Aa
			</div>
		</Picker.Trigger>
		<Picker.Content
			side={isMobile.current ? "top" : submenu ? "left" : "right"}
			align={isMobile.current ? "center" : "start"}
			class="max-h-96 overflow-y-auto md:w-72"
			sideOffset={submenu ? 5 : 20}
			{submenu}
		>
			<Picker.RadioGroup bind:value={designSystem[param]}>
				{#if param === "fontHeading"}
					<Picker.Group>
						<Picker.RadioItem value="inherit" closeOnSelect={isMobile.current}>
							{inheritFontLabel}
						</Picker.RadioItem>
					</Picker.Group>
					<Picker.Separator class="opacity-50" />
				{/if}
				{#each groupedFonts as group (group.type)}
					<Picker.Group>
						<Picker.Label>{group.label}</Picker.Label>
						{#each group.items as font (font.value)}
							<Picker.RadioItem value={font.value} closeOnSelect={isMobile.current}>
								{font.name}
							</Picker.RadioItem>
						{/each}
					</Picker.Group>
				{/each}
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	<LockButton prop={param} class="absolute top-1/2 right-8 -translate-y-1/2" />
</div>
