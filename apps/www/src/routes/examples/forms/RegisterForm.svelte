<script lang="ts">
	import {
		FormField,
		FormInput,
		FormLabel,
		FormMessage
	} from "$components/ui/form";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";
	import type { registerSchema } from "./schemas";
	import type { Validation } from "sveltekit-superforms/index";
	import { superForm } from "sveltekit-superforms/client";
	import { Button } from "$components/ui/button";

	export let data: Validation<typeof registerSchema>;

	const form = superForm(data);

	$: ({ form: superFrm } = form);
</script>

<SuperDebug data={$superFrm} />
<form
	action="?/register"
	method="POST"
	class="p-4 max-w-md w-full mx-auto grid gap-4"
	use:form.enhance
>
	<FormField {form} let:field name="name">
		<FormLabel>Name</FormLabel>
		<FormInput type="text" {...field} />
		<FormMessage />
	</FormField>
	<FormField {form} let:field name="email">
		<FormLabel>Email</FormLabel>
		<FormInput type="email" {...field} />
		<FormMessage />
	</FormField>
	<FormField {form} let:field name="password">
		<FormLabel>Password</FormLabel>
		<FormInput type="password" {...field} />
		<FormMessage />
	</FormField>
	<FormField {form} let:field name="passwordConfirm">
		<FormLabel>Confirm Password</FormLabel>
		<FormInput type="password" {...field} />
		<FormMessage />
	</FormField>
	<FormField {form} let:field name="acceptTerms">
		<div class="flex items-center space-x-2">
			<FormInput type="checkbox" {...field} />
			<FormLabel>Accept Terms</FormLabel>
		</div>
		<FormMessage />
	</FormField>
	<Button type="submit">Register</Button>
</form>
