<script lang="ts">
	import { Accordion as AccordionPrimitive } from "bits-ui";
	import { cn } from "$lib/utils.js";

	let { class: className, children, ...restProps }: AccordionPrimitive.ContentProps = $props();
</script>

<AccordionPrimitive.Content class={cn("overflow-hidden text-sm", className)} {...restProps}>
	<div class="pb-4 pt-0">
		{@render children?.()}
	</div>
</AccordionPrimitive.Content>
