<script lang="ts">
	import type { WithoutChildren } from "bits-ui";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";
	import { config } from "$lib/stores/index.js";
	import { styles } from "$lib/registry/styles.js";
	import { type PrimitiveButtonAttributes, cn } from "$lib/utils.js";

	let {
		class: className,
		...restProps
	}: WithoutChildren<Omit<PrimitiveButtonAttributes, "disabled" | "style" | "id">> = $props();

	const styleLabel = $derived(styles.filter((s) => s.name === $config.style)[0].label);

	let value = $state($config.style);

	$effect(() => {
		config.update((prev) => ({ ...prev, style: value }));
	});
</script>

<Select.Root bind:value>
	<Select.Trigger class={cn("h-7 w-[145px] text-xs [&_svg]:size-4", className)} {...restProps}>
		<span class="text-muted-foreground">Style: </span>
		{styleLabel}
	</Select.Trigger>
	<Select.Content>
		{#each styles as style}
			<Select.Item value={style.name} textValue={style.label} class="text-xs">
				{style.label}
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
