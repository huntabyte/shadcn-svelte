<script lang="ts">
	import { onMount, untrack } from "svelte";
	import { cn } from "$lib/utils.js";
	import { useQuestionnaireContext, useQuestionnaireItemContext } from "./context.js";
	import type { HTMLInputAttributes } from "svelte/elements";

	type Props = Omit<HTMLInputAttributes, "children" | "type"> & {
		label?: string;
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
		label,
		type = "text",
		value = $bindable(),
		defaultValue,
		disabled = false,
		oninput,
		class: className,
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

<div
	data-slot="questionnaire-input-wrapper"
	class="cn-questionnaire-input-wrapper group/questionnaire-input relative min-w-0"
>
	{#if label}<span class="font-medium">{label}</span>{/if}
	<input
		bind:this={control}
		name={filled ? item.name : undefined}
		{type}
		value={currentValue}
		data-empty={!filled ? "" : undefined}
		data-filled={filled ? "" : undefined}
		aria-invalid={context.invalid(item.name) || undefined}
		aria-keyshortcuts={filled ? "Enter" : undefined}
		class={cn(
			"cn-questionnaire-input min-h-11 w-full min-w-0 transition-[color,box-shadow,background-color] outline-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0",
			className
		)}
		{disabled}
		oninput={handleInput}
		{...restProps}
	/>
</div>
