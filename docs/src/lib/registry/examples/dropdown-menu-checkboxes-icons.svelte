<script lang="ts">
	import BellIcon from "@lucide/svelte/icons/bell";
	import MailIcon from "@lucide/svelte/icons/mail";
	import MessageSquareIcon from "@lucide/svelte/icons/message-square";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	let emailEnabled = $state(true);
	let smsEnabled = $state(false);
	let pushEnabled = $state(true);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">Notifications</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-48">
		<DropdownMenu.Group>
			<DropdownMenu.Label>Notification Preferences</DropdownMenu.Label>
			<DropdownMenu.CheckboxItem bind:checked={emailEnabled}>
				<MailIcon />
				Email notifications
			</DropdownMenu.CheckboxItem>
			<DropdownMenu.CheckboxItem bind:checked={smsEnabled}>
				<MessageSquareIcon />
				SMS notifications
			</DropdownMenu.CheckboxItem>
			<DropdownMenu.CheckboxItem bind:checked={pushEnabled}>
				<BellIcon />
				Push notifications
			</DropdownMenu.CheckboxItem>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
