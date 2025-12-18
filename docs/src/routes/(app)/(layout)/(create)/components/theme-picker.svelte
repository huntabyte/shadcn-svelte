<script lang="ts">
	import * as Picker from "./picker/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";
	import { mode } from "mode-watcher";
	import { BASE_COLORS, THEMES } from "$lib/registry/config.js";

	const designSystem = useDesignSystem();

	const isMobile = new IsMobile();

	const currentTheme = $derived(
		THEMES.find((theme) => theme.name === designSystem.theme) ?? THEMES[0]
	);

	const currentThemeIsBaseColor = $derived(
		BASE_COLORS.find((baseColor) => baseColor.name === designSystem.theme)
	);
</script>

<div class="group/picker relative">
	<Picker.Root>
		<Picker.Trigger>
			<div class="flex flex-col justify-start text-left">
				<div class="text-muted-foreground text-xs">Theme</div>
				<div class="text-foreground text-sm font-medium">
					{currentTheme?.title}
				</div>
			</div>
			<div
				style="--color: {currentTheme?.cssVars?.[mode.current ?? 'light']?.[
					currentThemeIsBaseColor ? 'muted-foreground' : 'primary'
				]};"
				class="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rounded-full bg-(--color) select-none"
			></div>
		</Picker.Trigger>
		<Picker.Content
			side={isMobile.current ? "top" : "right"}
			align={isMobile.current ? "center" : "start"}
			class="max-h-96"
		>
			<Picker.RadioGroup bind:value={designSystem.theme}>
				<Picker.Group>
					{#each THEMES.filter( (theme) => BASE_COLORS.find((baseColor) => baseColor.name === theme.name) ) as theme (theme.name)}
						{@const isBaseColor = BASE_COLORS.find(
							(baseColor) => baseColor.name === theme.name
						)}
						{#if theme.name === designSystem.baseColor}
							<Picker.RadioItem value={theme.name}>
								<div class="flex items-start gap-2">
									{#if mode.current}
										<div
											style="--color: {theme.cssVars?.[
												mode.current as 'light' | 'dark'
											]?.[isBaseColor ? 'muted-foreground' : 'primary']};"
											class="size-4 translate-y-1 rounded-full bg-(--color)"
										></div>
									{/if}
									<div class="flex flex-col justify-start pointer-coarse:gap-1">
										<div>{theme.title}</div>
										<div
											class="text-muted-foreground text-xs pointer-coarse:text-sm"
										>
											Match base color
										</div>
									</div>
								</div>
							</Picker.RadioItem>
						{/if}
					{/each}
				</Picker.Group>
				<Picker.Separator />
				<Picker.Group>
					{#each THEMES.filter((theme) => !BASE_COLORS.find((baseColor) => baseColor.name === theme.name)) as theme (theme.name)}
						<Picker.RadioItem value={theme.name}>
							<div class="flex items-center gap-2">
								{#if mode.current}
									<div
										style="--color: {theme.cssVars?.[
											mode.current as 'light' | 'dark'
										]?.['primary']};"
										class="size-4 rounded-full bg-(--color)"
									></div>
								{/if}
								{theme.title}
							</div>
						</Picker.RadioItem>
					{/each}
				</Picker.Group>
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	<LockButton prop="theme" class="absolute top-1/2 right-10 -translate-y-1/2" />
</div>
