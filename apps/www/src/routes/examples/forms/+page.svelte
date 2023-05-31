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
	import { Input } from "$components/ui/input";
	import { registerSchema } from "./schemas";
	import SuperDebug from "sveltekit-superforms/client/SuperDebug.svelte";

	export let data: PageData;

	const form = superForm(data.form);

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
		<Input type="text" {...field} />
		<FormMessage />
	</FormField>
	<FormField {form} let:field name="email">
		<FormLabel>Email</FormLabel>
		<Input type="email" {...field} />
		<FormMessage />
	</FormField>
	<FormField {form} let:field name="password">
		<FormLabel>Password</FormLabel>
		<Input type="password" {...field} />
		<FormMessage />
	</FormField>
	<FormField {form} let:field name="passwordConfirm">
		<FormLabel>Confirm Password</FormLabel>
		<Input type="password" {...field} />
		<FormMessage />
	</FormField>
	<Button type="submit">Register</Button>
</Form>
