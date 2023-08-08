<script lang="ts">
	import { Accordion as AccordionPrimitive } from "@huntabyte/primitives";
	import { cn } from "$lib/utils";
	import { slide } from "svelte/transition";

	type $$Props = AccordionPrimitive.ContentProps;
	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AccordionPrimitive.Content
	class={cn(
		"overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
		className
	)}
	transition={slide}
	transitionConfig={{ duration: 200 }}
	{...$$restProps}
>
	<div class="pb-4 pt-0">
		<slot />
	</div>
</AccordionPrimitive.Content>
