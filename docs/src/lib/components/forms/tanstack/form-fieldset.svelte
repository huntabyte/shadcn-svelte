<script lang="ts" generics="TFormData, TName extends DeepKeys<TFormData>">
	import { createField, type DeepKeys } from "@tanstack/svelte-form";
	import { FieldSet } from "$lib/registry/ui/field/index.js";
	import type { WithoutChildren } from "$lib/utils.js";
	import {
		FormFieldState,
		type FormFieldApi,
		type FormFieldOptions,
		type FormOf,
	} from "./context.svelte.js";
	import type { ComponentProps, Snippet } from "svelte";

	let {
		ref = $bindable(null),
		of,
		name,
		mode,
		validators,
		children,
		...restProps
	}: WithoutChildren<ComponentProps<typeof FieldSet>> & {
		of: FormOf<TFormData>;
		name: TName;
		mode?: "value" | "array";
		validators?: FormFieldOptions<TFormData, TName>["validators"];
		children?: Snippet<[FormFieldApi<TFormData, TName>]>;
	} = $props();

	const id = $props.id();

	const field = createField(() => ({ form: of, name, mode, validators }));

	const fieldState = FormFieldState.create(id, field);
</script>

<FieldSet bind:ref data-invalid={fieldState.isInvalid ? true : undefined} {...restProps}>
	{@render children?.(field)}
</FieldSet>
