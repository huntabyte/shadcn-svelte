<script lang="ts">
	import { Combobox as ComboboxPrimitive } from "bits-ui";
	import { setContext, type Snippet } from "svelte";
	import { COMBOBOX_CONTEXT, type ComboboxContext } from "./context.js";

	type Props = {
		children?: Snippet;
		value?: string;
		defaultValue?: string;
		inputValue?: string;
		open?: boolean;
		name?: string;
		disabled?: boolean;
		required?: boolean;
		loop?: boolean;
		onValueChange?: (value: string) => void;
		onOpenChange?: (open: boolean) => void;
		onOpenChangeComplete?: (open: boolean) => void;
	};

	let {
		value = $bindable(""),
		open = $bindable(false),
		inputValue,
		disabled = false,
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
		setOpen: (value) => {
			if (disabled && value) return;
			open = value;
		},
		setAnchor: (value) => {
			anchor = value;
		},
	});
</script>

<ComboboxPrimitive.Root bind:value bind:open type="single" {inputValue} {disabled} {...restProps} />
