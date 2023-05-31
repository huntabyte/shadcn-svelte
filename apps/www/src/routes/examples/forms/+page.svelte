<script lang="ts">
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms/client";
	import { Button } from "$components/ui/button";
	import { Form, FormField, FormLabel } from "$components/ui/form";
	import { Input } from "$components/ui/input";
	import { registerSchema } from "./schemas";

	export let data: PageData;

	const form = superForm(data.form, {
		validators: registerSchema
	});
</script>

<Form
	{form}
	action="?/register"
	method="POST"
	class="p-4 max-w-md w-full mx-auto grid gap-4"
>
	<FormField let:field name="name">
		<FormLabel>Name</FormLabel>
		<Input type="text" {...field} />
	</FormField>
	<FormField let:field name="email">
		<FormLabel>Email</FormLabel>
		<Input type="email" {...field} />
	</FormField>
	<FormField let:field name="password">
		<FormLabel>Password</FormLabel>
		<Input type="password" {...field} />
	</FormField>
	<FormField let:field name="passwordConfirm">
		<FormLabel>Confirm Password</FormLabel>
		<Input type="passwordConfirm" {...field} />
	</FormField>
	<Button type="submit">Register</Button>
</Form>
