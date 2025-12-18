<script lang="ts">
	import * as Picker from "./picker/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import { PRESETS, STYLES } from "$lib/registry/config.js";

	const designSystem = useDesignSystem();

	const currentPreset = $derived(
		PRESETS.find(
			(preset) =>
				preset.baseColor === designSystem.baseColor &&
				preset.style === designSystem.style &&
				preset.theme === designSystem.theme &&
				preset.iconLibrary === designSystem.iconLibrary &&
				preset.font === designSystem.font &&
				preset.menuAccent === designSystem.menuAccent &&
				preset.menuColor === designSystem.menuColor &&
				preset.radius === designSystem.radius
		)
	);

	const selectedPresetTitle = $derived(currentPreset?.title ?? "");

	function handlePresetChange(value: string) {
		const preset = PRESETS.find((p) => p.title === value);
		if (!preset) {
			return;
		}

		// Update all params including baseColor.
		designSystem.baseColor = preset.baseColor;
		designSystem.style = preset.style;
		designSystem.theme = preset.theme;
		designSystem.iconLibrary = preset.iconLibrary;
		designSystem.font = preset.font;
		designSystem.menuAccent = preset.menuAccent;
		designSystem.menuColor = preset.menuColor;
		designSystem.radius = preset.radius;
	}

	const isMobile = new IsMobile();
</script>

<Picker.Root>
	<Picker.Trigger>
		<div class="flex flex-col justify-start text-left">
			<div class="text-muted-foreground text-xs">Preset</div>
			<div class="text-foreground line-clamp-1 text-sm font-medium">
				{currentPreset?.description ?? "Custom"}
			</div>
		</div>
	</Picker.Trigger>
	<Picker.Content
		side={isMobile.current ? "top" : "right"}
		align={isMobile.current ? "center" : "start"}
		class="md:w-72"
	>
		<Picker.RadioGroup value={selectedPresetTitle} onValueChange={handlePresetChange}>
			<Picker.Group>
				{#each PRESETS as preset (preset.title)}
					{@const style = STYLES.find((s) => s.name === preset.style)}
					<Picker.RadioItem value={preset.title}>
						<div class="flex items-center gap-2">
							{#if style?.icon}
								<div class="flex size-4 shrink-0 items-center justify-center">
									<style.icon class="size-4" />
								</div>
							{/if}
							{preset.description}
						</div>
					</Picker.RadioItem>
				{/each}
			</Picker.Group>
		</Picker.RadioGroup>
	</Picker.Content>
</Picker.Root>
