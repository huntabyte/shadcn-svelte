<script lang="ts">
	import { Accordion as AccordionPrimitive } from "@huntabyte/primitives";
	import { ChevronDown } from "lucide-svelte";
	import { cn } from "$lib/utils";

	type $$Props = AccordionPrimitive.TriggerProps & {
		level?: AccordionPrimitive.HeaderProps["level"];
	};
	let className: string | undefined | null = undefined;
	export { className as class };
	export let level: AccordionPrimitive.HeaderProps["level"] = 3;
</script>

<AccordionPrimitive.Header {level} class="flex">
	<AccordionPrimitive.Trigger
		class={cn(
			"flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
			className
		)}
		{...$$restProps}
	>
		<slot />
		<ChevronDown class="h-4 w-4 transition-transform duration-200" />
	</AccordionPrimitive.Trigger>
</AccordionPrimitive.Header>
