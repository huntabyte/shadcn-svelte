<script lang="ts">
	import XIcon from "@lucide/svelte/icons/x";
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import { z } from "zod";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import FormSubmittedValues from "./form-submitted-values.svelte";
	const formSchema = z.object({
		emails: z
			.array(
				z.object({
					address: z.string().email("Enter a valid email address."),
				})
			)
			.min(1, "Add at least one email address.")
			.max(5, "You can add up to 5 email addresses."),
	});
	const form = createForm(() => ({
		defaultValues: {
			emails: [{ address: "" }],
		},
		validators: [{ run: formSchema, triggers: ["blur"] }],
		onSubmit: async ({ value }) => {
			toast("You submitted the following values:", {
				description: FormSubmittedValues,
				componentProps: { value: value },
				position: "bottom-right",
				classes: {
					content: "flex flex-col gap-2",
				},
				style: "--border-radius: calc(var(--radius) + 4px)",
			});
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
			novalidate
			id="form-tanstack-array"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field name="emails">
				{#snippet children(field)}
					{@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
					<Field.Set class="gap-4">
						<Field.Legend variant="label">Email Addresses</Field.Legend>
						<Field.Description>
							Add up to 5 email addresses where we can contact you.
						</Field.Description>
						<Field.Group class="gap-4">
							<!-- Remount indexed fields after alpha.2 reindexes the array. -->
							{#key field.value.length}
								{#each field.value as _, index (index)}
									<form.Field name={`emails[${index}].address`}>
										{#snippet children(subField)}
											{@const isSubFieldInvalid =
												subField.meta.isTouched && subField.meta.isInvalid}
											<Field.Field orientation="horizontal" data-invalid={isSubFieldInvalid}>
												<Field.Content>
													<InputGroup.Root>
														<InputGroup.Input
															id={`form-tanstack-array-email-${index}`}
															name={subField.name}
															value={subField.value}
															onblur={subField.handleBlur}
															oninput={(e) => subField.handleChange(e.currentTarget.value)}
															aria-invalid={isSubFieldInvalid}
															aria-label={`Email ${index + 1}`}
															placeholder="name@example.com"
															type="email"
															autocomplete="email"
														/>
														{#if field.value.length > 1}
															<InputGroup.Addon align="inline-end">
																<InputGroup.Button
																	type="button"
																	variant="ghost"
																	size="icon-xs"
																	onclick={() => field.removeValue(index)}
																	aria-label={`Remove email ${index + 1}`}
																>
																	<XIcon />
																</InputGroup.Button>
															</InputGroup.Addon>
														{/if}
													</InputGroup.Root>
													{#if isSubFieldInvalid}
														<Field.Error errors={subField.meta.errors} />
													{/if}
												</Field.Content>
											</Field.Field>
										{/snippet}
									</form.Field>
								{/each}
							{/key}
							<Button
								type="button"
								variant="outline"
								size="sm"
								onclick={() => field.pushValue({ address: "" })}
								disabled={field.value.length >= 5}
							>
								Add Email Address
							</Button>
						</Field.Group>
						{#if isInvalid}
							<Field.Error errors={field.meta.errors} />
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
