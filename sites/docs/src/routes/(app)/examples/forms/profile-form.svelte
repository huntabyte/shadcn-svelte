<script lang="ts" module>
	import { z } from "zod";
	export const profileFormSchema = z.object({
		username: z
			.string()
			.min(2, "Username must be at least 2 characters.")
			.max(30, "Username must not be longer than 30 characters"),
		email: z.string({ required_error: "Please select an email to display" }).email(),
		bio: z.string().min(4).max(160).default("I own a computer."),
		urls: z
			.array(z.string().url())
			.default(["https://shadcn.com", "https://twitter.com/shadcn"]),
	});
	export type ProfileFormSchema = typeof profileFormSchema;
</script>

<script lang="ts">
	import { type Infer, type SuperValidated, superForm } from "sveltekit-superforms";
	import SuperDebug from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";
	import { tick } from "svelte";
	import * as Form from "$lib/registry/new-york/ui/form/index.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";
	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import { Textarea } from "$lib/registry/new-york/ui/textarea/index.js";
	import { cn } from "$lib/utils.js";
	import { browser } from "$app/environment";

	let { data }: { data: SuperValidated<Infer<ProfileFormSchema>> } = $props();

	const form = superForm(data, {
		validators: zodClient(profileFormSchema),
	});

	const { form: formData, enhance } = form;

	function addUrl() {
		$formData.urls = [...$formData.urls, ""];

		tick().then(() => {
			const urlInputs = Array.from(
				document.querySelectorAll<HTMLElement>("#profile-form input[name='urls']")
			);
			const lastInput = urlInputs[urlInputs.length - 1];
			lastInput && lastInput.focus();
		});
	}
</script>

<form method="POST" class="space-y-8" use:enhance id="profile-form">
	<Form.Field {form} name="username">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Input placeholder="@shadcn" {...props} bind:value={$formData.username} />
			{/snippet}
		</Form.Control>
		<Form.Description>
			This is your public display name. It can be your real name or a pseudonym. You can only
			change this once every 30 days.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Select.Root type="single" bind:value={$formData.email} name={props.name}>
					<Select.Trigger {...props}>
						{$formData.email && $formData.email.length
							? $formData.email
							: "Select a verified email to display"}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="m@example.com" label="m@example.com" />
						<Select.Item value="m@google.com" label="m@google.com" />
						<Select.Item value="m@support.com" label="m@support.com" />
					</Select.Content>
				</Select.Root>
				<input hidden name={props.name} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.Description>
			You can manage verified email addresses in your <a href="/examples/forms">
				email settings
			</a>.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="bio">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Bio</Form.Label>
				<Textarea {...props} bind:value={$formData.bio} />
			{/snippet}
		</Form.Control>
		<Form.Description>
			You can <span>@mention</span> other users and organizations to link to them.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<div>
		<Form.Fieldset {form} name="urls">
			<Form.Legend>URLs</Form.Legend>
			{#each $formData.urls as _, i (i)}
				<Form.ElementField {form} name="urls[{i}]">
					<Form.Description class={cn(i !== 0 && "sr-only")}>
						Add links to your website, blog, or social media profiles.
					</Form.Description>
					<Form.Control>
						{#snippet children({ props })}
							<Input {...props} bind:value={$formData.urls[i]} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.ElementField>
			{/each}
		</Form.Fieldset>
		<Button type="button" variant="outline" size="sm" class="mt-2" onclick={addUrl}>
			Add URL
		</Button>
	</div>

	<Form.Button>Update profile</Form.Button>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
