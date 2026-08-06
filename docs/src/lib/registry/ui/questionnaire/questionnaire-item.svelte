<script lang="ts">
	import { onMount } from "svelte";
	import { cn } from "$lib/utils.js";
	import {
		createQuestionnaireItemContext,
		useQuestionnaireContext,
		type QuestionnaireItemStatus,
	} from "./context.js";
	import type { HTMLFieldsetAttributes } from "svelte/elements";

	type Props = Omit<HTMLFieldsetAttributes, "children" | "name"> & {
		name: string;
		required?: boolean;
		multiple?: boolean;
		disabled?: boolean;
		invalid?: boolean;
		onStatusChange?: (status: QuestionnaireItemStatus) => void;
		children?: import("svelte").Snippet;
	};

	let {
		name,
		required = false,
		multiple = false,
		disabled = false,
		invalid: externallyInvalid = false,
		onStatusChange,
		class: className,
		children,
		...restProps
	}: Props = $props();
	let context = useQuestionnaireContext();
	let element = $state<HTMLFieldSetElement | null>(null);
	let descriptionIds = $state<string[]>([]);
	let errorIds = $state<string[]>([]);
	let active = $derived(!disabled && context.activeItem === name);
	let status = $derived(context.status(name));
	let isInvalid = $derived(externallyInvalid || context.invalid(name));
	let previousStatus = $state<QuestionnaireItemStatus>("unanswered");

	createQuestionnaireItemContext({
		get name() {
			return name;
		},
		get required() {
			return required;
		},
		get multiple() {
			return multiple;
		},
		get disabled() {
			return disabled;
		},
	});

	$effect(() => {
		if (status !== previousStatus) {
			previousStatus = status;
			onStatusChange?.(status);
		}
	});

	onMount(() =>
		context.registerItem({
			get name() {
				return name;
			},
			get element() {
				return element;
			},
			get required() {
				return required;
			},
			get multiple() {
				return multiple;
			},
			get disabled() {
				return disabled;
			},
			get invalid() {
				return externallyInvalid;
			},
			descriptionIds,
			errorIds,
		})
	);

	let describedBy = $derived(
		[...descriptionIds, ...(isInvalid ? errorIds : [])].filter(Boolean).join(" ") || undefined
	);
	let keyShortcuts = $derived(
		[
			active ? "Meta+Enter Control+Enter" : undefined,
			active ? "ArrowUp ArrowDown" : undefined,
			active && !context.first ? "ArrowLeft" : undefined,
			active && !context.last && status !== "unanswered" ? "ArrowRight" : undefined,
		]
			.filter(Boolean)
			.join(" ") || undefined
	);
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<fieldset
	bind:this={element}
	hidden={!active}
	inert={!active}
	tabindex={-1}
	{disabled}
	aria-describedby={describedBy}
	aria-keyshortcuts={keyShortcuts}
	data-slot="questionnaire-item"
	data-name={name}
	data-active={active ? "" : undefined}
	data-required={required ? "" : undefined}
	data-multiple={multiple ? "" : undefined}
	data-disabled={disabled ? "" : undefined}
	data-invalid={isInvalid ? "" : undefined}
	data-status={status}
	class={cn("cn-questionnaire-item min-w-0 border-0 p-0 outline-none", className)}
	{...restProps}
>
	{@render children?.()}
</fieldset>
