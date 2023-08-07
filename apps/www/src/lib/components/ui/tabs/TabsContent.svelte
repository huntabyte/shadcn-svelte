<script lang="ts">
	import { Tabs as TabsPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = TabsPrimitive.ContentProps;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: $$Props["value"];
</script>

<TabsPrimitive.Content
	class={cn(
		"mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
		className
	)}
	{value}
	{...$$restProps}
>
	<slot />
</TabsPrimitive.Content>
