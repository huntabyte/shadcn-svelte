<script lang="ts">
	import { ctx } from "../ctx";
	import type { SelectProps } from "../types";

	type $$Props = SelectProps;

	export let required: $$Props["required"] = undefined;
	export let disabled: $$Props["disabled"] = undefined;
	export let arrowSize: $$Props["arrowSize"] = undefined;
	export let preventScroll: $$Props["preventScroll"] = undefined;
	export let loop: $$Props["loop"] = undefined;
	export let closeOnEscape: $$Props["closeOnEscape"] = undefined;
	export let closeOnOutsideClick: $$Props["closeOnOutsideClick"] = undefined;
	export let portal: $$Props["portal"] = undefined;
	export let positioning: $$Props["positioning"] = undefined;
	export let name: $$Props["name"] = undefined;
	export let multiple: $$Props["multiple"] = undefined;
	export let value: $$Props["value"] = undefined;
	export let open: $$Props["open"] = undefined;
	export let label: $$Props["label"] = undefined;

	const {
		states: { open: localOpen, value: localValue, valueLabel },
		updateOption
	} = ctx.set({
		required,
		disabled,
		arrowSize,
		preventScroll,
		loop,
		closeOnEscape,
		closeOnOutsideClick,
		portal,
		positioning,
		name,
		multiple,
		defaultValue: value,
		defaultOpen: open,
		defaultValueLabel: label,
		onValueChange: ({ next }) => {
			value = next;
			return next;
		},
		onOpenChange: ({ next }) => {
			open = next;
			return next;
		}
	});

	$: open !== undefined && localOpen.set(open);
	$: value !== undefined && localValue.set(value);

	$: updateOption("required", required);
	$: updateOption("disabled", disabled);
	$: updateOption("arrowSize", arrowSize);
	$: updateOption("preventScroll", preventScroll);
	$: updateOption("loop", loop);
	$: updateOption("closeOnEscape", closeOnEscape);
	$: updateOption("closeOnOutsideClick", closeOnOutsideClick);
	$: updateOption("portal", portal);
	$: updateOption("positioning", positioning);
	$: updateOption("name", name);
	$: updateOption("multiple", multiple);
</script>

<slot />
