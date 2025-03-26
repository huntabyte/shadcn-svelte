<script lang="ts">
	import ChartToolbar from "./chart-toolbar.svelte";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	let {
		name,
		status = "Not Started",
		class: className,
		description,
		children,
	}: {
		name: string;
		status?:
			| "Not Started"
			| "In Progress"
			| "Needs Parity"
			| "Close Enough"
			| "Needs Sean Review"
			| "Blocked (External)"
			| "Blocked (Internal)"
			| "Done";
		class?: string;
		description?: string;
		children?: Snippet;
	} = $props();
	//   const chart = await getBlock(name)
</script>

<div
	class={cn(
		"themes-wrapper group relative flex w-auto flex-col overflow-hidden rounded-xl border shadow transition-all duration-200 ease-in-out hover:z-30",
		className
	)}
>
	<span class="sr-only">{name}</span>
	<ChartToolbar
		{name}
		{status}
		{description}
		class="bg-card text-card-foreground relative z-20 flex justify-end border-b px-3 py-2.5"
	/>
	<div class="relative z-10 w-auto [&>div]:rounded-none [&>div]:border-none [&>div]:shadow-none">
		{@render children?.()}
	</div>
</div>
