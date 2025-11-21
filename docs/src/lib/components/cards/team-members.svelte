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

<Card.Root>
	<Card.Header>
		<Card.Title>Team Members</Card.Title>
		<Card.Description>Invite your team members to collaborate.</Card.Description>
	</Card.Header>
	<Card.Content class="grid gap-6">
		{#each members as member (member.name)}
			<div class="flex items-center justify-between gap-4">
				<div class="flex items-center gap-4">
					<Avatar.Root class="border">
						<Avatar.Image src={member.avatar} alt="Image" />
						<Avatar.Fallback>
							{member.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</Avatar.Fallback>
					</Avatar.Root>
					<div class="flex flex-col gap-0.5">
						<p class="text-sm font-medium leading-none">{member.name}</p>
						<p class="text-muted-foreground text-xs">{member.email}</p>
					</div>
				</div>
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
										<Command.Item onSelect={() => (member.role = role.name)}>
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
			</div>
		{/each}
	</Card.Content>
</Card.Root>
