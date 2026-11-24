<script lang="ts" module>
	import { z } from "zod";

	const formSchema = z.object({
		about: z
			.string()
			.min(10, "Please provide at least 10 characters.")
			.max(200, "Please keep it under 200 characters."),
	});
</script>

<script lang="ts">
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";

	const form = createForm(() => ({
		defaultValues: {
			about: "",
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
		<Card.Title>Personalization</Card.Title>
		<Card.Description>Customize your experience by telling us more about yourself.</Card.Description
		>
	</Card.Header>
	<Card.Content>
		<form
			id="form-tanstack-textarea"
			onsubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<Field.Group>
				<form.Field name="about">
					{#snippet children(field)}
						{@const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid}
						<Field.Field data-invalid={isInvalid ? true : undefined}>
							<Field.Label for="form-tanstack-textarea-about">More about you</Field.Label>
							<Textarea
								id="form-tanstack-textarea-about"
								name={field.name}
								value={field.state.value}
								onblur={field.handleBlur}
								oninput={(e) => field.handleChange(e.currentTarget.value)}
								aria-invalid={isInvalid}
								placeholder="I'm a software engineer..."
								class="min-h-[120px]"
							/>
							<Field.Description>
								Tell us more about yourself. This will be used to help us personalize your
								experience.
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
			<Button type="submit" form="form-tanstack-textarea">Save</Button>
		</Field.Field>
	</Card.Footer>
</Card.Root>
