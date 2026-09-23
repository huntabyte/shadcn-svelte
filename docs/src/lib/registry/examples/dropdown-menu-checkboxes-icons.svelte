<script lang="ts">
	import BellIcon from "@lucide/svelte/icons/bell";
	import MailIcon from "@lucide/svelte/icons/mail";
	import MessageSquareIcon from "@lucide/svelte/icons/message-square";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";

	let notifications = $state({
		email: true,
		sms: false,
		push: true,
	});
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: "outline" })}>
		Notifications
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-48">
		<DropdownMenu.Group>
			<DropdownMenu.Label>Notification Preferences</DropdownMenu.Label>
			<DropdownMenu.CheckboxItem bind:checked={notifications.email}>
				<MailIcon />
				Email notifications
			</DropdownMenu.CheckboxItem>
			<DropdownMenu.CheckboxItem bind:checked={notifications.sms}>
				<MessageSquareIcon />
				SMS notifications
			</DropdownMenu.CheckboxItem>
			<DropdownMenu.CheckboxItem bind:checked={notifications.push}>
				<BellIcon />
				Push notifications
			</DropdownMenu.CheckboxItem>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
