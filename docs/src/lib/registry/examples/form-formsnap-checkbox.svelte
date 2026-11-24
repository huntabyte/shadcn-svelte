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
	import { toast } from "svelte-sonner";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import * as Form from "$lib/components/forms/formsnap/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";

	const form = superForm(defaults({ responses: true, tasks: [] }, zod4(formSchema)), {
		validators: zod4(formSchema),
		SPA: true,
		onUpdate: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error("Please fix the errors in the form.");
			}
		},
	});

	const { form: formData, enhance, reset } = form;

	function toggleTask(id: string, checked: boolean) {
		if (checked) {
			$formData.tasks = [...$formData.tasks, id];
		} else {
			$formData.tasks = $formData.tasks.filter((task) => task !== id);
		}
	}
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Notifications</Card.Title>
		<Card.Description>Manage your notification preferences.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form id="form-formsnap-checkbox" method="POST" use:enhance>
			<Field.Group>
				<Form.Field {form} name="responses">
					<Field.Set>
						<Field.Legend variant="label">Responses</Field.Legend>
						<Field.Description>
							Get notified for requests that take time, like research or image generation.
						</Field.Description>
						<Field.Group data-slot="checkbox-group">
							<Field.Field orientation="horizontal">
								<Form.Control>
									{#snippet children({ props })}
										<Checkbox {...props} bind:checked={$formData.responses} disabled />
										<Form.Label class="font-normal">Push notifications</Form.Label>
									{/snippet}
								</Form.Control>
							</Field.Field>
						</Field.Group>
					</Field.Set>
				</Form.Field>
				<Field.Separator />
				<Form.Fieldset {form} name="tasks">
					{#snippet children({ errors })}
						<Form.Legend variant="label">Tasks</Form.Legend>
						<Form.Description>Get notified when tasks you've created have updates.</Form.Description
						>
						<Field.Group data-slot="checkbox-group">
							{#each tasks as task, i (task.id)}
								<Form.ElementField
									{form}
									name="tasks[{i}]"
									orientation="horizontal"
									data-invalid={errors.length > 0 ? true : undefined}
								>
									<Form.Control>
										{#snippet children({ props })}
											<Checkbox
												{...props}
												aria-invalid={errors.length > 0}
												value={task.id}
												checked={$formData.tasks.includes(task.id)}
												onCheckedChange={(checked) => toggleTask(task.id, checked)}
											/>
											<Form.Label class="font-normal">{task.label}</Form.Label>
										{/snippet}
									</Form.Control>
								</Form.ElementField>
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
			<Button type="button" variant="outline" onclick={() => reset()}>Reset</Button>
			<Button type="submit" form="form-formsnap-checkbox">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
