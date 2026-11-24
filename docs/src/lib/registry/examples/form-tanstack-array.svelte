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
			<form.Field name="emails" mode="array">
				{#snippet children(field)}
					{@const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid}
					<Field.Set class="gap-4">
						<Field.Legend variant="label">Email Addresses</Field.Legend>
						<Field.Description>
							Add up to 5 email addresses where we can contact you.
						</Field.Description>
						<Field.Group class="gap-4">
							{#each field.state.value as _, index (index)}
								<form.Field name={`emails[${index}].address`}>
									{#snippet children(subField)}
										{@const isSubFieldInvalid =
											subField.state.meta.isTouched && !subField.state.meta.isValid}
										<Field.Field
											orientation="horizontal"
											data-invalid={isSubFieldInvalid ? true : undefined}
										>
											<Field.Content>
												<InputGroup.Root>
													<InputGroup.Input
														id="form-tanstack-array-email-{index}"
														name={subField.name}
														value={subField.state.value}
														onblur={subField.handleBlur}
														oninput={(e) => subField.handleChange(e.currentTarget.value)}
														aria-invalid={isSubFieldInvalid}
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
												{#if isSubFieldInvalid}
													<Field.Error errors={subField.state.meta.errors} />
												{/if}
											</Field.Content>
										</Field.Field>
									{/snippet}
								</form.Field>
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
						{#if isInvalid}
							<Field.Error errors={field.state.meta.errors} />
						{/if}
					</Field.Set>
				{/snippet}
			</form.Field>
		</form>
	</Card.Content>
	<Card.Footer class="border-t">
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button>
			<Button type="submit" form="form-tanstack-array">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
