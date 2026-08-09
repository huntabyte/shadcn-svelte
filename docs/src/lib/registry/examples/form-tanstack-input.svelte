<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import { z } from "zod";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	const schema = z.object({
		username: z.string().min(3, "Username must be at least 3 characters.").max(10),
	});
	const form = createForm(() => ({
		defaultValues: { username: "" },
		validators: { onSubmit: schema },
		onSubmit: ({ value }) => toast.success(`You submitted ${JSON.stringify(value, null, 2)}`),
	}));
</script>

<Card.Root class="w-full sm:max-w-md">
	<Card.Header
		><Card.Title>Profile Settings</Card.Title><Card.Description
			>Update your profile information below.</Card.Description
		></Card.Header
	>
	<Card.Content>
		<form
			id="form-tanstack-input"
			onsubmit={(event) => {
				event.preventDefault();
				form.handleSubmit();
			}}
		>
			<form.Field name="username">
				{#snippet children(field)}
					<Field.Field data-invalid={field.state.meta.isTouched && !field.state.meta.isValid}>
						<Field.Label for="form-tanstack-input-username">Username</Field.Label>
						<Input
							id="form-tanstack-input-username"
							name={field.name}
							value={field.state.value}
							onblur={field.handleBlur}
							oninput={(event) => field.handleChange(event.currentTarget.value)}
							placeholder="shadcn"
							autocomplete="username"
						/>
						<Field.Description>This is your public display name.</Field.Description>
						{#if field.state.meta.isTouched && !field.state.meta.isValid}<Field.Error
								errors={field.state.meta.errors.filter((error) => error !== undefined)}
							/>{/if}
					</Field.Field>
				{/snippet}
			</form.Field>
		</form>
	</Card.Content>
	<Card.Footer
		><Field.Field orientation="horizontal"
			><Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button><Button
				type="submit"
				form="form-tanstack-input">Save</Button
			></Field.Field
		></Card.Footer
	>
</Card.Root>
