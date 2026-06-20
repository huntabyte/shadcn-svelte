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
		...restProps
	}: Props = $props();

	setContext<ComboboxContext>(COMBOBOX_CONTEXT, {
		setOpen: (value) => {
			open = value;
		},
	});
</script>

<ComboboxPrimitive.Root bind:value bind:open type="single" {inputValue} {...restProps} />
