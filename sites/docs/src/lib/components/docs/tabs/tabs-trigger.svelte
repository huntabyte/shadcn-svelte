<script lang="ts">
	import * as Tabs from "$lib/registry/new-york/ui/tabs/index.js";
	import type { ComponentProps } from "svelte";

	let { children, ...restProps }: ComponentProps<typeof Tabs.Trigger> = $props();
</script>

<Tabs.Trigger
	{...restProps}
	class="text-muted-foreground data-[state=active]:border-b-primary data-[state=active]:text-foreground relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold shadow-none transition-none focus:ring-transparent focus:ring-offset-transparent data-[state=active]:shadow-none"
>
	{@render children?.()}
</Tabs.Trigger>
