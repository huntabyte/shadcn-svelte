<script lang="ts" module>
	import { z } from "zod";

	const tasks = [
		{ id: "push", label: "Push notifications" },
		{ id: "email", label: "Email notifications" },
	];

	const formSchema = z.object({
		responses: z.boolean(),
		tasks: z
			.array(z.string())
			.min(1, "Please select at least one notification type.")
			.refine((value) => value.every((task) => tasks.some((t) => t.id === task)), {
				message: "Invalid notification type selected.",
			}),
	});
</script>

<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/forms/tanstack/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";

	const form = createForm(() => ({
		defaultValues: {
			responses: true,
			tasks: [] as string[],
		},
		validators: {
			onSubmit: formSchema,
		},
		onSubmit: async ({ value }) => {
			toast.success(`You submitted ${JSON.stringify(value, null, 2)}`);
		},
	}));
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Notifications</Card.Title>
		<Card.Description>Manage your notification preferences.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			id="form-tanstack-checkbox"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<Form.Fieldset of={form} name="responses">
					{#snippet children(field)}
						<Form.Legend variant="label">Responses</Form.Legend>
						<Form.Description>
							Get notified for requests that take time, like research or image generation.
						</Form.Description>
						<Field.Group data-slot="checkbox-group">
							<Form.Control>
								{#snippet children({ props })}
									<Field.Field
										orientation="horizontal"
										data-invalid={props["aria-invalid"] ? true : undefined}
									>
										<Checkbox
											{...props}
											bind:checked={() => field.state.value, field.handleChange}
											disabled
										/>
										<Form.Label class="font-normal">Push notifications</Form.Label>
									</Field.Field>
								{/snippet}
							</Form.Control>
						</Field.Group>
						<Form.FieldErrors />
					{/snippet}
				</Form.Fieldset>
				<Field.Separator />
				<Form.Fieldset of={form} name="tasks" mode="array">
					{#snippet children(field)}
						<Form.Legend variant="label">Tasks</Form.Legend>
						<Form.Description>Get notified when tasks you've created have updates.</Form.Description
						>
						<Field.Group data-slot="checkbox-group">
							{#each tasks as task (task.id)}
								<Form.Control>
									{#snippet children({ props })}
										<Field.Field
											orientation="horizontal"
											data-invalid={props["aria-invalid"] ? true : undefined}
										>
											<Checkbox
												{...props}
												value={task.id}
												checked={field.state.value.includes(task.id)}
												onCheckedChange={(checked) => {
													if (checked) {
														field.pushValue(task.id);
													} else {
														const index = field.state.value.indexOf(task.id);
														if (index > -1) {
															field.removeValue(index);
														}
													}
												}}
											/>
											<Form.Label class="font-normal">{task.label}</Form.Label>
										</Field.Field>
									{/snippet}
								</Form.Control>
							{/each}
						</Field.Group>
						<Form.FieldErrors />
					{/snippet}
				</Form.Fieldset>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button>
			<Button type="submit" form="form-tanstack-checkbox">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
