<script lang="ts">
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import { cn } from "$lib/utils.js";
	import type { Component, ComponentProps } from "svelte";

	let {
		children,
		class: className,
		icon: Icon,
		title,
		variant = "default",
		...restProps
	}: Omit<ComponentProps<typeof Alert.Root>, "variant"> & {
		icon?: Component;
		variant?: "default" | "info" | "warning";
	} = $props();
</script>

<Alert.Root
	class={cn("w-auto border bg-background text-foreground md:-mx-1", className)}
	{...restProps}
>
	{#if Icon}
		<Icon />
	{/if}
	{#if title}
		<Alert.Title>{title}</Alert.Title>
	{/if}
	<Alert.Description class="text-card-foreground/80">
		{@render children?.()}
	</Alert.Description>
</Alert.Root>
