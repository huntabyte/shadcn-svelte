<script lang="ts">
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let { class: className, ...restProps }: ComponentProps<typeof Tabs.Trigger> = $props();
</script>

<Tabs.Trigger
	class={cn(
		"text-muted-foreground hover:text-primary data-active:border-primary data-active:text-foreground dark:data-active:border-primary rounded-none border-0 border-b-2 border-transparent bg-transparent px-0 pb-3 text-base data-active:bg-transparent data-active:shadow-none! dark:data-active:bg-transparent",

		className
	)}
	{...restProps}
/>
