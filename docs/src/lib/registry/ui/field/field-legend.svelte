<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		variant = "legend",
		children,
		...restProps
	}: HTMLAttributes<HTMLLegendElement> & {
		variant?: "legend" | "label";
	} = $props();
</script>

<legend
	data-slot="field-legend"
	data-variant={variant}
	class={cn(
		"mb-3 font-medium",
		"data-[variant=legend]:text-base",
		"data-[variant=label]:text-sm",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</legend>
