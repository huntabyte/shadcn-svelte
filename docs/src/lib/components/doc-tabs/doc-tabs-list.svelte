<script lang="ts">
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	let { class: className, ...restProps }: ComponentProps<typeof Tabs.List> = $props();
</script>

<Tabs.List
	class={cn("justify-start gap-4 rounded-none bg-transparent px-2 md:px-0", className)}
	data-llm-ignore
	{...restProps}
/>
