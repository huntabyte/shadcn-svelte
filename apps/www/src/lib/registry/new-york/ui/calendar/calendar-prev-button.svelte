<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import ChevronLeft from "svelte-radix/ChevronLeft.svelte";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		class: className,
		child: childProp,
		children: childrenProp,
		...restProps
	}: CalendarPrimitive.PrevButtonProps = $props();
</script>

{#snippet Fallback()}
	<ChevronLeft class="size-4" />
{/snippet}

{#if childProp}
	<CalendarPrimitive.NextButton
		bind:ref
		class={cn(
			buttonVariants({ variant: "outline" }),
			"size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
			className
		)}
		{...restProps}
		child={childProp}
	/>
{:else}
	<CalendarPrimitive.NextButton
		bind:ref
		class={cn(
			buttonVariants({ variant: "outline" }),
			"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
			className
		)}
		{...restProps}
		children={childrenProp || Fallback}
	/>
{/if}
