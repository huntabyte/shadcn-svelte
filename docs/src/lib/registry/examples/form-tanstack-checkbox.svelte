<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import { z } from "zod";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	const options = [
		{ id: "email", label: "Email" },
		{ id: "push", label: "Push notifications" },
		{ id: "sms", label: "Text messages" },
	];
	const form = createForm(() => ({
		defaultValues: { notifications: [] as string[] },
		validators: {
			onSubmit: z.object({
				notifications: z.array(z.string()).min(1, "Select at least one notification type."),
			}),
		},
		onSubmit: ({ value }) => toast.success(`You submitted ${JSON.stringify(value)}`),
	}));
</script>

<Card.Root class="w-full sm:max-w-md"
	><Card.Header
		><Card.Title>Notifications</Card.Title><Card.Description
			>Choose how we should contact you.</Card.Description
		></Card.Header
	><Card.Content>
		<form
			id="form-tanstack-checkbox"
			onsubmit={(event) => {
				event.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field name="notifications"
				>{#snippet children(field)}<Field.Set
						><Field.Legend variant="label">Notify me about</Field.Legend><Field.Group
							>{#each options as option (option.id)}<Field.Field orientation="horizontal"
									><Checkbox
										id={`form-tanstack-${option.id}`}
										checked={field.state.value.includes(option.id)}
										onCheckedChange={(checked) =>
											field.handleChange(
												checked
													? [...field.state.value, option.id]
													: field.state.value.filter((value) => value !== option.id)
											)}
									/><Field.Label for={`form-tanstack-${option.id}`} class="font-normal"
										>{option.label}</Field.Label
									></Field.Field
								>{/each}</Field.Group
						>{#if field.state.meta.isTouched && !field.state.meta.isValid}<Field.Error
								errors={field.state.meta.errors.filter((error) => error !== undefined)}
							/>{/if}</Field.Set
					>{/snippet}</form.Field
			>
		</form>
	</Card.Content><Card.Footer
		><Field.Field orientation="horizontal"
			><Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button><Button
				type="submit"
				form="form-tanstack-checkbox">Save</Button
			></Field.Field
		></Card.Footer
	></Card.Root
>
