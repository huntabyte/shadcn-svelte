<script lang="ts">
	import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
	import BellIcon from "@lucide/svelte/icons/bell";
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";
	import LogOutIcon from "@lucide/svelte/icons/log-out";
	import SparklesIcon from "@lucide/svelte/icons/sparkles";

	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";

	let {
		user,
	}: {
		user: {
			name: string;
			email: string;
			avatar: string;
		};
	} = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button variant="ghost" size="icon" {...props}>
				<Avatar.Root class="size-8 rounded-md">
					<Avatar.Image src={user.avatar} alt={user.name} />
					<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
				</Avatar.Root>
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content
		class="w-(--bits-dropdown-menu-trigger-width) min-w-56 rounded-lg"
		side="bottom"
		align="end"
		sideOffset={4}
	>
		<DropdownMenu.Label class="p-0 font-normal">
			<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
				<Avatar.Root class="h-8 w-8 rounded-lg">
					<Avatar.Image src={user.avatar} alt={user.name} />
					<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
				</Avatar.Root>
				<div class="grid flex-1 text-left text-sm leading-tight">
					<span class="truncate font-medium">{user.name}</span>
					<span class="text-muted-foreground truncate text-xs">
						{user.email}
					</span>
				</div>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<SparklesIcon />
				Upgrade to Pro
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<BadgeCheckIcon />
				Account
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<CreditCardIcon />
				Billing
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<BellIcon />
				Notifications
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			<LogOutIcon />
			Log out
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
