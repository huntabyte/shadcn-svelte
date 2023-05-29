<script lang="ts">
	import type { AccordionContentProps } from "radix-svelte";
	import { Accordion as AccordionPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let transition: AccordionContentProps["transition"] = true;
</script>

<AccordionPrimitive.Content
	class={cn("overflow-hidden text-sm", className)}
	{...$$restProps}
	{transition}
>
	<div class="pb-4 pt-0">
		<slot />
	</div>
</AccordionPrimitive.Content>
