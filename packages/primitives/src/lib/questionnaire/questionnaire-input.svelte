<script lang="ts">
	import { onMount, untrack } from "svelte";
	import { useQuestionnaireContext, useQuestionnaireItemContext } from "./internal/context.js";
	import type { HTMLInputAttributes } from "svelte/elements";

	type Props = Omit<HTMLInputAttributes, "children" | "type"> & {
		type?:
			| "date"
			| "datetime-local"
			| "email"
			| "month"
			| "number"
			| "password"
			| "search"
			| "tel"
			| "text"
			| "time"
			| "url"
			| "week";
	};

	let {
		type = "text",
		value = $bindable(),
		defaultValue,
		disabled = false,
		oninput,
		...restProps
	}: Props = $props();
	let context = useQuestionnaireContext();
	let item = useQuestionnaireItemContext();
	let control = $state<HTMLInputElement | null>(null);
	let uncontrolledValue = $state(untrack(() => defaultValue ?? ""));
	let currentValue = $derived(value ?? uncontrolledValue);
	let filled = $derived(String(currentValue ?? "").trim().length > 0);

	onMount(() => {
		const form = control?.form;
		if (!form || value !== undefined) return;
		const reset = () =>
			queueMicrotask(() => {
				uncontrolledValue = defaultValue ?? "";
			});
		form.addEventListener("reset", reset);
		return () => form.removeEventListener("reset", reset);
	});

	function handleInput(event: Event) {
		oninput?.(event as Parameters<NonNullable<typeof oninput>>[0]);
		if (event.defaultPrevented) return;
		const target = event.currentTarget as HTMLInputElement;
		if (value === undefined) uncontrolledValue = target.value;
		else value = target.value;
		if (target.value.trim()) context.selectControl(item.name, target);
		else context.markAnswered(item.name);
	}
</script>

<input
	bind:this={control}
	name={filled ? item.name : undefined}
	{type}
	value={currentValue}
	data-empty={!filled ? "" : undefined}
	data-filled={filled ? "" : undefined}
	aria-invalid={context.invalid(item.name) || undefined}
	aria-keyshortcuts={filled ? "Enter" : undefined}
	{disabled}
	oninput={handleInput}
	{...restProps}
/>
