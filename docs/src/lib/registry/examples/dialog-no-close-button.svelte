<script lang="ts">
	import { Button, buttonVariants } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: "outline" })}>Open Dialog</Dialog.Trigger>
	<Dialog.Content showCloseButton={false} class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit profile</Dialog.Title>
			<Dialog.Description>
				Make changes to your profile here. Click save when you&apos;re done.
			</Dialog.Description>
		</Dialog.Header>
		<div class="grid gap-4">
			<div class="grid gap-3">
				<Label for="no-close-name">Name</Label>
				<Input id="no-close-name" value="Pedro Duarte" />
			</div>
			<div class="grid gap-3">
				<Label for="no-close-username">Username</Label>
				<Input id="no-close-username" value="@peduarte" />
			</div>
		</div>
		<Dialog.Footer>
			<Dialog.Close class={buttonVariants({ variant: "outline" })}>Cancel</Dialog.Close>
			<Button type="submit">Save changes</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
