<script lang="ts">
	import ChartToolbar from "./chart-toolbar.svelte";
	import { cn } from "$lib/utils.js";

	export let name: string;
	// TODO: Remove this
	export let status:
		| "Not Started"
		| "In Progress"
		| "Needs Parity"
		| "Blocked (External)"
		| "Blocked (Internal)"
		| "Done" = "Not Started";
	let className: string | undefined | null = undefined;
	export { className as class };

	//   const chart = await getBlock(name)
</script>

<div
	class={cn(
		"themes-wrapper group relative flex flex-col overflow-hidden rounded-xl border shadow transition-all duration-200 ease-in-out hover:z-30",
		className
	)}
>
	<span class="sr-only">{name}</span>
	<ChartToolbar
		{name}
		{status}
		class="bg-card text-card-foreground relative z-20 flex justify-end border-b px-3 py-2.5"
	/>
	<div class="relative z-10 [&>div]:rounded-none [&>div]:border-none [&>div]:shadow-none">
		<slot></slot>
	</div>
</div>
