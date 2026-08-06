<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext } from "./context.js";

	let {
		value,
		label,
		description,
		shortcut,
		disabled = false,
		class: className,
		children,
	}: {
		value: string;
		label?: string;
		description?: string;
		shortcut?: string;
		disabled?: boolean;
		class?: string;
		children?: import("svelte").Snippet;
	} = $props();
	let context = useQuestionnaireContext();
	let item = $derived(context.item());
	let inputType = $derived(item?.multiple ? "checkbox" : "radio");
	let checked = $derived(context.value(context.activeItem).includes(value));
	let shortcutValue = $derived(shortcut ?? undefined);
</script>

<label
	data-slot="questionnaire-choice"
	data-type={inputType}
	data-checked={checked ? "" : undefined}
	data-shortcut={shortcutValue}
	data-disabled={disabled ? "" : undefined}
	class={cn(
		"cn-questionnaire-choice group/questionnaire-choice relative flex min-h-11 cursor-pointer items-start text-start transition-colors outline-none select-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
		className
	)}
>
	<input
		class="cn-questionnaire-choice-input absolute inset-0 z-10 size-full cursor-pointer opacity-0"
		type={inputType}
		name={context.activeItem}
		{value}
		data-questionnaire-shortcut={shortcut}
		{disabled}
		{checked}
		onchange={() => context.markTouched()}
	/>
	<span
		aria-hidden="true"
		data-slot="questionnaire-choice-indicator"
		class="cn-questionnaire-choice-indicator pointer-events-none relative flex shrink-0 items-center justify-center border group-data-[type=radio]/questionnaire-choice:rounded-full"
	>
		<span
			class="cn-questionnaire-choice-indicator-dot hidden rounded-full group-data-[type=checkbox]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
		></span>
		<span
			class="cn-questionnaire-choice-indicator-check hidden group-data-[type=radio]/questionnaire-choice:hidden group-data-checked/questionnaire-choice:block"
			>✓</span
		>
	</span>
	<span
		data-slot="questionnaire-choice-label"
		class="cn-questionnaire-choice-label cn-questionnaire-choice-content flex min-w-0 flex-1 flex-col leading-snug"
	>
		{#if label}<span>{label}</span>{/if}
		{#if description}<span class="text-muted-foreground">{description}</span>{/if}
		{@render children?.()}
	</span>
	{#if shortcut}<kbd
			class="cn-questionnaire-choice-shortcut cn-questionnaire-shortcut pointer-events-none ms-auto mt-0.5 hidden shrink-0 group-data-[shortcut]/questionnaire-choice:inline-flex"
			>{shortcut}</kbd
		>{/if}
</label>
