<script lang="ts">
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { cn } from "$lib/utils.js";
	import type { Collapsible as CollapsiblePrimitive } from "bits-ui";

	let {
		ref = $bindable(null),
		open = $bindable(false),
		class: className,
		...restProps
	}: CollapsiblePrimitive.RootProps = $props();
</script>

<Collapsible.Root
	bind:ref
	bind:open
	data-slot="trace-collapsible"
	class={cn("cn-trace-collapsible flex w-full min-w-0 flex-col", className)}
	{...restProps}
/>
