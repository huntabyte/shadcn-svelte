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

<div
	data-slot="questionnaire-input-wrapper"
	class="cn-questionnaire-input-wrapper group/questionnaire-input relative min-w-0"
>
	{#if label}<span class="font-medium">{label}</span>{/if}
	<input
		name={context.activeItem}
		{placeholder}
		class={cn(
			"cn-questionnaire-input min-h-11 w-full min-w-0 transition-[color,box-shadow,background-color] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0",
			className
		)}
		{...rest}
	/>
</div>
