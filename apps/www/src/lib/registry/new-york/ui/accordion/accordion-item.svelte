<script lang="ts">
	import { Accordion as AccordionPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";

	type $$Props = AccordionPrimitive.ItemProps;
	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: $$Props["value"];
</script>

<AccordionPrimitive.Item
	{value}
	class={cn("border-b", className)}
	{...$$restProps}
>
	<slot />
</AccordionPrimitive.Item>
