<script lang="ts">
	import ChevronDown from "svelte-radix/ChevronDown.svelte";
	import * as Avatar from "$lib/registry/new-york/ui/avatar/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import * as Command from "$lib/registry/new-york/ui/command/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Team Members</Card.Title>
		<Card.Description>Invite your team members to collaborate</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<div class="flex items-center justify-between space-x-4">
			<div class="flex items-center space-x-4">
				<Avatar.Root>
					<Avatar.Image src="/avatars/01.png" alt="Sofia Davis" />
					<Avatar.Fallback>SD</Avatar.Fallback>
				</Avatar.Root>
				<div>
					<p class="text-sm font-medium leading-none">Sofia Davis</p>
					<p class="text-muted-foreground text-sm">m@example.com</p>
				</div>
			</div>
			<Popover.Root>
				<Popover.Trigger asChild let:builder>
					<Button builders={[builder]} variant="outline" class="ml-auto">
						Owner
						<ChevronDown class="text-muted-foreground ml-2 h-4 w-4" />
					</Button>
				</Popover.Trigger>
				<Popover.Content class="p-0" align="end">
					<Command.Root>
						<Command.Input placeholder="Select new role..." />
						<Command.List>
							<Command.Empty>No roles found.</Command.Empty>
							<Command.Group>
								<Command.Item class="flex flex-col items-start space-y-1 px-4 py-2">
									<p>Viewer</p>
									<p class="text-muted-foreground text-sm">
										Can view and comment.
									</p>
								</Command.Item>
								<Command.Item class="flex flex-col items-start space-y-1 px-4 py-2">
									<p>Developer</p>
									<p class="text-muted-foreground text-sm">
										Can view, comment, and edit.
									</p>
								</Command.Item>
								<Command.Item class="flex flex-col items-start space-y-1 px-4 py-2">
									<p>Billing</p>
									<p class="text-muted-foreground text-sm">
										Can view, comment and manage billing.
									</p>
								</Command.Item>
								<Command.Item class="flex flex-col items-start space-y-1 px-4 py-2">
									<p>Owner</p>
									<p class="text-muted-foreground text-sm">
										Admin-level access to all resources.
									</p>
								</Command.Item>
							</Command.Group>
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
		</div>
		<div class="flex items-center justify-between space-x-4">
			<div class="flex items-center space-x-4">
				<Avatar.Root>
					<Avatar.Image src="/avatars/02.png" alt="Jackson Lee" />
					<Avatar.Fallback>JL</Avatar.Fallback>
				</Avatar.Root>
				<div>
					<p class="text-sm font-medium leading-none">Jackson Lee</p>
					<p class="text-muted-foreground text-sm">p@example.com</p>
				</div>
			</div>
			<Popover.Root>
				<Popover.Trigger asChild let:builder>
					<Button builders={[builder]} variant="outline" class="ml-auto">
						Member
						<ChevronDown class="text-muted-foreground ml-2 h-4 w-4" />
					</Button>
				</Popover.Trigger>
				<Popover.Content class="p-0" align="end">
					<Command.Root>
						<Command.Input placeholder="Select new role..." />
						<Command.List>
							<Command.Empty>No roles found.</Command.Empty>
							<Command.Group>
								<Command.Item class="flex flex-col items-start space-y-1 px-4 py-2">
									<p>Viewer</p>
									<p class="text-muted-foreground text-sm">
										Can view and comment.
									</p>
								</Command.Item>
								<Command.Item class="flex flex-col items-start space-y-1 px-4 py-2">
									<p>Developer</p>
									<p class="text-muted-foreground text-sm">
										Can view, comment, and edit.
									</p>
								</Command.Item>
								<Command.Item class="flex flex-col items-start space-y-1 px-4 py-2">
									<p>Billing</p>
									<p class="text-muted-foreground text-sm">
										Can view, comment and manage billing.
									</p>
								</Command.Item>
								<Command.Item class="flex flex-col items-start space-y-1 px-4 py-2">
									<p>Owner</p>
									<p class="text-muted-foreground text-sm">
										Admin-level access to all resources.
									</p>
								</Command.Item>
							</Command.Group>
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
		</div>
	</Card.Content>
</Card.Root>
