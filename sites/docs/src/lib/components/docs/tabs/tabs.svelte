<script lang="ts">
	import * as Tabs from "$lib/registry/new-york/ui/tabs/index.js";
	import type { ComponentProps } from "svelte";

	let { children, ...restProps }: ComponentProps<typeof Tabs.Root> = $props();
</script>

<Tabs.Root {...restProps} class="relative mt-6 w-full">
	{@render children?.()}
</Tabs.Root>
