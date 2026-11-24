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
				<form.Field name="responses">
					{#snippet children(field)}
						{@const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid}
						<div>
							<Field.Set>
								<Field.Legend variant="label">Responses</Field.Legend>
								<Field.Description>
									Get notified for requests that take time, like research or image generation.
								</Field.Description>
								<Field.Group data-slot="checkbox-group">
									<Field.Field orientation="horizontal" data-invalid={isInvalid ? true : undefined}>
										<Checkbox
											id="form-tanstack-checkbox-responses"
											name={field.name}
											checked={field.state.value}
											onCheckedChange={field.handleChange}
											disabled
										/>
										<Field.Label for="form-tanstack-checkbox-responses" class="font-normal">
											Push notifications
										</Field.Label>
									</Field.Field>
								</Field.Group>
							</Field.Set>
							{#if isInvalid}
								<Field.Error errors={field.state.meta.errors} />
							{/if}
						</div>
					{/snippet}
				</form.Field>
				<Field.Separator />
				<form.Field name="tasks" mode="array">
					{#snippet children(field)}
						{@const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid}
						<Field.Group>
							<Field.Set data-invalid={isInvalid ? true : undefined}>
								<Field.Legend variant="label">Tasks</Field.Legend>
								<Field.Description>
									Get notified when tasks you've created have updates.
								</Field.Description>
								<Field.Group data-slot="checkbox-group">
									{#each tasks as task (task.id)}
										<Field.Field
											orientation="horizontal"
											data-invalid={isInvalid ? true : undefined}
										>
											<Checkbox
												id="form-tanstack-checkbox-{task.id}"
												name={field.name}
												aria-invalid={isInvalid}
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
											<Field.Label for="form-tanstack-checkbox-{task.id}" class="font-normal">
												{task.label}
											</Field.Label>
										</Field.Field>
									{/each}
								</Field.Group>
							</Field.Set>
							{#if isInvalid}
								<Field.Error errors={field.state.meta.errors} />
							{/if}
						</Field.Group>
					{/snippet}
				</form.Field>
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
