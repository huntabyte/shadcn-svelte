<script lang="ts" module>
	import * as v from "valibot";

	const tasks = [
		{ id: "push", label: "Push notifications" },
		{ id: "email", label: "Email notifications" },
	] as const;

	const FormSchema = v.object({
		responses: v.boolean(),
		tasks: v.pipe(
			v.array(v.string()),
			v.minLength(1, "Please select at least one notification type."),
			v.check(
				(value) => value.every((task) => tasks.some((item) => item.id === task)),
				"Invalid notification type selected."
			)
		),
	});
</script>

<script lang="ts">
	import { createForm, Field as FormischField, Form, reset } from "@formisch/svelte";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import type { SubmitEventHandler } from "@formisch/svelte";

	const form = createForm({
		schema: FormSchema,
		initialInput: { responses: true, tasks: [] },
	});
	const handleSubmit: SubmitEventHandler<typeof FormSchema> = (output) => {
		toast.success(`You submitted ${JSON.stringify(output, null, 2)}`);
	};
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header>
		<Card.Title>Notifications</Card.Title>
		<Card.Description>Manage your notification preferences.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Form of={form} id="form-formisch-checkbox" onsubmit={handleSubmit}>
			<Field.Group>
				<FormischField of={form} path={["responses"]}>
					{#snippet children(field)}
						<Field.Set data-invalid={field.errors !== null}>
							<Field.Legend variant="label">Responses</Field.Legend>
							<Field.Description>
								Get notified for requests that take time, like research or image generation.
							</Field.Description>
							<Field.Group data-slot="checkbox-group">
								<Field.Field orientation="horizontal">
									<Checkbox
										id="form-formisch-checkbox-responses"
										checked={field.input ?? false}
										disabled
									/>
									<Field.Label for="form-formisch-checkbox-responses" class="font-normal">
										Push notifications
									</Field.Label>
								</Field.Field>
							</Field.Group>
						</Field.Set>
					{/snippet}
				</FormischField>
				<Field.Separator />
				<FormischField of={form} path={["tasks"]}>
					{#snippet children(field)}
						<Field.Group>
							<Field.Set data-invalid={field.errors !== null}>
								<Field.Legend variant="label">Tasks</Field.Legend>
								<Field.Description>
									Get notified when tasks you've created have updates.
								</Field.Description>
								<Field.Group data-slot="checkbox-group">
									{#each tasks as task (task.id)}
										<Field.Field orientation="horizontal" data-invalid={field.errors !== null}>
											<Checkbox
												id={`form-formisch-checkbox-${task.id}`}
												aria-invalid={field.errors !== null}
												checked={(field.input ?? []).includes(task.id)}
												onCheckedChange={(checked) => {
													const current = field.input ?? [];
													field.onInput(
														checked
															? [...current, task.id]
															: current.filter((value: string) => value !== task.id)
													);
												}}
											/>
											<Field.Label for={`form-formisch-checkbox-${task.id}`} class="font-normal">
												{task.label}
											</Field.Label>
										</Field.Field>
									{/each}
								</Field.Group>
							</Field.Set>
							{#if field.errors}
								<Field.Error errors={field.errors.map((message: string) => ({ message }))} />
							{/if}
						</Field.Group>
					{/snippet}
				</FormischField>
			</Field.Group>
		</Form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => reset(form)}>Reset</Button>
			<Button type="submit" form="form-formisch-checkbox">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
