<script lang="ts" module>
	import * as v from "valibot";

	const tasks = [
		{ id: "push", label: "Push notifications" },
		{ id: "email", label: "Email notifications" },
	];

	const FormSchema = v.object({
		responses: v.boolean(),
		tasks: v.pipe(
			v.array(v.string()),
			v.minLength(1, "Please select at least one notification type."),
			v.check(
				(value) => value.every((task) => tasks.some((t) => t.id === task)),
				"Invalid notification type selected."
			)
		),
	});
</script>

<script lang="ts">
	import { createForm, reset, type SubmitHandler } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Form from "$lib/components/forms/formisch/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";

	const form = createForm({
		schema: FormSchema,
		initialInput: { responses: true, tasks: [] },
	});

	const onsubmit: SubmitHandler<typeof FormSchema> = (output) => {
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Notifications</Card.Title>
		<Card.Description>Manage your notification preferences.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form.Root of={form} {onsubmit} id="form-formisch-checkbox">
			<Field.Group>
				<Form.Field of={form} path={["responses"]}>
					{#snippet children(field)}
						<Field.Set>
							<Field.Legend variant="label">Responses</Field.Legend>
							<Field.Description>
								Get notified for requests that take time, like research or image generation.
							</Field.Description>
							<Field.Group data-slot="checkbox-group">
								<Field.Field orientation="horizontal">
									<Form.Control custom>
										{#snippet children({ props })}
											<Checkbox
												{...props}
												checked={field.input ?? false}
												onCheckedChange={(checked) => field.onInput(checked)}
												disabled
											/>
											<Form.Label class="font-normal">Push notifications</Form.Label>
										{/snippet}
									</Form.Control>
								</Field.Field>
							</Field.Group>
						</Field.Set>
					{/snippet}
				</Form.Field>
				<Field.Separator />
				<Form.Fieldset of={form} path={["tasks"]}>
					{#snippet children(field)}
						<Field.Legend variant="label">Tasks</Field.Legend>
						<Field.Description
							>Get notified when tasks you've created have updates.</Field.Description
						>
						<Field.Group data-slot="checkbox-group">
							{#each tasks as task (task.id)}
								<Field.Field
									orientation="horizontal"
									data-invalid={field.errors ? true : undefined}
								>
									<Form.Control custom>
										{#snippet children({ props })}
											<Checkbox
												{...props}
												value={task.id}
												checked={field.input?.includes(task.id)}
												onCheckedChange={(checked) => {
													const current = field.input ?? [];
													field.onInput(
														checked
															? [...current, task.id]
															: current.filter((item) => item !== task.id)
													);
												}}
											/>
											<Form.Label class="font-normal">{task.label}</Form.Label>
										{/snippet}
									</Form.Control>
								</Field.Field>
							{/each}
						</Field.Group>
						<Form.FieldErrors />
					{/snippet}
				</Form.Fieldset>
			</Field.Group>
		</Form.Root>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-checkbox">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
