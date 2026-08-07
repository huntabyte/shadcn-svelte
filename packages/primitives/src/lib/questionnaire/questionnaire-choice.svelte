<script lang="ts">
	import {
		createQuestionnaireChoiceContext,
		useQuestionnaireContext,
		useQuestionnaireItemContext,
	} from "./internal/context.js";
	import type { HTMLInputAttributes, HTMLLabelAttributes } from "svelte/elements";

	type Props = Omit<HTMLLabelAttributes, "children" | "onchange"> & {
		value: string;
		shortcut?: string;
		disabled?: boolean;
		checked?: boolean;
		defaultChecked?: boolean;
		onchange?: HTMLInputAttributes["onchange"];
		children?: import("svelte").Snippet;
	};

	let {
		value,
		shortcut: shortcutProp,
		disabled = false,
		checked = $bindable(),
		defaultChecked = false,
		onchange,
		children,
		...restProps
	}: Props = $props();
	let context = useQuestionnaireContext();
	let item = useQuestionnaireItemContext();
	let control = $state<HTMLInputElement | null>(null);
	let type = $derived<"checkbox" | "radio">(item.multiple ? "checkbox" : "radio");
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

	createQuestionnaireChoiceContext({
		get value() {
			return value;
		},
		get disabled() {
			return disabled;
		},
		get checked() {
			return isChecked;
		},
		get shortcut() {
			return shortcut;
		},
		get type() {
			return type;
		},
		setControl(next) {
			control = next;
		},
		handleChange,
	});
</script>

<label
	data-type={type}
	data-checked={isChecked ? "" : undefined}
	data-unchecked={!isChecked ? "" : undefined}
	data-shortcut={shortcut ?? undefined}
	data-disabled={disabled ? "" : undefined}
	{...restProps}
>
	{@render children?.()}
</label>
