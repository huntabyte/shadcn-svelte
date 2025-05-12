<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Tabs as TabsPrimitive } from "bits-ui";
	import type { ComponentProps } from "svelte";

	let { class: className, ...restProps }: ComponentProps<typeof TabsPrimitive.Content> = $props();
</script>

<TabsPrimitive.Content
	class={cn(
		"ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
		className
	)}
	{...restProps}
/>
