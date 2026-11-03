<script lang="ts">
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { cn, type WithoutChild } from "$lib/utils.js";
	import type { Collapsible as CollapsiblePrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithoutChild<CollapsiblePrimitive.ContentProps> = $props();
</script>

<Collapsible.Content
	bind:ref
	data-slot="trace-collapsible-content"
	class="cn-trace-collapsible-content min-w-0 overflow-hidden [--bits-accordion-content-height:var(--bits-collapsible-content-height)] data-open:animate-accordion-down data-closed:animate-accordion-up"
	{...restProps}
>
	<div
		data-slot="trace-collapsible-content-inner"
		class={cn(
			"cn-trace-collapsible-content-inner min-w-0 wrap-break-word text-muted-foreground",
			className
		)}
	>
		{@render children?.()}
	</div>
</Collapsible.Content>
