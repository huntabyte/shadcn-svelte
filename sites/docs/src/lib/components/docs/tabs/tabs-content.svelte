<script lang="ts">
	import * as Tabs from "$lib/registry/new-york/ui/tabs/index.js";
	import type { ComponentProps } from "svelte";

	let { children, ...restProps }: ComponentProps<typeof Tabs.Content> = $props();
</script>

<Tabs.Content
	{...restProps}
	class="relative [&_h3.font-heading]:text-base [&_h3.font-heading]:font-semibold"
>
	{@render children?.()}
</Tabs.Content>
