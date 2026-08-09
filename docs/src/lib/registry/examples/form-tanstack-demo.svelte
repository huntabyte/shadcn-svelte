<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import { z } from "zod";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	const form = createForm(() => ({
		defaultValues: { username: "", email: "", terms: false },
		validators: {
			onSubmit: z.object({
				username: z.string().min(3),
				email: z.email(),
				terms: z.literal(true, "Accept the terms to continue."),
			}),
		},
		onSubmit: ({ value }) => toast.success(`You submitted ${JSON.stringify(value, null, 2)}`),
	}));
</script>

<form
	class="w-full max-w-md"
	onsubmit={(event) => {
		event.preventDefault();
		form.handleSubmit();
	}}
>
	<Field.Group
		><form.Field name="username"
			>{#snippet children(field)}<Field.Field
					><Field.Label for="tanstack-demo-username">Username</Field.Label><Input
						id="tanstack-demo-username"
						value={field.state.value}
						onblur={field.handleBlur}
						oninput={(event) => field.handleChange(event.currentTarget.value)}
					/>{#if field.state.meta.isTouched && !field.state.meta.isValid}<Field.Error
							errors={field.state.meta.errors.filter((error) => error !== undefined)}
						/>{/if}</Field.Field
				>{/snippet}</form.Field
		><form.Field name="email"
			>{#snippet children(field)}<Field.Field
					><Field.Label for="tanstack-demo-email">Email</Field.Label><Input
						id="tanstack-demo-email"
						type="email"
						value={field.state.value}
						onblur={field.handleBlur}
						oninput={(event) => field.handleChange(event.currentTarget.value)}
					/>{#if field.state.meta.isTouched && !field.state.meta.isValid}<Field.Error
							errors={field.state.meta.errors.filter((error) => error !== undefined)}
						/>{/if}</Field.Field
				>{/snippet}</form.Field
		><form.Field name="terms"
			>{#snippet children(field)}<Field.Field orientation="horizontal"
					><Checkbox
						id="tanstack-demo-terms"
						checked={field.state.value}
						onCheckedChange={(value) => field.handleChange(value)}
					/><Field.Label for="tanstack-demo-terms">Accept the terms and conditions</Field.Label
					></Field.Field
				>{/snippet}</form.Field
		><Button type="submit">Create account</Button></Field.Group
	>
</form>
