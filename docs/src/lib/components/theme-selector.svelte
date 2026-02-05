<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { cn } from "$lib/utils.js";
	import Label from "$lib/registry/ui/label/label.svelte";
	import { useDesignSystem } from "$lib/features/design-system/index.js";
	import { THEMES } from "$lib/registry/themes.js";

	let { class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();

	const designSystem = useDesignSystem();

	const themesList = $derived(
		THEMES.map((theme) => ({
			name: theme.title,
			value: theme.name,
		})).sort((a, b) => a.name.localeCompare(b.name))
	);

	const label = $derived(
		themesList.find((t) => t.value === designSystem.theme)?.name ?? "Neutral"
	);
</script>

<div class={cn("flex items-center gap-2", className)} {...restProps}>
	<Label for="theme-selector" class="sr-only">Theme</Label>

	<Select.Root type="single" bind:value={designSystem.theme}>
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
				{#each themesList as theme (theme.value)}
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
