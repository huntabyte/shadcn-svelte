<script lang="ts">
	import XIcon from "@lucide/svelte/icons/x";
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import { z } from "zod";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	const form = createForm(() => ({
		defaultValues: { emails: [{ address: "" }] },
		validators: {
			onSubmit: z.object({
				emails: z
					.array(z.object({ address: z.email("Enter a valid email address.") }))
					.min(1)
					.max(5),
			}),
		},
		onSubmit: ({ value }) => toast.success(`You submitted ${JSON.stringify(value)}`),
	}));
</script>

<Card.Root class="w-full sm:max-w-md"
	><Card.Header
		><Card.Title>Contact Emails</Card.Title><Card.Description
			>Add up to five email addresses.</Card.Description
		></Card.Header
	><Card.Content
		><form
			id="form-tanstack-array"
			onsubmit={(event) => {
				event.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field name="emails" mode="array"
				>{#snippet children(emailField)}<Field.Group
						>{#each emailField.state.value as _, index (index)}<form.Field
								name={`emails[${index}].address`}
								>{#snippet children(field)}<Field.Field
										orientation="horizontal"
										data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
										><Field.Content
											><Input
												name={field.name}
												value={field.state.value}
												onblur={field.handleBlur}
												oninput={(event) => field.handleChange(event.currentTarget.value)}
												placeholder="name@example.com"
												type="email"
											/>{#if field.state.meta.isTouched && !field.state.meta.isValid}<Field.Error
													errors={field.state.meta.errors.filter((error) => error !== undefined)}
												/>{/if}</Field.Content
										>{#if emailField.state.value.length > 1}<Button
												type="button"
												variant="ghost"
												size="icon"
												aria-label={`Remove email ${index + 1}`}
												onclick={() => emailField.removeValue(index)}><XIcon /></Button
											>{/if}</Field.Field
									>{/snippet}</form.Field
							>{/each}<Button
							type="button"
							variant="outline"
							size="sm"
							disabled={emailField.state.value.length >= 5}
							onclick={() => emailField.pushValue({ address: "" })}>Add Email Address</Button
						></Field.Group
					>{/snippet}</form.Field
			>
		</form></Card.Content
	><Card.Footer
		><Field.Field orientation="horizontal"
			><Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button><Button
				type="submit"
				form="form-tanstack-array">Save</Button
			></Field.Field
		></Card.Footer
	></Card.Root
>
