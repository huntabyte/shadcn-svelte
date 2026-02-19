<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">Open</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>My Account</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>Team</DropdownMenu.Item>
		<DropdownMenu.Sub>
			<DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
			<DropdownMenu.SubContent>
				<DropdownMenu.Item>Email</DropdownMenu.Item>
				<DropdownMenu.Item>Message</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Sub>
					<DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
					<DropdownMenu.SubContent>
						<DropdownMenu.Item>Link</DropdownMenu.Item>
						<DropdownMenu.Item>QR Code</DropdownMenu.Item>
					</DropdownMenu.SubContent>
				</DropdownMenu.Sub>
			</DropdownMenu.SubContent>
		</DropdownMenu.Sub>
		<DropdownMenu.Item>
			New Team
			<DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
