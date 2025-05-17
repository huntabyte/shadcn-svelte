<script lang="ts">
	import { THEMES } from "$lib/themes.js";
	import { setTheme, theme } from "mode-watcher";
	import * as Select from "$lib/registry/ui/select/index.js";

	const label = $derived(THEMES.find((t) => t.value === theme.current)?.name ?? "Select a theme");
</script>

<Select.Root type="single" bind:value={() => theme.current, (v) => setTheme(v ?? "default")}>
	<Select.Trigger size="sm" class="w-32">
		{label}
	</Select.Trigger>
	<Select.Content align="end">
		{#each THEMES as theme (theme.value)}
			<Select.Item value={theme.value} label={theme.name}>{theme.name}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
