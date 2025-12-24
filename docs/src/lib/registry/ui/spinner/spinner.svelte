<script lang="ts">
	import { cn } from "$lib/utils.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { SVGAttributes } from "svelte/elements";

	let {
		class: className,
		role = "status",
		"aria-label": ariaLabel = "Loading",
		...restProps
	}: SVGAttributes<SVGSVGElement> = $props();
</script>

<IconPlaceholder
	lucide="Loader2Icon"
	tabler="IconLoader"
	hugeicons="Loading03Icon"
	phosphor="SpinnerIcon"
	{role}
	aria-label={ariaLabel}
	class={cn("size-4 animate-spin", className)}
	{...restProps}
/>
