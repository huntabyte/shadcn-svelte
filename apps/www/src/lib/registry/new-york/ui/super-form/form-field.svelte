<script lang="ts">
	import { createFormField } from ".";

	import type { FormPathLeaves, ZodValidation } from "sveltekit-superforms";
	import { formFieldProxy, type SuperForm } from "sveltekit-superforms/client";
	import type { Form } from "./types";
	import type { AnyZodObject, z } from "zod";
	import { cn } from "@/utils";
	let className: string | undefined | null = undefined;
	export { className as class };

	type T = $$Generic<AnyZodObject>;
	type Path = $$Generic<FormPathLeaves<z.infer<T>>>;

	export let form: Form<T>;
	export let name: Path;

	const {
		stores: { errors, value },
		getFieldAttrs
	} = createFormField<T, Path>(form, name);

	$: field = {
		attrs: getFieldAttrs($value, $errors),
		value
	};
</script>

<div class={cn("space-y-2", className)} {...$$restProps}>
	<slot {field} />
</div>
