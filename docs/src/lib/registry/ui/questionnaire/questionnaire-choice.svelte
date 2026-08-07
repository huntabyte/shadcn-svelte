<script lang="ts">
	import * as QuestionnairePrimitive from "@shadcn-svelte/primitives/questionnaire";
	import { CheckIcon } from "@lucide/svelte";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";

	type Props = ComponentProps<typeof QuestionnairePrimitive.Choice> & {
		label?: string;
		description?: string;
	};

	let { label, description, class: className, children, ...restProps }: Props = $props();
</script>

<QuestionnairePrimitive.Choice
	data-slot="questionnaire-choice"
	class={cn(
		"cn-questionnaire-choice group/questionnaire-choice relative flex min-h-11 cursor-pointer items-start text-start transition-colors outline-none select-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
		className
	)}
	{...restProps}
>
	<QuestionnairePrimitive.ChoiceInput
		data-slot="questionnaire-choice-input"
		class="cn-questionnaire-choice-input absolute inset-0 z-10 size-full cursor-pointer opacity-0"
	/>
	<span
		aria-hidden="true"
		data-slot="questionnaire-choice-indicator"
		class="cn-questionnaire-choice-indicator pointer-events-none relative flex shrink-0 items-center justify-center border group-data-[type=radio]/questionnaire-choice:rounded-full"
	>
		<span
			data-slot="questionnaire-choice-indicator-dot"
			class="cn-questionnaire-choice-indicator-dot hidden rounded-full group-data-[type=checkbox]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
		></span>
		<CheckIcon
			data-slot="questionnaire-choice-indicator-check"
			class="cn-questionnaire-choice-indicator-check hidden group-data-[type=radio]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
		/>
	</span>
	<QuestionnairePrimitive.ChoiceLabel
		data-slot="questionnaire-choice-label"
		class="cn-questionnaire-choice-label cn-questionnaire-choice-content flex min-w-0 flex-1 flex-col leading-snug"
	>
		{#if label}<span>{label}</span>{/if}
		{#if description}<span class="text-muted-foreground">{description}</span>{/if}
		{@render children?.()}
	</QuestionnairePrimitive.ChoiceLabel>
	<QuestionnairePrimitive.ChoiceShortcut
		data-slot="questionnaire-choice-shortcut"
		class="cn-questionnaire-choice-shortcut cn-questionnaire-shortcut pointer-events-none ms-auto mt-0.5 hidden shrink-0 group-data-[shortcut]/questionnaire-choice:inline-flex"
	/>
</QuestionnairePrimitive.Choice>
