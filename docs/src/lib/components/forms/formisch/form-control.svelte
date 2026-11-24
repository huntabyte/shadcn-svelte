<script lang="ts" generics="TCustom extends boolean = false">
	import { getFormFieldState, setFormControlId } from "./context.svelte.js";
	import type { FieldElementProps } from "@formisch/svelte";
	import type { Snippet } from "svelte";

	type ControlProps = (TCustom extends true
		? Omit<FieldElementProps, "oninput" | "onchange">
		: FieldElementProps) & {
		id: string;
		"aria-invalid": boolean;
		"aria-describedby": string | undefined;
	};

	let {
		children,
		custom,
	}: {
		children?: Snippet<[{ props: ControlProps }]>;
		/**
		 * Set this when the control isn't a native `input`, `textarea` or `select`,
		 * such as `Select`, `Checkbox`, `RadioGroup` or `Switch`. It removes the
		 * `oninput` and `onchange` handlers, which those components never fire.
		 * Call `field.onInput` from the component's value callback instead.
		 */
		custom?: TCustom;
	} = $props();

	const fieldState = getFormFieldState();
	const id = $props.id();
	setFormControlId(id);

	const controlProps = $derived.by(() => {
		const { oninput, onchange, ...rest } = fieldState.field.props;
		return {
			...rest,
			...(custom ? {} : { oninput, onchange }),
			id,
			"aria-invalid": !!fieldState.field.errors,
			"aria-describedby":
				[
					fieldState.hasDescription ? `${fieldState.id}-description` : undefined,
					fieldState.field.errors ? `${fieldState.id}-error` : undefined,
				]
					.filter(Boolean)
					.join(" ") || undefined,
		} as unknown as ControlProps;
	});
</script>

{@render children?.({ props: controlProps })}
