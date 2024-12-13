<script lang="ts">
	import * as Tabs from "$lib/registry/new-york/ui/tabs/index.js";
	import type { ComponentProps } from "svelte";

	let { children, ...restProps }: ComponentProps<typeof Tabs.List> = $props();
</script>

<Tabs.List {...restProps} class="w-full justify-start rounded-none border-b bg-transparent p-0">
	{@render children?.()}
</Tabs.List>
