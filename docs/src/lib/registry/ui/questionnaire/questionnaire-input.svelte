<script lang="ts">
	import * as QuestionnairePrimitive from "@shadcn-svelte/primitives/questionnaire";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	type Props = ComponentProps<typeof QuestionnairePrimitive.Input> & { label?: string };
	let { label, class: className, ...restProps }: Props = $props();
</script>

<div
	data-slot="questionnaire-input-wrapper"
	class="cn-questionnaire-input-wrapper group/questionnaire-input relative min-w-0"
>
	{#if label}<span class="font-medium">{label}</span>{/if}
	<QuestionnairePrimitive.Input
		data-slot="questionnaire-input"
		class={cn(
			"cn-questionnaire-input min-h-11 w-full min-w-0 transition-[color,box-shadow,background-color] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0",
			className
		)}
		{...restProps}
	/>
</div>
