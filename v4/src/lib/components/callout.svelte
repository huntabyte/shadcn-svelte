<script lang="ts">
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import { cn } from "$lib/utils.js";
	import type { Component, ComponentProps } from "svelte";

	let {
		children,
		class: className,
		icon: Icon,
		title,
		...restProps
	}: ComponentProps<typeof Alert.Root> & {
		icon?: Component;
	} = $props();
</script>

<Alert.Root
	class={cn("bg-surface text-surface-foreground mt-6 w-auto border-none md:-mx-4", className)}
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
