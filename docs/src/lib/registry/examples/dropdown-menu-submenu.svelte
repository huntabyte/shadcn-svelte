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
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item>Team</DropdownMenu.Item>
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
				<DropdownMenu.Portal>
					<DropdownMenu.SubContent>
						<DropdownMenu.Item>Email</DropdownMenu.Item>
						<DropdownMenu.Item>Message</DropdownMenu.Item>
						<DropdownMenu.Sub>
							<DropdownMenu.SubTrigger>More options</DropdownMenu.SubTrigger>
							<DropdownMenu.Portal>
								<DropdownMenu.SubContent>
									<DropdownMenu.Item>Calendly</DropdownMenu.Item>
									<DropdownMenu.Item>Slack</DropdownMenu.Item>
									<DropdownMenu.Separator />
									<DropdownMenu.Item>Webhook</DropdownMenu.Item>
								</DropdownMenu.SubContent>
							</DropdownMenu.Portal>
						</DropdownMenu.Sub>
						<DropdownMenu.Separator />
						<DropdownMenu.Item>Advanced...</DropdownMenu.Item>
					</DropdownMenu.SubContent>
				</DropdownMenu.Portal>
			</DropdownMenu.Sub>
			<DropdownMenu.Item>
				New Team
				<DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
