<script lang="ts">
	import * as AccordionPrimitive from "$primitives/accordion";
	import { ChevronDown } from "lucide-svelte";
	import { cn } from "$lib/utils";

	let className: string | undefined | null = undefined;
	export { className as class };
	export let level: AccordionPrimitive.AccordionHeaderProps["level"] = 3;
</script>

<AccordionPrimitive.Header {level} class="flex">
	<AccordionPrimitive.Trigger
		class={cn(
			"flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
			className
		)}
		{...$$restProps}
		on:m-click
		on:m-keydown
	>
		<slot />
		<ChevronDown class="h-4 w-4 transition-transform duration-200" />
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
