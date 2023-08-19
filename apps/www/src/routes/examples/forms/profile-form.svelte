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
		urls: z
			.array(z.string().url({ message: "Please enter a valid URL." }))
			.optional()
			.default(["https://shadcn.com", "https://x.com/shadcn"])
	});
	export type ProfileFormSchema = typeof profileFormSchema;
	export type ProfileFormValues = z.infer<typeof profileFormSchema>;
</script>

<script lang="ts">
	import * as Form from "@/registry/new-york/ui/super-form";
	import { Input } from "@/registry/new-york/ui/input";
	import { Button } from "@/registry/new-york/ui/button";
	import * as Select from "@/registry/new-york/ui/select";
	import { Textarea } from "@/registry/new-york/ui/textarea";
	import type { SuperValidated } from "sveltekit-superforms";
	import { cn } from "@/utils";

	export let data: SuperValidated<ProfileFormSchema>;
</script>

<Form.Root
	{data}
	schema={profileFormSchema}
	let:form
	let:formValues
	let:formStore
	method="POST"
	class="space-y-8"
>
	<Form.Field {form} name="username" let:field>
		<Form.Label>Username</Form.Label>
		<Input
			placeholder="shadcn"
			{...field.attrs}
			on:input={field.handleInput}
		/>
		<Form.Description>
			This is your public display name. It can be your real name or a
			pseudonym. You can only change this once every 30 days.
		</Form.Description>
		<Form.Message />
	</Form.Field>
	<Form.Field {form} name="email" let:field>
		<Form.Label>Email</Form.Label>
		<Select.Root onValueChange={field.updateValue}>
			<Select.Trigger {...field.attrs}>
				<Select.Value
					placeholder="Select a verified email to display"
				/>
				<Select.Input name={field.attrs.name} />
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="m@example.com" label="m@example.com"
					>m@example.com
				</Select.Item>
				<Select.Item value="m@google.com" label="m@google.com"
					>m@google.com
				</Select.Item>
				<Select.Item value="m@support.com" label="m@support.com"
					>m@support.com
				</Select.Item>
			</Select.Content>
		</Select.Root>
		<Form.Description>
			You can manage verified email addresses in your{" "}<a
				href="/examples/forms">email settings</a
			>.
		</Form.Description>
		<Form.Message />
	</Form.Field>
	<Form.Field {form} name="bio" let:field>
		<Form.Label>Bio</Form.Label>
		<Textarea
			placeholder="Tell us a little bit about yourself"
			class="resize-none"
			{...field.attrs}
			on:input={field.handleInput}
		/>
		<Form.Description>
			You can <span>@mention</span> other users and organizations to link to
			them.
		</Form.Description>
		<Form.Message />
	</Form.Field>
	<div>
		{#each formValues.urls as _, i}
			<Form.Field {form} name="urls[{i}]" let:field>
				<Form.Label class={cn(i !== 0 && "sr-only")}>URLs</Form.Label>
				<Form.Description class={cn(i !== 0 && "sr-only")}>
					Add links to your website, blog, or social media profiles.
				</Form.Description>
				<Input {...field.attrs} on:input={field.handleInput} />
				<Form.Message />
			</Form.Field>
		{/each}
		<Button
			type="button"
			variant="outline"
			size="sm"
			class="mt-2"
			on:click={() => {
				formStore.update((prev) => {
					const urls = prev.urls;
					urls.push("");
					return {
						...prev,
						urls
					};
				});
			}}
		>
			Add URL
		</Button>
	</div>
	<Button type="submit">Update profile</Button>
</Form.Root>
