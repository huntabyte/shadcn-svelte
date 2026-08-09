<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import { z } from "zod";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	const form = createForm(() => ({
		defaultValues: { twoFactor: false },
		validators: { onSubmit: z.object({ twoFactor: z.boolean() }) },
		onSubmit: ({ value }) => toast.success(`You submitted ${JSON.stringify(value)}`),
	}));
</script>

<Card.Root class="w-full sm:max-w-md"
	><Card.Header
		><Card.Title>Security Settings</Card.Title><Card.Description
			>Manage your account security.</Card.Description
		></Card.Header
	><Card.Content>
		<form
			id="form-tanstack-switch"
			onsubmit={(event) => {
				event.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field name="twoFactor"
				>{#snippet children(field)}<Field.Field orientation="horizontal"
						><Field.Content
							><Field.Label for="form-tanstack-two-factor">Multi-factor authentication</Field.Label
							><Field.Description>Add an extra layer of security.</Field.Description></Field.Content
						><Switch
							id="form-tanstack-two-factor"
							checked={field.state.value}
							onCheckedChange={(value) => field.handleChange(value)}
						/></Field.Field
					>{/snippet}</form.Field
			>
		</form>
	</Card.Content><Card.Footer
		><Field.Field orientation="horizontal"
			><Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button><Button
				type="submit"
				form="form-tanstack-switch">Save</Button
			></Field.Field
		></Card.Footer
	></Card.Root
>
