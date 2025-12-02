<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";

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
			role: "Developer",
			avatar: "/avatars/02.png",
		},
		{
			name: "Isabella Nguyen",
			email: "i@example.com",
			role: "Billing",
			avatar: "/avatars/03.png",
		},
	]);

	const roles = [
		{
			name: "Viewer",
			description: "Can view and comment.",
		},
		{
			name: "Developer",
			description: "Can view, comment and edit.",
		},
		{
			name: "Billing",
			description: "Can view, comment and manage billing.",
		},
		{
			name: "Owner",
			description: "Admin-level access to all resources.",
		},
	];
</script>

<Card.Root class="gap-4">
	<Card.Header>
		<Card.Title>Team Members</Card.Title>
		<Card.Description>Invite your team members to collaborate.</Card.Description>
	</Card.Header>
	<Card.Content>
		{#each members as member (member.name)}
			<Item.Item size="sm" class="gap-4 px-0">
				<Avatar.Root class="shrink-0 self-start border">
					<Avatar.Image src={member.avatar} alt="Image" />
					<Avatar.Fallback>
						{member.name
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</Avatar.Fallback>
				</Avatar.Root>
				<Item.Content>
					<Item.Title>{member.name}</Item.Title>
					<Item.Description>{member.email}</Item.Description>
				</Item.Content>
				<Item.Actions>
					<Popover.Root>
						<Popover.Trigger
							class={buttonVariants({
								variant: "outline",
								size: "sm",
								class: "ms-auto shadow-none",
							})}
						>
							{member.role}
							<ChevronDownIcon />
						</Popover.Trigger>
						<Popover.Content class="p-0" align="end">
							<Command.Root>
								<Command.Input placeholder="Select role..." />
								<Command.List>
									<Command.Empty>No roles found.</Command.Empty>
									<Command.Group>
										{#each roles as role (role.name)}
											<Command.Item
												onSelect={() => (member.role = role.name)}
											>
												<div class="flex flex-col">
													<p class="text-sm font-medium">{role.name}</p>
													<p class="text-muted-foreground">
														{role.description}
													</p>
												</div>
											</Command.Item>
										{/each}
									</Command.Group>
								</Command.List>
							</Command.Root>
						</Popover.Content>
					</Popover.Root>
				</Item.Actions>
			</Item.Item>
		{/each}
	</Card.Content>
</Card.Root>
