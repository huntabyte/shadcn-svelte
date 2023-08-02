<script lang="ts">
	import { ChevronDown } from "lucide-svelte";
	import { cn } from "$lib/utils";
	import { type AccordionHeadingProps, ctx } from ".";
	let className: string | undefined | null = undefined;
	export { className as class };

	export let level: AccordionHeadingProps["level"] = 3;

	const { heading, trigger, props } = ctx.getTriggerAndHeading(level);
</script>

<div use:heading {...$heading(props.heading)} class="flex">
	<button
		use:trigger
		{...$trigger(props.trigger)}
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
