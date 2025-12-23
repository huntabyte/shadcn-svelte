<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let notifications = $state({
		email: true,
		sms: false,
		push: true,
	});
</script>

<Example title="Checkboxes with Icons">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" class="w-fit" {...props}>Notifications</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="min-w-56">
			<DropdownMenu.Group>
				<DropdownMenu.Label>Notification Preferences</DropdownMenu.Label>
				<DropdownMenu.CheckboxItem
					checked={notifications.email}
					onCheckedChange={(checked) =>
						(notifications = { ...notifications, email: checked === true })}
				>
					<IconPlaceholder
						lucide="MailIcon"
						tabler="IconMail"
						hugeicons="MailIcon"
						phosphor="EnvelopeIcon"
					/>
					Email notifications
				</DropdownMenu.CheckboxItem>
				<DropdownMenu.CheckboxItem
					checked={notifications.sms}
					onCheckedChange={(checked) =>
						(notifications = { ...notifications, sms: checked === true })}
				>
					<IconPlaceholder
						lucide="MessageSquareIcon"
						tabler="IconMessage"
						hugeicons="MessageIcon"
						phosphor="ChatCircleIcon"
					/>
					SMS notifications
				</DropdownMenu.CheckboxItem>
				<DropdownMenu.CheckboxItem
					checked={notifications.push}
					onCheckedChange={(checked) =>
						(notifications = { ...notifications, push: checked === true })}
				>
					<IconPlaceholder
						lucide="BellIcon"
						tabler="IconBell"
						hugeicons="NotificationIcon"
						phosphor="BellIcon"
					/>
					Push notifications
				</DropdownMenu.CheckboxItem>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</Example>
