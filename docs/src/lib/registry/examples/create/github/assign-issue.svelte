<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const users = [
		"shadcn",
		"maxleiter",
		"evilrabbit",
		"pranathip",
		"jorgezreik",
		"shuding",
		"rauchg",
	];

	let open = $state(false);
	let selectedUsers = $state<string[]>([users[0]]);

	function toggleUser(username: string) {
		if (selectedUsers.includes(username)) {
			selectedUsers = selectedUsers.filter((u) => u !== username);
		} else {
			selectedUsers = [...selectedUsers, username];
		}
	}

	function removeUser(username: string, event: MouseEvent) {
		event.stopPropagation();
		selectedUsers = selectedUsers.filter((u) => u !== username);
	}
</script>

<Example title="User Select" class="items-center justify-center">
	<Card.Root class="w-full max-w-sm" size="sm">
		<Card.Header class="border-b">
			<Card.Title class="text-sm">Assign Issue</Card.Title>
			<Card.Description class="text-sm">
				Select users to assign to this issue.
			</Card.Description>
			<Card.Action>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button variant="outline" size="icon-xs" {...props}>
								<IconPlaceholder
									lucide="PlusIcon"
									tabler="IconPlus"
									hugeicons="PlusSignIcon"
									phosphor="PlusIcon"
								/>
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content>Add user</Tooltip.Content>
				</Tooltip.Root>
			</Card.Action>
		</Card.Header>
		<Card.Content>
			<Popover.Root bind:open>
				<Popover.Trigger>
					{#snippet child({ props })}
						<div
							{...props}
							class="bg-input/20 dark:bg-input/30 border-input focus-within:border-ring focus-within:ring-ring/30 flex min-h-7 cursor-pointer flex-wrap items-center gap-1 rounded-md border bg-clip-padding px-1 py-0.5 text-xs/relaxed transition-colors focus-within:ring-2"
							role="button"
						>
							{#each selectedUsers as username (username)}
								<div
									class="bg-muted-foreground/10 text-foreground flex h-[calc(--spacing(4.75))] w-fit items-center justify-center gap-1 rounded-[calc(var(--radius-sm)-2px)] px-1.5 text-xs/relaxed font-medium whitespace-nowrap"
								>
									<Avatar.Root class="size-4">
										<Avatar.Image
											src={`https://github.com/${username}.png`}
											alt={username}
										/>
										<Avatar.Fallback>{username.charAt(0)}</Avatar.Fallback>
									</Avatar.Root>
									{username}
									<button
										type="button"
										class="-ml-1 opacity-50 hover:opacity-100"
										onclick={(e) => removeUser(username, e)}
										aria-label={`Remove ${username}`}
									>
										<IconPlaceholder
											lucide="XIcon"
											tabler="IconX"
											hugeicons="Cancel01Icon"
											phosphor="XIcon"
											class="size-3"
										/>
									</button>
								</div>
							{/each}
							<input
								type="text"
								placeholder={selectedUsers.length > 0
									? undefined
									: "Select a item..."}
								class="min-w-[120px] flex-1 border-none bg-transparent outline-none"
							/>
						</div>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-[var(--bits-popover-trigger-width)] p-0">
					<Command.Root>
						<Command.Input placeholder="Search users..." />
						<Command.List>
							<Command.Empty>No users found.</Command.Empty>
							<Command.Group>
								{#each users as username (username)}
									<Command.Item
										value={username}
										onSelect={() => {
											toggleUser(username);
										}}
										data-checked={selectedUsers.includes(username)}
									>
										<Avatar.Root class="size-5">
											<Avatar.Image
												src={`https://github.com/${username}.png`}
												alt={username}
											/>
											<Avatar.Fallback>{username.charAt(0)}</Avatar.Fallback>
										</Avatar.Root>
										{username}
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
		</Card.Content>
	</Card.Root>
</Example>
