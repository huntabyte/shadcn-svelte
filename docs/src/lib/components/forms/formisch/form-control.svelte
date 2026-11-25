<script lang="ts" generics="TCustom extends boolean = false">
	import { FormControlState, type FormControlProps } from "./context.svelte.js";
	import type { Snippet } from "svelte";

	let {
		children,
		custom,
	}: {
		children?: Snippet<[{ props: FormControlProps<TCustom> }]>;
		/**
		 * Set this when the control isn't a native `input`, `textarea` or `select`,
		 * such as `Select`, `Checkbox`, `RadioGroup` or `Switch`. It removes the
		 * `oninput` and `onchange` handlers, which those components never fire.
		 * Call `field.onInput` from the component's value callback instead.
		 */
		custom?: TCustom;
	} = $props();

	const id = $props.id();
	const control = FormControlState.create(id);
</script>

{@render children?.({ props: control.props(custom) })}
