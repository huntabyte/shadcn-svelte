<script lang="ts">
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn, type WithoutChild } from "$lib/utils.js";
	import TraceIcon from "./trace-icon.svelte";
	import type { Collapsible as CollapsiblePrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<CollapsiblePrimitive.TriggerProps> = $props();
</script>

<Collapsible.Trigger
	bind:ref
	data-slot="trace-collapsible-trigger"
	class={cn(
		"cn-trace-collapsible-trigger group/trace-collapsible-trigger flex w-fit max-w-full min-w-0 cursor-pointer items-center text-left text-muted-foreground transition-colors outline-none hover:text-foreground has-[[data-status=error]]:text-destructive",
		className
	)}
	{...restProps}
>
	{@render children?.()}
	<TraceIcon class="transition-transform group-aria-expanded/trace-collapsible-trigger:rotate-90">
		<IconPlaceholder
			lucide="ChevronRightIcon"
			tabler="IconChevronRight"
			hugeicons="ArrowRight01Icon"
			phosphor="CaretRightIcon"
			remixicon="RiArrowRightSLine"
		/>
	</TraceIcon>
</Collapsible.Trigger>
