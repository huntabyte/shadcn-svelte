<script lang="ts">
	import { RangeCalendar as RangeCalendarPrimitive } from "bits-ui";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className = '',
		children,
		...restProps
	}: RangeCalendarPrimitive.NextButtonProps = $props();
</script>

{#snippet Fallback()}
	<ChevronRightIcon class="size-4" />
{/snippet}

<RangeCalendarPrimitive.NextButton
	bind:ref
	class={cn(
		buttonVariants({ variant: "outline" }),
		"size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
		className
	)}
	children={children || Fallback}
	{...restProps}
/>
