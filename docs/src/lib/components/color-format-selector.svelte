<script lang="ts">
	import { getColorFormat, type Color } from "$lib/colors.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { UserConfigContext } from "$lib/user-config.svelte.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		color,
		class: className,
		...restProps
	}: Omit<ComponentProps<typeof Select.Trigger>, "color"> & {
		color: Color;
	} = $props();

	const userConfig = UserConfigContext.get();

	const formats = $derived(getColorFormat(color));
</script>

<Select.Root
	type="single"
	bind:value={
		() => userConfig.current.colorFormat,
		(v) => {
			userConfig.setConfig({ colorFormat: v });
		}
	}
>
	<Select.Trigger
		size="sm"
		class={cn("border-secondary bg-secondary text-secondary-foreground shadow-none", className)}
		{...restProps}
	>
		<span class="font-medium">Format: </span>
		<span class="font-mono text-muted-foreground">{userConfig.current.colorFormat}</span>
	</Select.Trigger>
	<Select.Content align="end" class="rounded-xl">
		{#each Object.entries(formats) as [format, value] (format)}
			<Select.Item
				value={format}
				class="gap-2 rounded-lg [&>span]:flex [&>span]:items-center [&>span]:gap-2"
			>
				<span class="font-medium">{format}</span>
				<span class="font-mono text-xs text-muted-foreground">
					{value}
				</span>
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
