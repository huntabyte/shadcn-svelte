<script lang="ts">
	import { Calendar as CalendarPrimitive } from "bits-ui";
	import { buttonVariants, type ButtonVariant } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let {
		ref = $bindable(null),
		class: className,
		children,
		variant = "ghost",
		...restProps
	}: CalendarPrimitive.NextButtonProps & {
		variant?: ButtonVariant;
	} = $props();
</script>

{#snippet Fallback()}
	<IconPlaceholder
		lucide="ChevronRightIcon"
		tabler="IconChevronRight"
		hugeicons="ArrowRightIcon"
		phosphor="CaretRightIcon"
		class="size-4"
	/>
{/snippet}

<CalendarPrimitive.NextButton
	bind:ref
	class={cn(
		buttonVariants({ variant }),
		"cn-calendar-button-next size-(--cell-size) p-0 select-none aria-disabled:opacity-50 rtl:rotate-180",
		className
	)}
	children={children || Fallback}
	{...restProps}
/>
