<script lang="ts" generics="T extends FormValidation">
	import type { FormFieldName, FormValidation } from "./types";
	import { createFormField } from ".";
	import type { Form } from "./types";
	import { cn } from "@/utils";
	let className: string | undefined | null = undefined;
	export { className as class };

	export let form: Form<T>;
	export let name: FormFieldName<T>;

	const {
		stores: { value, errors },
		getFieldAttrs
	} = createFormField(form, name);

	$: field = {
		attrs: getFieldAttrs($value, $errors),
		value
	};
</script>

<div class={cn("space-y-2", className)}>
	<slot {field} {value} />
</div>
