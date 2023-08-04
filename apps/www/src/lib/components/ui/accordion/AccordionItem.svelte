<script lang="ts">
	import * as AccordionPrimitive from "$primitives/accordion";
	import type { AccordionItemProps } from "$primitives/accordion";
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
