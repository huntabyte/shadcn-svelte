<script lang="ts">
	import { setTheme } from "mode-watcher";
	import * as Select from "$lib/registry/ui/select/index.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";
	import Label from "$lib/registry/ui/label/label.svelte";
	import { UserConfigContext } from "$lib/user-config.svelte.js";

	let { class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();

	const DEFAULT_THEMES = [
		{
			name: "Default",
			value: "default",
		},
		{
			name: "Scaled",
			value: "scaled",
		},
		{
			name: "Mono",
			value: "mono",
		},
	];

	const COLOR_THEMES = [
		{
			name: "Blue",
			value: "blue",
		},
		{
			name: "Green",
			value: "green",
		},
		{
			name: "Amber",
			value: "amber",
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
			name: "Teal",
			value: "teal",
		},
	];

	const userConfig = UserConfigContext.get();

	const label = $derived(
		[...DEFAULT_THEMES, ...COLOR_THEMES].find((t) => t.value === userConfig.current.activeTheme)
			?.name ?? "Default"
	);
</script>

<div class={cn("flex items-center gap-2", className)} {...restProps}>
	<Label for="theme-selector" class="sr-only">Theme</Label>

	<Select.Root
		type="single"
		bind:value={
			() => userConfig.current.activeTheme,
			(v) => {
				userConfig.setConfig({ activeTheme: v ?? "default" });
				setTheme(v ?? "default");
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
				<Select.GroupHeading class="sr-only">Default</Select.GroupHeading>
				{#each DEFAULT_THEMES as theme (theme.value)}
					<Select.Item
						value={theme.value}
						label={theme.name}
						class="data-[selected]:opacity-50">{theme.name}</Select.Item
					>
				{/each}
			</Select.Group>
			<Select.Separator />
			<Select.Group>
				<Select.GroupHeading>Colors</Select.GroupHeading>
				{#each COLOR_THEMES as theme (theme.value)}
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
