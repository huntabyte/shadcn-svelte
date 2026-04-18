<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";

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
	let selected = $state<string[]>(["shadcn"]);

	function toggleUser(username: string) {
		selected = selected.includes(username)
			? selected.filter((u) => u !== username)
			: [...selected, username];
	}

	function removeUser(e: MouseEvent, username: string) {
		e.stopPropagation();
		selected = selected.filter((u) => u !== username);
	}
</script>

<Card.Root class="w-full max-w-sm" size="sm">
	<Card.Header class="border-b">
		<Card.Title class="text-sm">Assign Issue</Card.Title>
		<Card.Description class="text-sm">Select users to assign to this issue.</Card.Description>
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
								remixicon="RiAddLine"
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
						role="combobox"
						aria-expanded={open}
						class="flex min-h-9 min-w-0 cursor-pointer flex-wrap items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm transition-colors focus-within:ring-2 focus-within:ring-offset-2"
					>
						{#each selected as username (username)}
							<Badge
								variant="secondary"
								class="gap-1 pr-0.5"
								onclick={(e) => removeUser(e, username)}
								onkeydown={(e) =>
									e.key === "Enter" &&
									removeUser(e as unknown as MouseEvent, username)}
							>
								<Avatar.Root class="size-4">
									<Avatar.Image
										src="https://github.com/{username}.png"
										alt={username}
									/>
									<Avatar.Fallback>{username.charAt(0)}</Avatar.Fallback>
								</Avatar.Root>
								{username}
								<IconPlaceholder
									lucide="XIcon"
									tabler="IconX"
									hugeicons="Cancel01Icon"
									phosphor="XIcon"
									remixicon="RiCloseLine"
									class="size-3"
								/>
							</Badge>
						{/each}
						<span class="text-muted-foreground flex-1 py-1 text-sm">
							{selected.length > 0 ? "Select users..." : "Select a user..."}
						</span>
					</div>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-(--bits-popover-trigger-width) p-0" align="start">
				<Command.Root>
					<Command.Input placeholder="Search users..." />
					<Command.List>
						<Command.Empty>No users found.</Command.Empty>
						<Command.Group value="users">
							{#each users as username (username)}
								<Command.Item
									value={username}
									onSelect={() => toggleUser(username)}
								>
									<IconPlaceholder
										lucide="CheckIcon"
										tabler="IconCheck"
										hugeicons="Tick02Icon"
										phosphor="CheckIcon"
										remixicon="RiCheckLine"
										class={cn(
											!selected.includes(username) && "text-transparent"
										)}
									/>
									<Avatar.Root class="size-5">
										<Avatar.Image
											src="https://github.com/{username}.png"
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
