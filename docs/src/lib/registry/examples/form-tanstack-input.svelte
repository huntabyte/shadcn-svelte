<script lang="ts" module>
	import { z } from "zod";

	const formSchema = z.object({
		username: z
			.string()
			.min(3, "Username must be at least 3 characters.")
			.max(10, "Username must be at most 10 characters.")
			.regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores."),
	});
</script>

<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	const form = createForm(() => ({
		defaultValues: {
			username: "",
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
		<Card.Title>Profile Settings</Card.Title>
		<Card.Description>Update your profile information below.</Card.Description>
	</Card.Header>
	<Card.Content>
		<form
			id="form-tanstack-input"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<form.Field name="username">
					{#snippet children(field)}
						{@const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid}
						<Field.Field data-invalid={isInvalid ? true : undefined}>
							<Field.Label for="form-tanstack-input-username">Username</Field.Label>
							<Input
								id="form-tanstack-input-username"
								name={field.name}
								value={field.state.value}
								onblur={field.handleBlur}
								oninput={(e) => field.handleChange(e.currentTarget.value)}
								aria-invalid={isInvalid}
								placeholder="shadcn"
								autocomplete="username"
							/>
							<Field.Description>
								This is your public display name. Must be between 3 and 10 characters. Must only
								contain letters, numbers, and underscores.
							</Field.Description>
							{#if isInvalid}
								<Field.Error errors={field.state.meta.errors} />
							{/if}
						</Field.Field>
					{/snippet}
				</form.Field>
			</Field.Group>
		</form>
	</Card.Content>
	<Card.Footer>
		<Field.Field orientation="horizontal">
			<Button type="button" variant="outline" onclick={() => form.reset()}>Reset</Button>
			<Button type="submit" form="form-tanstack-input">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
