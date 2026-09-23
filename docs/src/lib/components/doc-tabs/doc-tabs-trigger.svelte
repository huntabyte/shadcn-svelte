<script lang="ts">
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let { class: className, ...restProps }: ComponentProps<typeof Tabs.Trigger> = $props();
</script>

<Tabs.Trigger
	class={cn(
		"rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-base text-muted-foreground hover:text-primary data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none dark:data-[state=active]:border-primary dark:data-[state=active]:bg-transparent",

		className
	)}
	{...restProps}
/>
