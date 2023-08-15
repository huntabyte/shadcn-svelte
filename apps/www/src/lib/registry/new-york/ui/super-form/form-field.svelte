<script lang="ts" context="module">
	import type { FormFieldName, FormValidation } from "./types";
</script>

<script lang="ts" generics="T extends FormValidation">
	import { createField } from ".";
	import type { Form } from "./types";
	import { cn } from "@/utils";
	let className: string | undefined | null = undefined;
	export { className as class };

	export let form: Form<T>;
	export let name: FormFieldName<T>;

	const {
		stores: { value, errors },
		context
	} = createField(form, name);

	$: field = {
		attrs: {
			"aria-invalid": $errors ? true : undefined,
			"aria-describedby": !errors
				? `${context.formDescriptionId}`
				: `${context.formDescriptionId} ${context.formMessageId}`,
			name,
			id: context.formItemId,
			value: $value
		},
		value
	};
</script>

<div class={cn("space-y-2", className)}>
	<slot {field} {value} />
</div>
