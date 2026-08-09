<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import { z } from "zod";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";

	const form = createForm(() => ({
		defaultValues: { about: "" },
		validators: { onSubmit: z.object({ about: z.string().min(10).max(200) }) },
		onSubmit: ({ value }) => toast.success(`You submitted ${JSON.stringify(value, null, 2)}`),
	}));
</script>

<Card.Root class="w-full sm:max-w-md"
	><Card.Header
		><Card.Title>About You</Card.Title><Card.Description
			>Tell us a little about yourself.</Card.Description
		></Card.Header
	><Card.Content>
		<form
			id="form-tanstack-textarea"
			onsubmit={(event) => {
				event.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field name="about"
				>{#snippet children(field)}<Field.Field
						data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
						><Field.Label for="form-tanstack-about">Bio</Field.Label><Textarea
							id="form-tanstack-about"
							name={field.name}
							value={field.state.value}
							onblur={field.handleBlur}
							oninput={(event) => field.handleChange(event.currentTarget.value)}
							placeholder="Tell us about yourself"
						/><Field.Description>Between 10 and 200 characters.</Field.Description
						>{#if field.state.meta.isTouched && !field.state.meta.isValid}<Field.Error
								errors={field.state.meta.errors.filter((error) => error !== undefined)}
							/>{/if}</Field.Field
					>{/snippet}</form.Field
			>
		</form>
	</Card.Content><Card.Footer
		><Field.Field orientation="horizontal"
			><Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button><Button
				type="submit"
				form="form-tanstack-textarea">Save</Button
			></Field.Field
		></Card.Footer
	></Card.Root
>
