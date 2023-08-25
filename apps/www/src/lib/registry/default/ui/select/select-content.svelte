<script lang="ts">
	import { Select as SelectPrimitive } from "@huntabyte/bits-ui";
	import { cn, transition } from "$lib/utils";
	import { scale } from "svelte/transition";

	type $$Props = SelectPrimitive.ContentProps;
	type $$Events = SelectPrimitive.ContentEvents;

	let className: $$Props["class"] = undefined;
	export { className as class };
</script>

<SelectPrimitive.Content
	inTransition={transition}
	outTransition={scale}
	outTransitionConfig={{ start: 0.95, opacity: 0, duration: 50 }}
	class={cn(
		"relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md outline-none",
		className
	)}
	{...$$restProps}
	on:keydown
>
	<div class="w-full p-1">
		<slot />
	</div>
</SelectPrimitive.Content>
