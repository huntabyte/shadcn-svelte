<script lang="ts" context="module">
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

	export let data: SuperValidated<Infer<ProfileFormSchema>>;

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

	$: selectedEmail = {
		label: $formData.email,
		value: $formData.email,
	};
</script>

<form method="POST" class="space-y-8" use:enhance id="profile-form">
	<Form.Field {form} name="username">
		<Form.Control let:attrs>
			<Form.Label>Username</Form.Label>
			<Input placeholder="@shadcn" {...attrs} bind:value={$formData.username} />
		</Form.Control>
		<Form.Description>
			This is your public display name. It can be your real name or a pseudonym. You can only
			change this once every 30 days.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="email">
		<Form.Control let:attrs>
			<Form.Label>Email</Form.Label>
			<Select.Root
				selected={selectedEmail}
				onSelectedChange={(s) => {
					s && ($formData.email = s.value);
				}}
			>
				<Select.Trigger {...attrs}>
					<Select.Value placeholder="Select a verified email to display" />
				</Select.Trigger>
				<Select.Content>
					<Select.Item value="m@example.com" label="m@example.com" />
					<Select.Item value="m@google.com" label="m@google.com" />
					<Select.Item value="m@support.com" label="m@supporte.com" />
				</Select.Content>
			</Select.Root>
			<input hidden name={attrs.name} bind:value={$formData.email} />
		</Form.Control>
		<Form.Description>
			You can manage verified email addresses in your <a href="/examples/forms"
				>email settings</a
			>.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="bio">
		<Form.Control let:attrs>
			<Form.Label>Bio</Form.Label>
			<Textarea {...attrs} bind:value={$formData.bio} />
		</Form.Control>
		<Form.Description>
			You can <span>@mention</span> other users and organizations to link to them.
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<div>
		<Form.Fieldset {form} name="urls">
			<Form.Legend>URLs</Form.Legend>
			{#each $formData.urls as _, i}
				<Form.ElementField {form} name="urls[{i}]">
					<Form.Description class={cn(i !== 0 && "sr-only")}>
						Add links to your website, blog, or social media profiles.
					</Form.Description>
					<Form.Control let:attrs>
						<Input {...attrs} bind:value={$formData.urls[i]} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.ElementField>
			{/each}
		</Form.Fieldset>
		<Button type="button" variant="outline" size="sm" class="mt-2" on:click={addUrl}>
			Add URL
		</Button>
	</div>

	<Form.Button>Update profile</Form.Button>
</form>

{#if browser}
	<SuperDebug data={$formData} />
{/if}
