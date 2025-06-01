<script lang="ts">
	import { ColorFormatContext } from "$lib/color-format.js";
	import { getColorFormat, type Color } from "$lib/colors.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		color,
		class: className,
		...restProps
	}: Omit<ComponentProps<typeof Select.Trigger>, "color"> & {
		color: Color;
	} = $props();

	const formatConfig = ColorFormatContext.get();

	const formats = $derived(getColorFormat(color));
</script>

<Select.Root type="single" bind:value={formatConfig.current}>
	<Select.Trigger
		size="sm"
		class={cn("bg-secondary text-secondary-foreground border-secondary shadow-none", className)}
		{...restProps}
	>
		<span class="font-medium">Format: </span>
		<span class="text-muted-foreground font-mono">{formatConfig.current}</span>
	</Select.Trigger>
	<Select.Content align="end" class="rounded-xl">
		{#each Object.entries(formats) as [format, value] (format)}
			<Select.Item
				value={format}
				class="gap-2 rounded-lg [&>span]:flex [&>span]:items-center [&>span]:gap-2"
			>
				<span class="font-medium">{format}</span>
				<span class="text-muted-foreground font-mono text-xs">
					{value}
				</span>
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
