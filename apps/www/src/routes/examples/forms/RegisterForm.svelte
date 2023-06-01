<script lang="ts">
	import {
		FormDescription,
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

<!-- <SuperDebug data={$superFrm} /> -->
<form action="?/register" method="POST" class="space-y-8" use:form.enhance>
	<FormField {form} let:field name="username">
		<FormLabel>Username</FormLabel>
		<FormInput type="text" {...field} />
		<FormDescription>
			This is your public display name. It can be your real name or a
			pseudonym. You can only change this once every 30 days.
		</FormDescription>
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
