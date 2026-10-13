<script lang="ts">
	import * as z from "zod";
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import FormSubmittedValues from "./form-submitted-values.svelte";
	const tasks = [
		{
			id: "push",
			label: "Push notifications",
		},
		{
			id: "email",
			label: "Email notifications",
		},
	] as const;
	const formSchema = z.object({
		responses: z.boolean(),
		tasks: z
			.array(z.string())
			.min(1, "Please select at least one notification type.")
			.refine((value) => value.every((task) => tasks.some((t) => t.id === task)), {
				message: "Invalid notification type selected.",
			}),
	});
	const form = createForm(() => ({
		defaultValues: {
			responses: true,
			tasks: [] as string[],
		},
		validators: [{ run: formSchema, triggers: [] }],
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
	<Card.Header>
		<Card.Title>Notifications</Card.Title>
		<Card.Description>Manage your notification preferences.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			novalidate
			id="form-tanstack-checkbox"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<form.Field name="responses">
					{#snippet children(field)}
						{@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
						<div>
							<Field.Set>
								<Field.Legend variant="label">Responses</Field.Legend>
								<Field.Description>
									Get notified for requests that take time, like research or image generation.
								</Field.Description>
								<Field.Group data-slot="checkbox-group">
									<Field.Field orientation="horizontal" data-invalid={isInvalid}>
										<Checkbox
											id="form-tanstack-checkbox-responses"
											name={field.name}
											checked={field.value}
											onCheckedChange={(checked) => field.handleChange(checked === true)}
											disabled
										/>
										<Field.Label for="form-tanstack-checkbox-responses" class="font-normal">
											Push notifications
										</Field.Label>
									</Field.Field>
								</Field.Group>
							</Field.Set>
							{#if isInvalid}
								<Field.Error errors={field.meta.errors} />
							{/if}
						</div>
					{/snippet}
				</form.Field>
				<Field.Separator />
				<form.Field name="tasks">
					{#snippet children(field)}
						{@const isInvalid = field.meta.isTouched && field.meta.isInvalid}
						<Field.Group>
							<Field.Set data-invalid={isInvalid}>
								<Field.Legend variant="label">Tasks</Field.Legend>
								<Field.Description>
									Get notified when tasks you&apos;ve created have updates.
								</Field.Description>
								<Field.Group data-slot="checkbox-group">
									{#each tasks as task (task.id)}
										<Field.Field orientation="horizontal" data-invalid={isInvalid}>
											<Checkbox
												id={`form-tanstack-checkbox-${task.id}`}
												name={field.name}
												aria-invalid={isInvalid}
												checked={field.value.includes(task.id)}
												onCheckedChange={(checked) => {
													if (checked) {
														field.pushValue(task.id);
													} else {
														const index = field.value.indexOf(task.id);
														if (index > -1) {
															field.removeValue(index);
														}
													}
												}}
											/>
											<Field.Label for={`form-tanstack-checkbox-${task.id}`} class="font-normal">
												{task.label}
											</Field.Label>
										</Field.Field>
									{/each}
								</Field.Group>
							</Field.Set>
							{#if isInvalid}
								<Field.Error errors={field.meta.errors} />
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
