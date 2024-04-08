<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";
	import { config } from "$lib/stores/index.js";
	import { styles } from "$lib/registry/styles.js";
	import { cn } from "$lib/utils.js";

	let styleLabel = styles.filter((s) => s.name === $config.style)[0].label;
	let selected = { value: $config.style, label: styleLabel };
	let className: string | undefined | null = undefined;

	type $$Props = HTMLButtonAttributes;

	export { className as class };

	$: config.update((prev) => ({ ...prev, style: selected.value }));
	$: styleLabel = styles.filter((s) => s.name === $config.style)[0].label;
</script>

<Select.Root bind:selected>
	<Select.Trigger
		class={cn("h-7 w-[145px] text-xs [&_svg]:h-4 [&_svg]:w-4", className)}
		{...$$restProps}
	>
		<span class="text-muted-foreground">Style: </span>
		{styleLabel}
	</Select.Trigger>
	<Select.Content>
		{#each styles as style}
			<Select.Item value={style.name} label={style.label} class="text-xs">
				{style.label}
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
