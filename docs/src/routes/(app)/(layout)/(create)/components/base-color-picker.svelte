<script lang="ts">
	import * as Picker from "./picker/index.js";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import LockButton from "./lock-button.svelte";
	import { BASE_THEMES, type BaseColorName } from "$lib/registry/config.js";
	import { mode, setMode } from "mode-watcher";

	const designSystem = useDesignSystem();

	const isMobile = new IsMobile();

	const currentBaseColor = $derived(
		BASE_THEMES.find((base) => base.name === designSystem.baseColor) ?? BASE_THEMES[0]
	);
</script>

<div class="group/picker relative">
	<Picker.Root>
		<Picker.Trigger>
			<div class="flex flex-col justify-start text-left">
				<div class="text-muted-foreground text-xs">Base Color</div>
				<div class="text-foreground text-sm font-medium">
					{currentBaseColor?.title}
				</div>
			</div>
			<div
				style="--color: 
						{currentBaseColor?.cssVars?.[mode.current as 'light' | 'dark']?.['muted-foreground']}"
				class="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 rounded-full bg-(--color) select-none"
			></div>
		</Picker.Trigger>
		<Picker.Content
			side={isMobile.current ? "top" : "right"}
			align={isMobile.current ? "center" : "start"}
		>
			<Picker.RadioGroup
				bind:value={designSystem.baseColor}
				onValueChange={(value) => {
					if (value === "dark") {
						setMode(mode.current === "dark" ? "light" : "dark");
						return;
					}
					designSystem.baseColor = value as BaseColorName;
				}}
			>
				<Picker.Group>
					{#each BASE_THEMES as baseColor (baseColor.name)}
						<Picker.RadioItem value={baseColor.name} closeOnSelect={false}>
							<div class="flex items-center gap-2">
								{#if mode.current}
									<div
										style="--color: {baseColor.cssVars?.[
											mode.current as 'light' | 'dark'
										]?.['muted-foreground']};"
										class="size-4 rounded-full bg-(--color)"
									></div>
								{/if}
								{baseColor.title}
							</div>
						</Picker.RadioItem>
					{/each}
				</Picker.Group>
				<Picker.Separator />
				<Picker.Group>
					<Picker.Item
						closeOnSelect={false}
						onclick={() => {
							setMode(mode.current === "dark" ? "light" : "dark");
						}}
					>
						<div class="flex flex-col justify-start pointer-coarse:gap-1">
							<div>
								Switch to {mode.current === "dark" ? "Light" : "Dark"} Mode
							</div>
							<div class="text-muted-foreground text-xs pointer-coarse:text-sm">
								Base colors are easier to see in dark mode.
							</div>
						</div>
					</Picker.Item>
				</Picker.Group>
			</Picker.RadioGroup>
		</Picker.Content>
	</Picker.Root>
	<LockButton prop="baseColor" class="absolute top-1/2 right-10 -translate-y-1/2" />
</div>
