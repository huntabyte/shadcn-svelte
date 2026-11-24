<script lang="ts" generics="TSchema extends FormSchema, TFieldPath extends RequiredPath">
	import {
		useField,
		type FieldStore,
		type FormSchema,
		type FormStore,
		type RequiredPath,
		type ValidPath,
	} from "@formisch/svelte";
	import { FieldSet } from "$lib/registry/ui/field/index.js";
	import type { WithoutChildren } from "$lib/utils.js";
	import { FormFieldState, setFormFieldState } from "./context.svelte.js";
	import type { ComponentProps, Snippet } from "svelte";
	import type * as v from "valibot";

	let {
		ref = $bindable(null),
		of,
		path,
		children,
		...restProps
	}: WithoutChildren<ComponentProps<typeof FieldSet>> & {
		of: FormStore<TSchema>;
		path: ValidPath<v.InferInput<TSchema>, TFieldPath>;
		children?: Snippet<[FieldStore<TSchema, TFieldPath>]>;
	} = $props();

	const id = $props.id();

	const field = useField(
		() => of,
		() => ({ path })
	);

	setFormFieldState(new FormFieldState(id, field as unknown as FieldStore));
</script>

<FieldSet bind:ref data-invalid={field.errors ? true : undefined} {...restProps}>
	{@render children?.(field)}
</FieldSet>
