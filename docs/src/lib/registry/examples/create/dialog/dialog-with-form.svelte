<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
</script>

<Example title="With Form" class="w-full items-center justify-center">
	<Dialog.Root>
		<form>
			<Dialog.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>Edit Profile</Button>
				{/snippet}
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Edit profile</Dialog.Title>
					<Dialog.Description>
						Make changes to your profile here. Click save when you&apos;re done. Your
						profile will be updated immediately.
					</Dialog.Description>
				</Dialog.Header>
				<Field.Group>
					<Field.Field>
						<Field.Label for="name-1">Name</Field.Label>
						<Input id="name-1" name="name" value="Pedro Duarte" />
					</Field.Field>
					<Field.Field>
						<Field.Label for="username-1">Username</Field.Label>
						<Input id="username-1" name="username" value="@peduarte" />
					</Field.Field>
				</Field.Group>
				<Dialog.Footer>
					<Dialog.Close>
						{#snippet child({ props })}
							<Button variant="outline" {...props}>Cancel</Button>
						{/snippet}
					</Dialog.Close>
					<Button type="submit">Save changes</Button>
				</Dialog.Footer>
			</Dialog.Content>
		</form>
	</Dialog.Root>
</Example>
