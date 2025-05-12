<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Tabs as TabsPrimitive } from "bits-ui";
	import type { ComponentProps } from "svelte";

	let { class: className, ...restProps }: ComponentProps<typeof TabsPrimitive.List> = $props();
</script>

<TabsPrimitive.List
	class={cn(
		"bg-muted text-muted-foreground inline-flex h-9 items-center justify-center rounded-lg p-1",
		className
	)}
	{...restProps}
/>
