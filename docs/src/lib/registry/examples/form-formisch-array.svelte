<script lang="ts">
	import * as v from "valibot";
	import XIcon from "@lucide/svelte/icons/x";
	import {
		FieldArray,
		Form,
		Field as FormischField,
		insert,
		remove,
		reset,
		createForm,
	} from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import FormSubmittedValues from "./form-submitted-values.svelte";
	import type { SubmitEventHandler } from "@formisch/svelte";
	const FormSchema = v.object({
		emails: v.pipe(
			v.array(
				v.object({
					address: v.pipe(
						v.string(),
						v.nonEmpty("Enter an email address."),
						v.email("Enter a valid email address.")
					),
				})
			),
			v.minLength(1, "Add at least one email address."),
			v.maxLength(5, "You can add up to 5 email addresses.")
		),
	});
	const form = createForm({
		schema: FormSchema,
		initialInput: {
			emails: [{ address: "" }, { address: "" }],
		},
	});
	const handleSubmit: SubmitEventHandler<typeof FormSchema> = (output) => {
		toast("You submitted the following values:", {
			description: FormSubmittedValues,
			componentProps: { value: output },
			position: "bottom-right",
			classes: {
				content: "flex flex-col gap-2",
			},
			style: "--border-radius: calc(var(--radius) + 4px)",
		});
	};
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header class="border-b">
		<Card.Title>Contact Emails</Card.Title>
		<Card.Description>Manage your contact email addresses.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form of={form} id="form-formisch-array" onsubmit={handleSubmit}>
			<FieldArray of={form} path={["emails"]}>
				{#snippet children(fieldArray)}
					<Field.Set class="gap-4">
						<Field.Legend variant="label">Email Addresses</Field.Legend>
						<Field.Description>
							Add up to 5 email addresses where we can contact you.
						</Field.Description>
						<Field.Group class="gap-4">
							{#each fieldArray.items as item, index (item)}
								<FormischField of={form} path={["emails", index, "address"]}>
									{#snippet children(field)}
										<Field.Field orientation="horizontal" data-invalid={field.errors !== null}>
											<Field.Content>
												<InputGroup.Root>
													<InputGroup.Input
														{...field.props}
														id={`form-formisch-array-email-${index}`}
														value={field.input ?? ""}
														aria-invalid={field.errors !== null}
														aria-label={`Email ${index + 1}`}
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
																onclick={() =>
																	remove(form, {
																		path: ["emails"],
																		at: index,
																	})}
																aria-label={`Remove email ${index + 1}`}
															>
																<XIcon />
															</InputGroup.Button>
														</InputGroup.Addon>
													{/if}
												</InputGroup.Root>
												{#if field.errors}
													<Field.Error
														errors={field.errors.map((message) => ({
															message,
														}))}
													/>
												{/if}
											</Field.Content>
										</Field.Field>
									{/snippet}
								</FormischField>
							{/each}
							<Button
								type="button"
								variant="outline"
								size="sm"
								onclick={() =>
									insert(form, {
										path: ["emails"],
										initialInput: { address: "" },
									})}
								disabled={fieldArray.items.length >= 5}
							>
								Add Email Address
							</Button>
						</Field.Group>
						{#if fieldArray.errors}
							<Field.Error errors={fieldArray.errors.map((message) => ({ message }))} />
						{/if}
					</Field.Set>
				{/snippet}
			</FieldArray>
		</Form>
	</Card.Content>
	<Card.Footer class="border-t">
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-array">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
