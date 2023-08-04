<script lang="ts">
	import * as AccordionPrimitive from "$lib/primitives/accordion";
	import { cn } from "$lib/utils";
	import { slide } from "svelte/transition";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AccordionPrimitive.Content
	class={cn("overflow-hidden text-sm", className)}
	transition={slide}
	transitionConfig={{ duration: 200 }}
	{...$$restProps}
>
	<div class="pb-4 pt-0">
		<slot />
	</div>
</AccordionPrimitive.Content>
