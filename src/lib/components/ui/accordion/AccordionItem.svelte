<script lang="ts">
	import { Accordion as AccordionPrimitive, type AccordionItemProps } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: AccordionItemProps["value"];
</script>

<AccordionPrimitive.Item
	{value}
	class={cn("text-sm [&_p]:leading-relaxed", className)}
	{...$$restProps}
>
	<slot />
</AccordionPrimitive.Item>
