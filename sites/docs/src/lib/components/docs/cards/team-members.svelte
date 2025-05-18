<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";

	let members = $state([
		{
			name: "Sofia Davis",
			email: "m@example.com",
			role: "Owner",
			avatar: "/avatars/01.png",
		},
		{
			name: "Jackson Lee",
			email: "p@example.com",
			role: "Member",
			avatar: "/avatars/02.png",
		},
		{
			name: "Isabella Nguyen",
			email: "i@example.com",
			role: "Member",
			avatar: "/avatars/03.png",
		},
	]);
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Team Members</Card.Title>
		<Card.Description>Invite your team members to collaborate.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		{#each members as member (member.name)}
			<div class="flex items-center justify-between space-x-4">
				<div class="flex items-center space-x-4">
					<Avatar.Root class="size-8">
						<Avatar.Image src={member.avatar} alt="Image" />
						<Avatar.Fallback>
							{member.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</Avatar.Fallback>
					</Avatar.Root>
					<div>
						<p class="text-sm font-medium leading-none">{member.name}</p>
						<p class="text-muted-foreground text-sm">{member.email}</p>
					</div>
				</div>
				<Popover.Root>
					<Popover.Trigger
						class={buttonVariants({ variant: "outline", size: "sm", class: "ml-auto" })}
					>
						{member.role}
						<ChevronDownIcon class="text-muted-foreground ml-2 size-4" />
					</Popover.Trigger>
					<Popover.Content class="p-0" align="end">
						<Command.Root>
							<Command.Input placeholder="Select new role..." />
							<Command.List>
								<Command.Empty>No roles found.</Command.Empty>
								<Command.Group>
									<Command.Item
										class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
										onSelect={() => (member.role = "Viewer")}
									>
										<p>Viewer</p>
										<p class="text-muted-foreground text-sm">
											Can view and comment.
										</p>
									</Command.Item>
									<Command.Item
										class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
										onSelect={() => (member.role = "Developer")}
									>
										<p>Developer</p>
										<p class="text-muted-foreground text-sm">
											Can view, comment and edit.
										</p>
									</Command.Item>
									<Command.Item
										class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
										onSelect={() => (member.role = "Billing")}
									>
										<p>Billing</p>
										<p class="text-muted-foreground text-sm">
											Can view, comment and manage billing.
										</p>
									</Command.Item>
									<Command.Item
										class="teamaspace-y-1 flex flex-col items-start px-4 py-2"
										onSelect={() => (member.role = "Owner")}
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
		{/each}
	</Card.Content>
</Card.Root>
