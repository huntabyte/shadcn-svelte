<script lang="ts">
	import { setTheme } from "mode-watcher";
	import * as Select from "$lib/registry/ui/select/index.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";
	import Label from "$lib/registry/ui/label/label.svelte";
	import { UserConfigContext } from "$lib/user-config.svelte.js";

	let { class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();

	const THEMES = [
		{
			name: "Blue",
			value: "blue",
		},
		{
			name: "Green",
			value: "green",
		},
		{
			name: "Neutral",
			value: "neutral",
		},

		{
			name: "Rose",
			value: "rose",
		},
		{
			name: "Purple",
			value: "purple",
		},
		{
			name: "Orange",
			value: "orange",
		},
		{
			name: "Violet",
			value: "violet",
		},
		{
			name: "Yellow",
			value: "yellow",
		},
	].sort((a, b) => a.name.localeCompare(b.name));

	const userConfig = UserConfigContext.get();

	const label = $derived(
		[...THEMES].find((t) => t.value === userConfig.current.activeTheme)?.name ?? "Neutral"
	);
</script>

<div class={cn("flex items-center gap-2", className)} {...restProps}>
	<Label for="theme-selector" class="sr-only">Theme</Label>

	<Select.Root
		type="single"
		bind:value={
			() => userConfig.current.activeTheme,
			(v) => {
				userConfig.setConfig({ activeTheme: v ?? "neutral" });
				setTheme(v ?? "neutral");
			}
		}
	>
		<Select.Trigger
			size="sm"
			class="bg-secondary text-secondary-foreground border-secondary justify-start shadow-none"
			id="theme-selector"
		>
			<span class="font-medium"> Theme: </span>
			<span class="w-12">
				{label}
			</span>
		</Select.Trigger>
		<Select.Content align="end">
			<Select.Group>
				{#each THEMES as theme (theme.value)}
					<Select.Item
						value={theme.value}
						label={theme.name}
						class="data-[selected]:opacity-50">{theme.name}</Select.Item
					>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</div>
