<script lang="ts" module>
	import * as v from "valibot";

	const FormSchema = v.object({
		emails: v.pipe(
			v.array(
				v.object({
					address: v.pipe(v.string(), v.email("Enter a valid email address.")),
				})
			),
			v.minLength(1, "Add at least one email address."),
			v.maxLength(5, "You can add up to 5 email addresses.")
		),
	});
</script>

<script lang="ts">
	import XIcon from "@lucide/svelte/icons/x";
	import {
		createForm,
		FieldArray,
		insert,
		remove,
		reset,
		type SubmitHandler,
	} from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/forms/formisch/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const form = createForm({
		schema: FormSchema,
		initialInput: { emails: [{ address: "" }] },
	});

	const onsubmit: SubmitHandler<typeof FormSchema> = (output) => {
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header class="border-b">
		<Card.Title>Contact Emails</Card.Title>
		<Card.Description>Manage your contact email addresses.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form.Root of={form} {onsubmit} id="form-formisch-array">
			<Field.Group>
				<FieldArray of={form} path={["emails"]}>
					{#snippet children(fieldArray)}
						<Field.Set class="gap-4">
							<Field.Legend variant="label">Email Addresses</Field.Legend>
							<Field.Description
								>Add up to 5 email addresses where we can contact you.</Field.Description
							>
							<Field.Group class="gap-4">
								{#each fieldArray.items as item, index (item)}
									<Form.Field
										of={form}
										path={["emails", index, "address"]}
										orientation="horizontal"
									>
										{#snippet children(field)}
											<Form.Control>
												{#snippet children({ props })}
													<Field.Content>
														<InputGroup.Root>
															<InputGroup.Input
																{...props}
																value={field.input}
																aria-label="Email {index + 1}"
																placeholder="name@example.com"
																type="email"
																autocomplete="email"
															/>
															{#if fieldArray.items.length > 1}
																<InputGroup.Addon align="inline-end">
																	<InputGroup.Button
																		type="button"
																		variant="ghost"
																		size="icon-xs"
																		onclick={() => remove(form, { path: ["emails"], at: index })}
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
									onclick={() => insert(form, { path: ["emails"], initialInput: { address: "" } })}
									disabled={fieldArray.items.length >= 5}
								>
									Add Email Address
								</Button>
							</Field.Group>
							<Field.Error errors={fieldArray.errors?.map((message) => ({ message }))} />
						</Field.Set>
					{/snippet}
				</FieldArray>
			</Field.Group>
		</Form.Root>
	</Card.Content>
	<Card.Footer class="border-t">
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-array">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
