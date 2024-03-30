<script lang="ts">
	import { mediaQuery } from "svelte-legos";
	import * as Dialog from "$lib/registry/default/ui/dialog/index.js";
	import * as Drawer from "$lib/registry/default/ui/drawer/index.js";
	import { Input } from "$lib/registry/default/ui/input/index.js";
	import { Label } from "$lib/registry/default/ui/label/index.js";
	import { Button } from "$lib/registry/default/ui/button/index.js";

	let open = false;
	const isDesktop = mediaQuery("(min-width: 768px)");
</script>

{#if $isDesktop}
	<Dialog.Root bind:open>
		<Dialog.Trigger asChild let:builder>
			<Button variant="outline" builders={[builder]}>Edit Profile</Button>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Edit profile</Dialog.Title>
				<Dialog.Description>
					Make changes to your profile here. Click save when you're done.
				</Dialog.Description>
			</Dialog.Header>
			<form class="grid items-start gap-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input type="email" id="email" value="shadcn@example.com" />
				</div>
				<div class="grid gap-2">
					<Label for="username">Username</Label>
					<Input id="username" value="@shadcn" />
				</div>
				<Button type="submit">Save changes</Button>
			</form>
		</Dialog.Content>
	</Dialog.Root>
{:else}
	<Drawer.Root bind:open>
		<Drawer.Trigger asChild let:builder>
			<Button variant="outline" builders={[builder]}>Edit Profile</Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header class="text-left">
				<Drawer.Title>Edit profile</Drawer.Title>
				<Drawer.Description>
					Make changes to your profile here. Click save when you're done.
				</Drawer.Description>
			</Drawer.Header>
			<form class="grid items-start gap-4 px-4">
				<div class="grid gap-2">
					<Label for="email">Email</Label>
					<Input type="email" id="email" value="shadcn@example.com" />
				</div>
				<div class="grid gap-2">
					<Label for="username">Username</Label>
					<Input id="username" value="@shadcn" />
				</div>
				<Button type="submit">Save changes</Button>
			</form>
			<Drawer.Footer class="pt-2">
				<Drawer.Close asChild let:builder>
					<Button variant="outline" builders={[builder]}>Cancel</Button>
				</Drawer.Close>
			</Drawer.Footer>
		</Drawer.Content>
	</Drawer.Root>
{/if}
