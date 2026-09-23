<script lang="ts">
	import { Accordion as AccordionPrimitive } from "bits-ui";
	import { cn, type WithoutChild } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<AccordionPrimitive.ContentProps> = $props();
</script>

<!-- parity-ignore-upstream: h-(--radix-accordion-content-height) | Radix leaves the height var unset until measured; Bits initializes it to 0px, so pinning the inner height to it would collapse the content before the first measurement -->
<AccordionPrimitive.Content
	bind:ref
	data-slot="accordion-content"
	class="cn-accordion-content overflow-hidden"
	{...restProps}
>
	<div
		class={cn(
			"cn-accordion-content-inner [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
			className
		)}
	>
		{@render children?.()}
	</div>
</AccordionPrimitive.Content>
