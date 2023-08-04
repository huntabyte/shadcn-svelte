<script lang="ts">
	import * as AccordionPrimitive from "$primitives/accordion";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
</script>

<AccordionPrimitive.Content class={cn("border-b", className)} {...$$restProps}>
	<slot />
</AccordionPrimitive.Content>
