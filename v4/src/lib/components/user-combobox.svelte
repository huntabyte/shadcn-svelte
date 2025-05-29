<script lang="ts">
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import CheckIcon from "@lucide/svelte/icons/check";
	import PlusCircleIcon from "@lucide/svelte/icons/plus-circle";

	const users = [
		{
			id: "1",
			username: "shadcn",
		},
		{
			id: "2",
			username: "leerob",
		},
		{
			id: "3",
			username: "evilrabbit",
		},
	];

	let open = $state(false);
	let value = $state(users[0].id);

	const selectedUser = $derived(users.find((user) => user.id === value[0]));
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class="w-full justify-between px-2 md:max-w-[200px]"
			>
				{#if selectedUser}
					<div class="flex items-center gap-2">
						<Avatar.Root class="size-5">
							<Avatar.Image src={`https://github.com/${selectedUser.username}.png`} />
							<Avatar.Fallback>{selectedUser.username[0]}</Avatar.Fallback>
						</Avatar.Root>
						{selectedUser.username}
					</div>
				{:else}
					"Select user..."
				{/if}
				<ChevronsUpDownIcon class="text-muted-foreground" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-(--bits-popover-anchor-width) p-0">
		<Command.Root>
			<Command.Input placeholder="Search user..." />
			<Command.List>
				<Command.Empty>No user found.</Command.Empty>
				<Command.Group>
					{#each users as user (user.id)}
						<Command.Item
							value={user.id}
							onSelect={() => {
								value = value === user.id ? "" : user.id;
								open = false;
							}}
						>
							<Avatar.Root class="size-5">
								<Avatar.Image src={`https://github.com/${user.username}.png`} />
								<Avatar.Fallback>{user.username[0]}</Avatar.Fallback>
							</Avatar.Root>
							{user.username}
							<CheckIcon
								class={cn(
									"ml-auto",
									value === user.id ? "opacity-100" : "opacity-0"
								)}
							/>
						</Command.Item>
					{/each}
				</Command.Group>
				<Command.Separator />
				<Command.Group>
					<Command.Item>
						<PlusCircleIcon />
						Create user
					</Command.Item>
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
