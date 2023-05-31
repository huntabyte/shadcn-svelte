<script lang="ts">
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms/client";
	import { Button } from "$components/ui/button";
	import {
		Form,
		FormField,
		FormLabel,
		FormMessage
	} from "$components/ui/form";
	import FormInput from "$components/ui/form/FormInput.svelte";
	import { Input } from "$components/ui/input";
	import { registerSchema } from "./schemas";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";

	export let data: PageData;

	const form = superForm(data.form, {
		validators: registerSchema
	});

	$: ({ form: superFrm } = form);
</script>

<SuperDebug data={$superFrm} />
<Form
	{form}
	let:form
	action="?/register"
	method="POST"
	class="p-4 max-w-md w-full mx-auto grid gap-4"
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
	<Button type="submit">Register</Button>
</Form>
