<script lang="ts" module>
	import { z } from "zod";

	const formSchema = z.object({
		emails: z
			.array(
				z.object({
					address: z.email("Enter a valid email address."),
				})
			)
			.min(1, "Add at least one email address.")
			.max(5, "You can add up to 5 email addresses."),
	});
</script>

<script lang="ts">
	import XIcon from "@lucide/svelte/icons/x";
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/forms/tanstack/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const form = createForm(() => ({
		defaultValues: {
			emails: [{ address: "" }],
		},
		validators: {
			onBlur: formSchema,
		},
		onSubmit: async ({ value }) => {
			toast.success(`You submitted ${JSON.stringify(value, null, 2)}`);
		},
	}));
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header class="border-b">
		<Card.Title>Contact Emails</Card.Title>
		<Card.Description>Manage your contact email addresses.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			id="form-tanstack-array"
			novalidate
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<Form.Fieldset of={form} name="emails" mode="array" class="gap-4">
					{#snippet children(field)}
						<Form.Legend variant="label">Email Addresses</Form.Legend>
						<Form.Description
							>Add up to 5 email addresses where we can contact you.</Form.Description
						>
						<Field.Group class="gap-4">
							{#each field.state.value as _, index (index)}
								<Form.Field of={form} name={`emails[${index}].address`} orientation="horizontal">
									{#snippet children(subField)}
										<Form.Control>
											{#snippet children({ props })}
												<Field.Content>
													<InputGroup.Root>
														<InputGroup.Input
															{...props}
															bind:value={() => subField.state.value, subField.handleChange}
															aria-label="Email {index + 1}"
															placeholder="name@example.com"
															type="email"
															autocomplete="email"
														/>
														{#if field.state.value.length > 1}
															<InputGroup.Addon align="inline-end">
																<InputGroup.Button
																	type="button"
																	variant="ghost"
																	size="icon-xs"
																	onclick={() => field.removeValue(index)}
																	aria-label="Remove email {index + 1}"
																>
																	<XIcon />
																</InputGroup.Button>
															</InputGroup.Addon>
														{/if}
													</InputGroup.Root>
													<Form.FieldErrors />
												</Field.Content>
											{/snippet}
										</Form.Control>
									{/snippet}
								</Form.Field>
							{/each}
							<Button
								type="button"
								variant="outline"
								size="sm"
								onclick={() => field.pushValue({ address: "" })}
								disabled={field.state.value.length >= 5}
							>
								Add Email Address
							</Button>
						</Field.Group>
						<Form.FieldErrors />
					{/snippet}
				</Form.Fieldset>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer class="border-t">
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button>
			<Button type="submit" form="form-tanstack-array">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
