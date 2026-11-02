<script lang="ts">
	import * as Picker from "$lib/components/picker/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { FONTS } from "$lib/fonts.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";
	import { CreatePicker } from "./picker-state.svelte.js";
	import { usePreviewOverride } from "./preview-override-context.svelte.js";

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
	const previewOverride = usePreviewOverride();

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

	const picker = new CreatePicker(() => previewOverride.clearOverride());
</script>

<div class="group/picker relative">
	<Picker.Root bind:open={picker.open} {submenu}>
		<Picker.Trigger
			onpointerdown={picker.capture}
			onkeydown={(event) => {
				if (event.key === "Enter" || event.key === " ") picker.capture();
			}}
			{submenu}
		>
			<div class="flex flex-col justify-start text-left">
				<div class="text-xs text-muted-foreground">{label}</div>
				<div class="text-sm font-medium text-foreground">
					{displayFontName}
				</div>
			</div>
			<div
				class="pointer-events-none absolute top-1/2 right-4 flex size-4 -translate-y-1/2 items-center justify-center text-base text-foreground select-none md:right-2.5"
				style="font-family: {previewFontFamily}"
			>
				Aa
			</div>
		</Picker.Trigger>
		<Picker.Content
			onmouseleave={() => previewOverride.clearOverride()}
			preventScroll={false}
			customAnchor={isMobile.current ? picker.layout?.anchor : undefined}
			side={isMobile.current ? "top" : submenu ? "left" : "right"}
			align={isMobile.current ? "center" : "start"}
			class="max-h-96 overflow-y-auto max-md:w-(--bits-dropdown-menu-anchor-width) md:w-52"
			sideOffset={submenu ? 5 : 20}
			{submenu}
		>
			<Picker.RadioGroup bind:value={designSystem[param]}>
				{#if param === "fontHeading"}
					<Picker.Group>
						<Picker.RadioItem
							onItemPreview={isMobile.current
								? undefined
								: (value) =>
										previewOverride.setOverride({
											[param]: value as typeof designSystem.fontHeading,
										})}
							value="inherit"
							closeOnSelect={isMobile.current}
						>
							{inheritFontLabel}
						</Picker.RadioItem>
					</Picker.Group>
					<Picker.Separator class="opacity-50" />
				{/if}
				{#each groupedFonts as group (group.type)}
					<Picker.Group>
						<Picker.Label>{group.label}</Picker.Label>
						{#each group.items as font (font.value)}
							<Picker.RadioItem
								onItemPreview={isMobile.current
									? undefined
									: (value) =>
											previewOverride.setOverride({
												[param]: value as typeof designSystem.fontHeading,
											})}
								value={font.value}
								closeOnSelect={isMobile.current}
							>
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
