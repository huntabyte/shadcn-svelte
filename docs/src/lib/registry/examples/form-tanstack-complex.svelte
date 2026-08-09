<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import { z } from "zod";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	const addons = [
		{ id: "analytics", label: "Analytics" },
		{ id: "support", label: "Priority support" },
	];
	const form = createForm(() => ({
		defaultValues: { plan: "basic", annual: false, addons: [] as string[] },
		validators: {
			onSubmit: z.object({
				plan: z.enum(["basic", "pro"]),
				annual: z.boolean(),
				addons: z.array(z.string()),
			}),
		},
		onSubmit: ({ value }) => toast.success(`You submitted ${JSON.stringify(value, null, 2)}`),
	}));
</script>

<form
	class="w-full max-w-lg"
	onsubmit={(event) => {
		event.preventDefault();
		form.handleSubmit();
	}}
>
	<Field.Group
		><form.Field name="plan"
			>{#snippet children(field)}<Field.Set
					><Field.Legend>Plan</Field.Legend><RadioGroup.Root
						value={field.state.value}
						onValueChange={(value) => field.handleChange(value)}
						><Field.Label for="tanstack-complex-basic"
							><Field.Field orientation="horizontal"
								><Field.Content
									><Field.Title>Basic</Field.Title><Field.Description
										>For individuals.</Field.Description
									></Field.Content
								><RadioGroup.Item id="tanstack-complex-basic" value="basic" /></Field.Field
							></Field.Label
						><Field.Label for="tanstack-complex-pro"
							><Field.Field orientation="horizontal"
								><Field.Content
									><Field.Title>Pro</Field.Title><Field.Description
										>For growing teams.</Field.Description
									></Field.Content
								><RadioGroup.Item id="tanstack-complex-pro" value="pro" /></Field.Field
							></Field.Label
						></RadioGroup.Root
					></Field.Set
				>{/snippet}</form.Field
		><form.Field name="annual"
			>{#snippet children(field)}<Field.Field orientation="horizontal"
					><Field.Content
						><Field.Label for="tanstack-complex-annual">Annual billing</Field.Label
						><Field.Description>Save with annual billing.</Field.Description></Field.Content
					><Switch
						id="tanstack-complex-annual"
						checked={field.state.value}
						onCheckedChange={(value) => field.handleChange(value)}
					/></Field.Field
				>{/snippet}</form.Field
		><form.Field name="addons"
			>{#snippet children(field)}<Field.Set
					><Field.Legend>Add-ons</Field.Legend>{#each addons as addon (addon.id)}<Field.Field
							orientation="horizontal"
							><Checkbox
								id={`tanstack-complex-${addon.id}`}
								checked={field.state.value.includes(addon.id)}
								onCheckedChange={(checked) =>
									field.handleChange(
										checked
											? [...field.state.value, addon.id]
											: field.state.value.filter((value) => value !== addon.id)
									)}
							/><Field.Label for={`tanstack-complex-${addon.id}`}>{addon.label}</Field.Label
							></Field.Field
						>{/each}</Field.Set
				>{/snippet}</form.Field
		><Button type="submit">Continue</Button></Field.Group
	>
</form>
