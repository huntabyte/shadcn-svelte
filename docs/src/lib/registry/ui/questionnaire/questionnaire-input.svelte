<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext } from "./context.js";
	import type { HTMLInputAttributes } from "svelte/elements";
	let {
		label,
		placeholder,
		class: className,
		...rest
	}: { label?: string; placeholder?: string; class?: string } & HTMLInputAttributes = $props();
	let context = useQuestionnaireContext();
</script>

<label class="grid gap-2 text-sm">
	{#if label}<span class="font-medium">{label}</span>{/if}
	<input
		name={context.activeItem}
		{placeholder}
		class={cn(
			"h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
			className
		)}
		{...rest}
	/>
</label>
