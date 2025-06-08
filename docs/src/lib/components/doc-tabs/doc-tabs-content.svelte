<script lang="ts">
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let { class: className, ...restProps }: ComponentProps<typeof Tabs.Content> = $props();
</script>

<Tabs.Content
	class={cn(
		"*:[figure]:first:mt-0 relative [&>.steps]:mt-6 [&_h3.font-heading]:text-base [&_h3.font-heading]:font-medium",
		className
	)}
	{...restProps}
/>
