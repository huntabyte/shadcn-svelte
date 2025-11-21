<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import { cn } from "$lib/utils.js";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	const users = [
		{
			name: "Olivia Martin",
			email: "m@example.com",
			avatar: "/avatars/01.png",
		},
		{
			name: "Isabella Nguyen",
			email: "isabella.nguyen@email.com",
			avatar: "/avatars/03.png",
		},
		{
			name: "Emma Wilson",
			email: "emma@example.com",
			avatar: "/avatars/05.png",
		},
		{
			name: "Jackson Lee",
			email: "lee@example.com",
			avatar: "/avatars/02.png",
		},
		{
			name: "William Kim",
			email: "will@email.com",
			avatar: "/avatars/04.png",
		},
	] as const;

	type User = (typeof users)[number];

	let open = $state(false);
	let selectedUsers = $state<User[]>([]);

	let messages = $state([
		{
			role: "agent",
			content: "Hi, how can I help you today?",
		},
		{
			role: "user",
			content: "Hey, I'm having trouble with my account.",
		},
		{
			role: "agent",
			content: "What seems to be the problem?",
		},
		{
			role: "user",
			content: "I can't log in.",
		},
	]);

	let input = $state("");
	let inputLength = $derived(input.trim().length);
</script>

<Card.Root>
	<Card.Header class="flex flex-row items-center">
		<div class="flex items-center gap-4">
			<Avatar.Root class="border">
				<Avatar.Image src="/avatars/01.png" alt="Image" />
				<Avatar.Fallback>OM</Avatar.Fallback>
			</Avatar.Root>
			<div class="flex flex-col gap-0.5">
				<p class="text-sm font-medium leading-none">Sofia Davis</p>
				<p class="text-muted-foreground text-xs">m@example.com</p>
			</div>
		</div>
		<Tooltip.Provider delayDuration={0}>
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<Button
							{...props}
							size="icon"
							variant="secondary"
							class="ms-auto size-8 rounded-full"
							onclick={() => (open = true)}
						>
							<PlusIcon />
							<span class="sr-only">New message</span>
						</Button>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content sideOffset={10}>New message</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col gap-4">
			{#each messages as message, index (index)}
				<div
					class={cn(
						"flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
						message.role === "user"
							? "bg-primary text-primary-foreground ms-auto"
							: "bg-muted"
					)}
				>
					{message.content}
				</div>
			{/each}
		</div>
	</Card.Content>
	<Card.Footer>
		<form
			onsubmit={(event) => {
				event.preventDefault();
				if (inputLength === 0) return;
				messages.push({
					role: "user",
					content: input,
				});
				input = "";
			}}
			class="relative w-full"
		>
			<Input
				id="message"
				placeholder="Type your message..."
				class="flex-1 pe-10"
				autocomplete="off"
				bind:value={input}
			/>
			<Button
				type="submit"
				size="icon"
				disabled={inputLength === 0}
				class="absolute end-2 top-1/2 size-6 -translate-y-1/2 rounded-full"
			>
				<ArrowUpIcon class="size-3.5" />
				<span class="sr-only">Send</span>
			</Button>
		</form>
	</Card.Footer>
</Card.Root>
<Dialog.Root bind:open>
	<Dialog.Content class="gap-0 p-0 outline-none">
		<Dialog.Header class="px-4 pb-4 pt-5">
			<Dialog.Title>New message</Dialog.Title>
			<Dialog.Description>
				Invite a user to this thread. This will create a new group message.
			</Dialog.Description>
		</Dialog.Header>
		<Command.Root class="overflow-hidden rounded-t-none border-t bg-transparent">
			<Command.Input placeholder="Search user..." />
			<Command.List>
				<Command.Empty>No users found.</Command.Empty>
				<Command.Group class="p-2">
					{#each users as user (user.email)}
						<Command.Item
							class="data-[active=true]:opacity-50"
							onSelect={() => {
								if (selectedUsers.includes(user)) {
									selectedUsers = selectedUsers.filter(
										(u) => u.email !== user.email
									);
								} else {
									selectedUsers = [...users].filter((u) =>
										[...selectedUsers, user].includes(u)
									);
								}
							}}
						>
							<Avatar.Root class="border">
								<Avatar.Image src={user.avatar} alt="Image" />
								<Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
							</Avatar.Root>
							<div class="ms-2">
								<p class="text-sm font-medium leading-none">
									{user.name}
								</p>
								<p class="text-muted-foreground text-sm">
									{user.email}
								</p>
							</div>
							{#if selectedUsers.includes(user)}
								<CheckIcon class="text-primary ms-auto flex size-4" />
							{/if}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
		<Dialog.Footer class="flex items-center border-t p-4 sm:justify-between">
			{#if selectedUsers.length > 0}
				<div class="flex -space-x-2 overflow-hidden">
					{#each selectedUsers as user (user.email)}
						<Avatar.Root class="inline-block border">
							<Avatar.Image src={user.avatar} />
							<Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
						</Avatar.Root>
					{/each}
				</div>
			{:else}
				<p class="text-muted-foreground text-sm">Select users to add to this thread.</p>
			{/if}
			<Button disabled={selectedUsers.length < 2} onclick={() => (open = false)}>
				Continue
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>
