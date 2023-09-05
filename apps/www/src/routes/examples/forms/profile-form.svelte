<script lang="ts" context="module">
	import { z } from "zod";
	export const profileFormSchema = z.object({
		username: z
			.string()
			.min(2, "Username must be at least 2 characters.")
			.max(30, "Username must not be longer than 30 characters"),
		email: z
			.string({ required_error: "Please select an email to display" })
			.email(),
		bio: z.string().min(4).max(160).default("I own a computer."),
		website: z
			.string()
			.url({ message: "Please enter a valid URL." })
			.default("https://shadcn-svelte.com")
	});
	export type ProfileFormSchema = typeof profileFormSchema;
</script>

<script lang="ts">
	import * as Form from "@/registry/new-york/ui/form";
	import type { SuperValidated } from "sveltekit-superforms";

	export let data: SuperValidated<ProfileFormSchema>;
</script>

<Form.Root
	form={data}
	schema={profileFormSchema}
	let:config
	method="POST"
	class="space-y-8"
	debug={true}
>
	<Form.Item>
		<Form.Field {config} name="username">
			<Form.Label>Username</Form.Label>
			<Form.Input placeholder="@shadcn" />
			<Form.Description>
				This is your public display name. It can be your real name or a
				pseudonym. You can only change this once every 30 days.
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Item>
		<Form.Field {config} name="email">
			<Form.Label>Email</Form.Label>
			<Form.Select>
				<Form.SelectTrigger
					placeholder="Select a verified email to display"
				/>
				<Form.SelectContent>
					<Form.SelectItem value="m@example.com" label="m@example.com"
						>m@example.com
					</Form.SelectItem>
					<Form.SelectItem value="m@google.com" label="m@google.com"
						>m@google.com
					</Form.SelectItem>
					<Form.SelectItem value="m@support.com" label="m@support.com"
						>m@support.com
					</Form.SelectItem>
				</Form.SelectContent>
			</Form.Select>
			<Form.Description>
				You can manage verified email addresses in your <a
					href="/examples/forms">email settings</a
				>.
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Item>
		<Form.Field {config} name="bio">
			<Form.Label>Bio</Form.Label>
			<Form.Textarea
				placeholder="Tell us a little bit about yourself"
				class="resize-none"
			/>
			<Form.Description>
				You can <span>@mention</span> other users and organizations to link
				to them.
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Item>
		<Form.Field {config} name="website">
			<Form.Label>Website</Form.Label>
			<Form.Input />
			<Form.Description>
				Your personal website, blog, or portfolio.
			</Form.Description>
			<Form.Validation />
		</Form.Field>
	</Form.Item>
	<Form.Button>Update profile</Form.Button>
</Form.Root>
