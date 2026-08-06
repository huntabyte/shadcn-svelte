<script lang="ts">
	import { CheckIcon } from "@lucide/svelte";
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext, useQuestionnaireItemContext } from "./context.js";
	import type { HTMLInputAttributes, HTMLLabelAttributes } from "svelte/elements";

	type Props = Omit<HTMLLabelAttributes, "children" | "onchange"> & {
		value: string;
		label?: string;
		description?: string;
		shortcut?: string;
		disabled?: boolean;
		checked?: boolean;
		defaultChecked?: boolean;
		onchange?: HTMLInputAttributes["onchange"];
		children?: import("svelte").Snippet;
	};

	let {
		value,
		label,
		description,
		shortcut: shortcutProp,
		disabled = false,
		checked = $bindable(),
		defaultChecked = false,
		onchange,
		class: className,
		children,
		...restProps
	}: Props = $props();
	let context = useQuestionnaireContext();
	let item = useQuestionnaireItemContext();
	let control = $state<HTMLInputElement | null>(null);
	let inputType = $derived(item.multiple ? "checkbox" : "radio");
	let isChecked = $derived(
		checked ?? (control ? context.selected(item.name, value) : defaultChecked)
	);
	let shortcut = $derived(shortcutProp ?? context.shortcut(item.name, value, control));

	function handleChange(event: Event) {
		onchange?.(event as Parameters<NonNullable<typeof onchange>>[0]);
		if (event.defaultPrevented) return;
		const target = event.currentTarget as HTMLInputElement;
		if (checked !== undefined) checked = target.checked;
		if (target.checked) context.selectControl(item.name, target);
		else context.markAnswered(item.name);
	}
</script>

<label
	data-slot="questionnaire-choice"
	data-type={inputType}
	data-checked={isChecked ? "" : undefined}
	data-unchecked={!isChecked ? "" : undefined}
	data-shortcut={shortcut ?? undefined}
	data-disabled={disabled ? "" : undefined}
	class={cn(
		"cn-questionnaire-choice group/questionnaire-choice relative flex min-h-11 cursor-pointer items-start text-start transition-colors outline-none select-none data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
		className
	)}
	{...restProps}
>
	<input
		bind:this={control}
		class="cn-questionnaire-choice-input absolute inset-0 z-10 size-full cursor-pointer opacity-0"
		type={inputType}
		name={item.name}
		{value}
		checked={isChecked}
		data-questionnaire-shortcut={shortcut ?? undefined}
		aria-keyshortcuts={[shortcut, isChecked ? "Enter" : null].filter(Boolean).join(" ") ||
			undefined}
		aria-invalid={context.invalid(item.name) || undefined}
		{disabled}
		onchange={handleChange}
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
	<span
		data-slot="questionnaire-choice-label"
		class="cn-questionnaire-choice-label cn-questionnaire-choice-content flex min-w-0 flex-1 flex-col leading-snug"
	>
		{#if label}<span>{label}</span>{/if}
		{#if description}<span class="text-muted-foreground">{description}</span>{/if}
		{@render children?.()}
	</span>
	<span
		aria-hidden="true"
		hidden={!shortcut}
		data-slot="questionnaire-choice-shortcut"
		class="cn-questionnaire-choice-shortcut cn-questionnaire-shortcut pointer-events-none ms-auto mt-0.5 hidden shrink-0 group-data-[shortcut]/questionnaire-choice:inline-flex"
		>{shortcut}</span
	>
</label>
