<script lang="ts" module>
	import * as v from "valibot";

	const FormSchema = v.object({
		emails: v.array(
			v.object({
				address: v.pipe(
					v.string(),
					v.nonEmpty("Enter an email address."),
					v.email("Enter a valid email address.")
				),
			})
		),
	});
</script>

<script lang="ts">
	import XIcon from "@lucide/svelte/icons/x";
	import {
		createForm,
		Field as FormischField,
		FieldArray,
		Form,
		insert,
		remove,
		reset,
	} from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import type { SubmitEventHandler } from "@formisch/svelte";

	const form = createForm({
		schema: FormSchema,
		initialInput: { emails: [{ address: "" }, { address: "" }] },
	});
	const handleSubmit: SubmitEventHandler<typeof FormSchema> = (output) => {
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header class="border-b">
		<Card.Title>Contact Emails</Card.Title>
		<Card.Description>Manage your contact email addresses.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form of={form} id="form-formisch-array" onsubmit={handleSubmit}>
			<FieldArray of={form} path={["emails"] as never}>
				{#snippet children(fieldArray)}
					<Field.Set class="gap-4">
						<Field.Legend variant="label">Email Addresses</Field.Legend>
						<Field.Description>
							Add up to 5 email addresses where we can contact you.
						</Field.Description>
						<Field.Group class="gap-4">
							{#each fieldArray.items as item, index (item)}
								<FormischField of={form} path={["emails", index, "address"] as never}>
									{#snippet children(field)}
										<Field.Field orientation="horizontal" data-invalid={field.errors !== null}>
											<Field.Content>
												<InputGroup.Root>
													<InputGroup.Input
														{...field.props}
														id={`form-formisch-array-email-${index}`}
														value={field.input ?? ""}
														aria-invalid={field.errors !== null}
														placeholder="name@example.com"
														type="email"
														autocomplete="email"
													/>
													{#if fieldArray.items.length > 1}
														<InputGroup.Addon align="inline-end">
															<InputGroup.Button
																type="button"
																size="icon-xs"
																onclick={() =>
																	remove(form, { path: ["emails"] as never, at: index })}
																aria-label={`Remove email ${index + 1}`}
															>
																<XIcon />
															</InputGroup.Button>
														</InputGroup.Addon>
													{/if}
												</InputGroup.Root>
												{#if field.errors}
													<Field.Error
														errors={field.errors.map((message: string) => ({ message }))}
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
										path: ["emails"] as never,
										initialInput: { address: "" } as never,
									})}
								disabled={fieldArray.items.length >= 5}
							>
								Add Email Address
							</Button>
						</Field.Group>
						{#if fieldArray.errors}
							<Field.Error errors={fieldArray.errors.map((message: string) => ({ message }))} />
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
