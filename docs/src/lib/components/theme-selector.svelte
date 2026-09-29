<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";
	import Label from "$lib/registry/ui/label/label.svelte";
	import { THEMES } from "$lib/registry/themes.js";
	import { UserConfigContext } from "$lib/user-config.svelte.js";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();

	const userConfig = UserConfigContext.get();

	const themesList = THEMES.map((theme) => ({
		name: theme.title,
		value: theme.name,
	})).sort((a, b) => a.name.localeCompare(b.name));

	const value = $derived(
		userConfig.current.activeTheme === "default" ? "neutral" : userConfig.current.activeTheme
	);
	const label = $derived(themesList.find((t) => t.value === value)?.name ?? "Neutral");
</script>

<div class={cn("flex items-center gap-2", className)} {...restProps}>
	<Label for="theme-selector" class="sr-only">Theme</Label>

	<Select.Root
		type="single"
		{value}
		onValueChange={(activeTheme) => {
			if (activeTheme) userConfig.setConfig({ activeTheme });
		}}
	>
		<Select.Trigger
			size="sm"
			class="justify-start border-secondary bg-secondary text-secondary-foreground shadow-none"
			id="theme-selector"
		>
			<span class="font-medium"> Theme: </span>
			<span class="w-12">
				{label}
			</span>
		</Select.Trigger>
		<Select.Content align="end" class="max-h-80">
			<Select.Group>
				{#each themesList as theme (theme.value)}
					<Select.Item value={theme.value} label={theme.name} class="data-[selected]:opacity-50"
						>{theme.name}</Select.Item
					>
				{/each}
			</Select.Group>
		</Select.Content>
	</Select.Root>
</div>
