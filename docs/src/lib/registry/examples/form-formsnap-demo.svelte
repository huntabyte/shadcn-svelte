<script lang="ts" module>
	import { z } from "zod";

	const formSchema = z.object({
		title: z
			.string()
			.min(5, "Bug title must be at least 5 characters.")
			.max(32, "Bug title must be at most 32 characters."),
		description: z
			.string()
			.min(20, "Description must be at least 20 characters.")
			.max(100, "Description must be at most 100 characters."),
	});
</script>

<script lang="ts">
	import * as Formsnap from "formsnap";
	import { toast } from "svelte-sonner";
	import { defaults, superForm } from "sveltekit-superforms";
	import { zod4 } from "sveltekit-superforms/adapters";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";

	const form = superForm(defaults(zod4(formSchema)), {
		validators: zod4(formSchema),
		SPA: true,
		onUpdate: ({ form: f }) => {
			if (f.valid) {
				toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
			} else {
				toast.error("Please fix the errors in the form.");
			}
		},
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" class="w-full max-w-sm" use:enhance>
	<Field.Group>
		<Formsnap.Field {form} name="title">
			{#snippet children({ errors })}
				<Field.Field data-invalid={errors.length > 0}>
					<Formsnap.Control>
						{#snippet children({ props })}
							<Formsnap.Label>
								{#snippet child({ props: labelProps })}
									<Field.Label {...labelProps}>Bug Title</Field.Label>
								{/snippet}
							</Formsnap.Label>
							<Input
								{...props}
								bind:value={$formData.title}
								placeholder="Login button not working on mobile"
								autocomplete="off"
							/>
						{/snippet}
					</Formsnap.Control>
					<Formsnap.Description>
						{#snippet child({ props })}
							<Field.Description {...props}>
								Provide a concise title for your bug report.
							</Field.Description>
						{/snippet}
					</Formsnap.Description>
					<Formsnap.FieldErrors>
						{#snippet child({ props, errors })}
							<Field.Error {...props} errors={errors.map((message) => ({ message }))} />
						{/snippet}
					</Formsnap.FieldErrors>
				</Field.Field>
			{/snippet}
		</Formsnap.Field>
		<Formsnap.Field {form} name="description">
			{#snippet children({ errors })}
				<Field.Field data-invalid={errors.length > 0}>
					<Formsnap.Control>
						{#snippet children({ props })}
							<Formsnap.Label>
								{#snippet child({ props: labelProps })}
									<Field.Label {...labelProps}>Description</Field.Label>
								{/snippet}
							</Formsnap.Label>
							<Textarea
								{...props}
								bind:value={$formData.description}
								placeholder="I'm having an issue with the login button on mobile."
								class="min-h-24 resize-none"
							/>
						{/snippet}
					</Formsnap.Control>
					<Formsnap.Description>
						{#snippet child({ props })}
							<Field.Description {...props}>
								Include steps to reproduce, expected behavior, and what actually happened.
							</Field.Description>
						{/snippet}
					</Formsnap.Description>
					<Formsnap.FieldErrors>
						{#snippet child({ props, errors })}
							<Field.Error {...props} errors={errors.map((message) => ({ message }))} />
						{/snippet}
					</Formsnap.FieldErrors>
				</Field.Field>
			{/snippet}
		</Formsnap.Field>
		<Field.Field orientation="horizontal">
			<Button type="submit">Submit</Button>
		</Field.Field>
	</Field.Group>
</form>
