<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { setContext } from "svelte";
	import { COMBOBOX_CONTEXT, type ComboboxContext } from "./context.js";

	type Props =
		| (Omit<Extract<ComboboxPrimitive.RootProps, { type: "single" }>, "type"> & { type?: "single" })
		| Extract<ComboboxPrimitive.RootProps, { type: "multiple" }>;

	let {
		type = "single",
		value = $bindable(),
		open = $bindable(false),
		disabled = false,
		onOpenChange,
		onValueChange,
		...restProps
	}: Props = $props();

	let anchor = $state<HTMLElement | null>(null);

	setContext<ComboboxContext>(COMBOBOX_CONTEXT, {
		get anchor() {
			return anchor;
		},
		get disabled() {
			return disabled;
		},
		get hasValue() {
			return Array.isArray(value) ? value.length > 0 : !!value;
		},
		clear: () => {
			if (disabled) return;
			value = type === "multiple" ? [] : "";
			onValueChange?.(value as never);
		},
		setOpen: (nextOpen) => {
			if (disabled || open === nextOpen) return;
			open = nextOpen;
			onOpenChange?.(nextOpen);
		},
		setAnchor: (value) => {
			anchor = value;
		},
	});
</script>

<ComboboxPrimitive.Root
	bind:value={value as never}
	bind:open
	{type}
	{disabled}
	onValueChange={onValueChange as never}
	{onOpenChange}
	{...restProps}
/>
