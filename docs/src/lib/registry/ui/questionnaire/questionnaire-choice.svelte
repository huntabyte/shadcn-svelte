<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext } from "./context.js";

	let {
		value,
		label,
		description,
		shortcut,
		class: className,
		children,
	}: {
		value: string;
		label?: string;
		description?: string;
		shortcut?: string;
		class?: string;
		children?: import("svelte").Snippet;
	} = $props();
	let context = useQuestionnaireContext();
	let item = $derived(context.items.find((entry) => entry.name === context.activeItem));
	let inputType = $derived(item?.multiple ? "checkbox" : "radio");
</script>

<label
	class={cn(
		"relative flex cursor-pointer gap-3 rounded-lg border border-input p-4 transition-colors hover:bg-accent/50 has-[:checked]:border-primary has-[:checked]:bg-accent",
		className
	)}
>
	<input
		class="sr-only"
		type={inputType}
		name={context.activeItem}
		{value}
		data-questionnaire-shortcut={shortcut}
	/>
	<span class="flex min-w-0 flex-col gap-1 text-sm">
		<span class="font-medium">{label ?? value}</span>
		{#if description}<span class="text-muted-foreground">{description}</span>{/if}
		{@render children?.()}
	</span>
	{#if shortcut}<kbd class="ml-auto text-xs text-muted-foreground">{shortcut}</kbd>{/if}
</label>
