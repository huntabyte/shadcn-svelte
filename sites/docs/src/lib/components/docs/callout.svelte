<script lang="ts">
	import type { ComponentProps, Snippet } from "svelte";
	import * as Alert from "$lib/registry/ui/alert/index.js";
	import { cn } from "$lib/utils.js";

	let {
		icon,
		title,
		children,
		class: className,
		...restProps
	}: ComponentProps<(typeof Alert)["Root"]> & {
		icon?: Snippet;
		title?: Snippet;
	} = $props();
</script>

<Alert.Root {...restProps} class={cn("mt-2", className)}>
	{#if icon}
		<span class="mr-4 text-2xl">
			{@render icon?.()}
		</span>
	{/if}
	{#if title}
		<Alert.Title>
			{@render title?.()}
		</Alert.Title>
	{/if}
	<Alert.Description class="text-foreground">
		{@render children?.()}
	</Alert.Description>
</Alert.Root>
