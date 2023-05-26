<script lang="ts">
	import type { AccordionItemProps } from "radix-svelte";
	import { Accordion as AccordionPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: AccordionItemProps["value"];
</script>

<AccordionPrimitive.Item
	{value}
	class={cn("border-b", className)}
	{...$$restProps}
>
	<slot />
</AccordionPrimitive.Item>
