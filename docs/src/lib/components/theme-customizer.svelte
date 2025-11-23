<script lang="ts">
	import { baseColors } from "$lib/registry/registry-base-colors.js";
	import { setTheme } from "mode-watcher";
	import { ScrollArea } from "$lib/registry/ui/scroll-area/index.js";
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import type { HTMLAttributes } from "svelte/elements";
	import ThemeCustomizerCopyCodeButton from "./theme-customizer-copy-code-button.svelte";
	import { UserConfigContext, type ActiveTheme } from "$lib/user-config.svelte.js";

	let { class: className }: HTMLAttributes<HTMLElement> = $props();

	const userConfig = UserConfigContext.get();

	const THEMES = baseColors
		.filter((theme) => !["slate", "stone", "gray", "zinc"].includes(theme.name))
		.sort((a, b) => a.name.localeCompare(b.name));

	const coercedActiveTheme = $derived(
		userConfig.current.activeTheme === "default" ? "neutral" : userConfig.current.activeTheme
	);
</script>

<div class={cn("flex w-full items-center gap-2", className)}>
	<ScrollArea
		class="hidden max-w-[96%] md:max-w-[600px] lg:flex lg:max-w-none"
		orientation="both"
		scrollbarXClasses="invisible"
	>
		<div class="flex items-center">
			{#each THEMES as theme (theme.name)}
				<Button
					variant="link"
					size="sm"
					data-active={coercedActiveTheme === theme.name}
					class="text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 cursor-pointer items-center justify-center px-4 text-center text-base font-medium capitalize transition-colors hover:no-underline"
					onclick={() => {
						userConfig.setConfig({ activeTheme: theme.name as ActiveTheme });
						setTheme(theme.name);
					}}
				>
					{theme.name === "neutral" ? "Default" : theme.name}
				</Button>
			{/each}
		</div>
	</ScrollArea>
	<div class="flex items-center gap-2 lg:hidden">
		<Label for="theme-selector" class="sr-only">Theme</Label>
		<Select.Root
			type="single"
			allowDeselect={false}
			bind:value={
				() => userConfig.current.activeTheme,
				(v) => {
					userConfig.setConfig({ activeTheme: v ?? "default" });
					setTheme(v ?? "default");
				}
			}
		>
			<Select.Trigger
				id="theme-selector"
				size="sm"
				class="justify-start capitalize shadow-none *:data-[slot=select-value]:w-12 *:data-[slot=select-value]:capitalize"
			>
				<span class="font-medium">Theme:</span>
				<span data-slot="select-value">{coercedActiveTheme ?? "Select a theme"}</span>
			</Select.Trigger>
			<Select.Content align="end">
				<Select.Group>
					{#each THEMES as theme (theme.name)}
						<Select.Item
							value={theme.name}
							class="capitalize data-[selected]:opacity-50"
						>
							{theme.name}
						</Select.Item>
					{/each}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	</div>
	<ThemeCustomizerCopyCodeButton variant="secondary" size="sm" class="ms-auto" />
</div>
