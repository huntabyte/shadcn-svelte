<script lang="ts">
	import { ChevronDown } from "lucide-svelte";
	import { cn } from "$lib/utils";
	import { melt, type AccordionHeadingProps, accordion } from ".";
	let className: string | undefined | null = undefined;
	export { className as class };

	export let level: AccordionHeadingProps["level"] = 3;

	const { heading, trigger, props } = accordion.getTriggerAndHeading(level);
</script>

<div {...$heading(props.heading)} use:heading class="flex">
	<button
		use:melt={$trigger(props.trigger)}
		class={cn(
			"flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180",
			className
		)}
		{...$$restProps}
	>
		<slot />
		<ChevronDown class="h-4 w-4 transition-transform duration-200" />
	</button>
</div>
