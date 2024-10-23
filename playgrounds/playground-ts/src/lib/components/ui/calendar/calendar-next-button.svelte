<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import { buttonVariants } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CalendarPrimitive.PrevButtonProps = $props();
</script>

{#snippet Fallback()}
	<ChevronRight class="size-4" />
{/snippet}

<CalendarPrimitive.NextButton
	bind:ref
	class={cn(
		buttonVariants({ variant: "outline" }),
		"size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
		className
	)}
	children={children || Fallback}
	{...restProps}
/>
