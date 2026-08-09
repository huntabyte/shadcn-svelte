<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import { z } from "zod";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	const plans = [
		{ value: "basic", label: "Basic", description: "Essential features for personal use." },
		{ value: "pro", label: "Pro", description: "Advanced features for growing teams." },
	];
	const form = createForm(() => ({
		defaultValues: { plan: "" },
		validators: { onSubmit: z.object({ plan: z.enum(["basic", "pro"]) }) },
		onSubmit: ({ value }) => toast.success(`You submitted ${JSON.stringify(value)}`),
	}));
</script>

<Card.Root class="w-full sm:max-w-md"
	><Card.Header
		><Card.Title>Subscription</Card.Title><Card.Description>Select a plan.</Card.Description
		></Card.Header
	><Card.Content
		><form
			id="form-tanstack-radiogroup"
			onsubmit={(event) => {
				event.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field name="plan"
				>{#snippet children(field)}<Field.Set
						><Field.Legend variant="label">Plan</Field.Legend><RadioGroup.Root
							value={field.state.value}
							onValueChange={(value) => field.handleChange(value)}
							>{#each plans as plan (plan.value)}<Field.Label
									for={`form-tanstack-plan-${plan.value}`}
									><Field.Field orientation="horizontal"
										><Field.Content
											><Field.Title>{plan.label}</Field.Title><Field.Description
												>{plan.description}</Field.Description
											></Field.Content
										><RadioGroup.Item
											id={`form-tanstack-plan-${plan.value}`}
											value={plan.value}
										/></Field.Field
									></Field.Label
								>{/each}</RadioGroup.Root
						>{#if field.state.meta.isTouched && !field.state.meta.isValid}<Field.Error
								errors={field.state.meta.errors.filter((error) => error !== undefined)}
							/>{/if}</Field.Set
					>{/snippet}</form.Field
			>
		</form></Card.Content
	><Card.Footer
		><Field.Field orientation="horizontal"
			><Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button><Button
				type="submit"
				form="form-tanstack-radiogroup">Save</Button
			></Field.Field
		></Card.Footer
	></Card.Root
>
