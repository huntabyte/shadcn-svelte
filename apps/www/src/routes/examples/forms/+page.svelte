<script lang="ts">
	import type { PageData } from "./$types";
	import { superForm } from "sveltekit-superforms/client";
	import { Button } from "$components/ui/button";
	import {
		Form,
		FormControl,
		FormField,
		FormItem
	} from "$components/ui/form";
	import { Input } from "$components/ui/input";
	import { Label } from "$components/ui/label";

	export let data: PageData;

	const form = superForm(data.form);
</script>

<Form
	{form}
	action="?/register"
	method="POST"
	class="p-4 max-w-md w-full mx-auto grid gap-4"
>
	<FormField {form} name="name">
		<FormItem>
			<Label for="name">Name</Label>
			<FormControl {form}>
				<Input type="text" />
			</FormControl>
		</FormItem>
	</FormField>
	<FormItem>
		<Label for="email">Email</Label>
		<Input type="email" name="email" />
	</FormItem>
	<FormItem>
		<Label for="password">Password</Label>
		<Input type="password" name="password" />
	</FormItem>
	<FormItem>
		<Label for="passwordConfirm">Confirm Password</Label>
		<Input type="password" name="passwordConfirm" />
	</FormItem>
	<Button type="submit">Register</Button>
</Form>
