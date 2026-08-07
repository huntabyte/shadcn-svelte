<script lang="ts">
	import { useQuestionnaireChoiceContext, useQuestionnaireContext } from "./internal/context.js";
	import { useQuestionnaireItemContext } from "./internal/context.js";
	import type { HTMLInputAttributes } from "svelte/elements";

	type Props = Omit<HTMLInputAttributes, "checked" | "name" | "type" | "value">;

	let { disabled: disabledProp, onchange, ...restProps }: Props = $props();
	let context = useQuestionnaireContext();
	let item = useQuestionnaireItemContext();
	let choice = useQuestionnaireChoiceContext();
	let control = $state<HTMLInputElement | null>(null);
	let disabled = $derived(disabledProp ?? choice.disabled);

	$effect(() => {
		choice.setControl(control);
		return () => choice.setControl(null);
	});

	function handleChange(event: Event) {
		onchange?.(event as Parameters<NonNullable<typeof onchange>>[0]);
		if (!event.defaultPrevented) choice.handleChange(event);
	}
</script>

<input
	bind:this={control}
	type={choice.type}
	name={item.name}
	value={choice.value}
	checked={choice.checked}
	data-questionnaire-shortcut={choice.shortcut ?? undefined}
	aria-keyshortcuts={[choice.shortcut, choice.checked ? "Enter" : null].filter(Boolean).join(" ") ||
		undefined}
	aria-invalid={context.invalid(item.name) || undefined}
	{disabled}
	onchange={handleChange}
	{...restProps}
/>
