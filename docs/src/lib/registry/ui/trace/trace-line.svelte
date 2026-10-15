<script lang="ts" module>
	export type TraceLineStatus = "running" | "error" | "pending";
</script>

<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		status,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLSpanElement>> & {
		status?: TraceLineStatus;
	} = $props();
</script>

<span
	bind:this={ref}
	data-slot="trace-line"
	data-status={status}
	class={cn(
		"cn-trace-line flex w-fit max-w-full min-w-0 items-center text-muted-foreground transition-colors in-[a,button]:cursor-pointer in-[a:hover,button:hover]:text-foreground data-[status=error]:text-destructive data-[status=error]:in-[a:hover,button:hover]:text-destructive data-[status=pending]:opacity-60 data-[status=running]:*:data-[slot=trace-title]:shimmer",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</span>
