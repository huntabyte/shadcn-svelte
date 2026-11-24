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
	import { toast } from "svelte-sonner";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import * as Form from "$lib/components/forms/formsnap/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const form = superForm(defaults({ emails: [{ address: "" }] }, zod4(formSchema)), {
		validators: zod4(formSchema),
		SPA: true,
		dataType: "json",
		onUpdate: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error("Please fix the errors in the form.");
			}
		},
	});

	const { form: formData, enhance, reset } = form;

	function addEmail() {
		$formData.emails = [...$formData.emails, { address: "" }];
	}

	function removeEmail(index: number) {
		$formData.emails = $formData.emails.filter((_, i) => i !== index);
	}
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header class="border-b">
		<Card.Title>Contact Emails</Card.Title>
		<Card.Description>Manage your contact email addresses.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form id="form-formsnap-array" method="POST" use:enhance>
			<Field.Group>
				<Form.Fieldset {form} name="emails" class="gap-4">
					<Form.Legend variant="label">Email Addresses</Form.Legend>
					<Form.Description>Add up to 5 email addresses where we can contact you.</Form.Description>
					<Field.Group class="gap-4">
						{#each $formData.emails as _, i (i)}
							<Form.Field {form} name="emails[{i}].address" orientation="horizontal">
								<Form.Control>
									{#snippet children({ props })}
										<Field.Content>
											<InputGroup.Root>
												<InputGroup.Input
													{...props}
													bind:value={$formData.emails[i].address}
													aria-label="Email {i + 1}"
													placeholder="name@example.com"
													type="email"
													autocomplete="email"
												/>
												{#if $formData.emails.length > 1}
													<InputGroup.Addon align="inline-end">
														<InputGroup.Button
															type="button"
															variant="ghost"
															size="icon-xs"
															onclick={() => removeEmail(i)}
															aria-label="Remove email {i + 1}"
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
							</Form.Field>
						{/each}
						<Button
							type="button"
							variant="outline"
							size="sm"
							onclick={addEmail}
							disabled={$formData.emails.length >= 5}
						>
							Add Email Address
						</Button>
					</Field.Group>
					<Form.FieldErrors />
				</Form.Fieldset>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer class="border-t">
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset()}>Reset</Button>
			<Button type="submit" form="form-formsnap-array">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
