<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import { z } from "zod";
	import type { FormEventHandler } from "svelte/elements";

	const exampleFormSchema = z.object({
		name: z.string().min(1),
		email: z.string().email(),
		message: z.string().min(1),
	});

	let pending = $state(false);
	let formState = $state({
		defaultValues: {
			name: "",
			email: "",
			message: "",
		},
		success: false,
		errors: {
			name: "",
			email: "",
			message: "",
		},
	});

	const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();
		pending = true;
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData);
		const result = exampleFormSchema.safeParse(data);

		if (!result.success) {
			formState = {
				...formState,
				errors: Object.fromEntries(
					Object.entries(result.error.flatten().fieldErrors).map(([key, value]) => [
						key,
						value?.[0] ?? "",
					])
				) as Record<keyof typeof formState.errors, string>,
			};
			pending = false;
			return;
		}

		pending = false;
	};
</script>

<form onsubmit={handleSubmit} class="w-full max-w-sm">
	<Card.Root>
		<Card.Header>
			<Card.Title>How can we help?</Card.Title>
			<Card.Description>
				Need help with your project? We&apos;re here to assist you.
			</Card.Description>
		</Card.Header>
		<Card.Content class="flex flex-col gap-6">
			<div class="group/field grid gap-2" data-invalid={!!formState.errors?.name}>
				<Label for="name" class="group-data-[invalid=true]/field:text-destructive">
					Name <span aria-hidden="true">*</span>
				</Label>
				<Input
					id="name"
					name="name"
					placeholder="Lee Robinson"
					class="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
					disabled={pending}
					aria-invalid={!!formState.errors?.name}
					aria-errormessage="error-name"
					defaultValue={formState.defaultValues.name}
				/>
				{#if formState.errors.name}
					<p id="error-name" class="text-destructive text-sm">
						{formState.errors.name}
					</p>
				{/if}
			</div>
			<div class="group/field grid gap-2" data-invalid={!!formState.errors?.email}>
				<Label for="email" class="group-data-[invalid=true]/field:text-destructive">
					Email <span aria-hidden="true">*</span>
				</Label>
				<Input
					id="email"
					name="email"
					placeholder="leerob@acme.com"
					class="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
					disabled={pending}
					aria-invalid={!!formState.errors?.email}
					aria-errormessage="error-email"
					defaultValue={formState.defaultValues.email}
				/>
				{#if formState.errors.email}
					<p id="error-email" class="text-destructive text-sm">
						{formState.errors.email}
					</p>
				{/if}
			</div>
			<div class="group/field grid gap-2" data-invalid={!!formState.errors?.message}>
				<Label for="message" class="group-data-[invalid=true]/field:text-destructive">
					Message <span aria-hidden="true">*</span>
				</Label>
				<Textarea
					id="message"
					name="message"
					placeholder="Type your message here..."
					class="group-data-[invalid=true]/field:border-destructive focus-visible:group-data-[invalid=true]/field:ring-destructive"
					disabled={pending}
					aria-invalid={!!formState.errors?.message}
					aria-errormessage="error-message"
					defaultValue={formState.defaultValues.message}
				/>
				{#if formState.errors.message}
					<p id="error-message" class="text-destructive text-sm">
						{formState.errors.message}
					</p>
				{/if}
			</div>
		</Card.Content>
		<Card.Footer>
			<Button type="submit" size="sm" disabled={pending}>
				{pending ? "Sending..." : "Send Message"}
			</Button>
		</Card.Footer>
	</Card.Root>
</form>
