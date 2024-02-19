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
	import * as Form from "@/registry/new-york/ui/form";
	import * as Select from "@/registry/new-york/ui/select";
	import { Input } from "@/registry/new-york/ui/input";
	import { Textarea } from "@/registry/new-york/ui/textarea";
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
	import { zodClient } from "sveltekit-superforms/adapters";

	export let data: SuperValidated<Infer<ProfileFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(profileFormSchema),
	});

	const { form: formData, enhance } = form;

	$: selectedEmail = {
		label: $formData.email,
		value: $formData.email,
	};
</script>

<form method="POST" class="space-y-8" use:enhance>
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
	<!-- <Form.Fieldset {form} name="urls">
		<Form.Legend>URLS</Form.Legend>
		<Form.Description>
			Add links to your website, blog, or social media profiles.
		</Form.Description>
	</Form.Fieldset> -->

	<Form.Button>Update profile</Form.Button>
</form>
