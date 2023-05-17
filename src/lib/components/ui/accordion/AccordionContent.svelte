<script lang="ts">
	import { Accordion as AccordionPrimitive } from "radix-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AccordionPrimitive.Content
	class={cn(
		"overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
		className
	)}
	{...$$restProps}
>
	<div class="pb-4 pt-0">
		<slot />
	</div>
</AccordionPrimitive.Content>
