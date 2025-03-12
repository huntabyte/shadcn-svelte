<script lang="ts">
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import * as Avatar from "$lib/registry/new-york/ui/avatar/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import * as Command from "$lib/registry/new-york/ui/command/index.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Team Members</Card.Title>
		<Card.Description>Invite your team members to collaborate.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		<div class="flex items-center justify-between space-x-4">
			<div class="flex items-center space-x-4">
				<Avatar.Root class="size-8">
					<Avatar.Image src="/avatars/01.png" alt="Image" />
					<Avatar.Fallback>OM</Avatar.Fallback>
				</Avatar.Root>
				<div>
					<p class="text-sm font-medium leading-none">Sofia Davis</p>
					<p class="text-muted-foreground text-sm">m@example.com</p>
				</div>
			</div>
			<Popover.Root>
				<Popover.Trigger
					class={buttonVariants({ variant: "outline", size: "sm", class: "ml-auto" })}
				>
					Owner
					<ChevronDown class="text-muted-foreground ml-2 size-4" />
				</Popover.Trigger>
				<Popover.Content class="p-0" align="end">
					<Command.Root>
						<Command.Input placeholder="Select new role..." />
						<Command.List>
							<Command.Empty>No roles found.</Command.Empty>
							<Command.Group>
								<Command.Item
									class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
								>
									<p>Viewer</p>
									<p class="text-muted-foreground text-sm">
										Can view and comment.
									</p>
								</Command.Item>
								<Command.Item
									class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
								>
									<p>Developer</p>
									<p class="text-muted-foreground text-sm">
										Can view, comment and edit.
									</p>
								</Command.Item>
								<Command.Item
									class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
								>
									<p>Billing</p>
									<p class="text-muted-foreground text-sm">
										Can view, comment and manage billing.
									</p>
								</Command.Item>
								<Command.Item
									class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
								>
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
				<Avatar.Root class="size-8">
					<Avatar.Image src="/avatars/02.png" alt="Image" />
					<Avatar.Fallback>JL</Avatar.Fallback>
				</Avatar.Root>
				<div>
					<p class="text-sm font-medium leading-none">Jackson Lee</p>
					<p class="text-muted-foreground text-sm">p@example.com</p>
				</div>
			</div>
			<Popover.Root>
				<Popover.Trigger
					class={buttonVariants({ variant: "outline", size: "sm", class: "ml-auto" })}
				>
					Member
					<ChevronDown class="text-muted-foreground" />
				</Popover.Trigger>
				<Popover.Content class="p-0" align="end">
					<Command.Root>
						<Command.Input placeholder="Select new role..." />
						<Command.List>
							<Command.Empty>No roles found.</Command.Empty>
							<Command.Group class="p-1.5">
								<Command.Item
									class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
								>
									<p>Viewer</p>
									<p class="text-muted-foreground text-sm">
										Can view and comment.
									</p>
								</Command.Item>
								<Command.Item
									class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
								>
									<p>Developer</p>
									<p class="text-muted-foreground text-sm">
										Can view, comment and edit.
									</p>
								</Command.Item>
								<Command.Item
									class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
								>
									<p>Billing</p>
									<p class="text-muted-foreground text-sm">
										Can view, comment and manage billing.
									</p>
								</Command.Item>
								<Command.Item
									class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
								>
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
				<Avatar.Root class="size-8">
					<Avatar.Image src="/avatars/03.png" alt="Image" />
					<Avatar.Fallback>IN</Avatar.Fallback>
				</Avatar.Root>
				<div>
					<p class="text-sm font-medium leading-none">Isabella Nguyen</p>
					<p class="text-muted-foreground text-sm">i@example.com</p>
				</div>
			</div>
			<Popover.Root>
				<Popover.Trigger
					class={buttonVariants({ variant: "outline", size: "sm", class: "ml-auto" })}
				>
					Member
					<ChevronDown class="text-muted-foreground ml-2 size-4" />
				</Popover.Trigger>
				<Popover.Content class="p-0" align="end">
					<Command.Root>
						<Command.Input placeholder="Select new role..." />
						<Command.List>
							<Command.Empty>No roles found.</Command.Empty>
							<Command.Group class="p-1.5">
								<Command.Item
									class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
								>
									<p>Viewer</p>
									<p class="text-muted-foreground text-sm">
										Can view and comment.
									</p>
								</Command.Item>
								<Command.Item
									class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
								>
									<p>Developer</p>
									<p class="text-muted-foreground text-sm">
										Can view, comment and edit.
									</p>
								</Command.Item>
								<Command.Item
									class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
								>
									<p>Billing</p>
									<p class="text-muted-foreground text-sm">
										Can view, comment and manage billing.
									</p>
								</Command.Item>
								<Command.Item
									class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
								>
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
