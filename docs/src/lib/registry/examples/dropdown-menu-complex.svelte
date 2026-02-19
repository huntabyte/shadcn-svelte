<script lang="ts">
	import UserIcon from "@lucide/svelte/icons/user";
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import UsersIcon from "@lucide/svelte/icons/users";
	import PlusCircleIcon from "@lucide/svelte/icons/plus-circle";
	import LogOutIcon from "@lucide/svelte/icons/log-out";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<button
				{...props}
				class="rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
			>
				<Avatar.Root>
					<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
					<Avatar.Fallback>CN</Avatar.Fallback>
				</Avatar.Root>
			</button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56" align="end">
		<DropdownMenu.Label class="font-normal">
			<div class="flex flex-col space-y-1">
				<p class="text-sm font-medium leading-none">shadcn</p>
				<p class="text-xs leading-none text-muted-foreground">m@example.com</p>
			</div>
		</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<UserIcon />
				Profile
				<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<CreditCardIcon />
				Billing
				<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<SettingsIcon />
				Settings
				<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<UsersIcon />
				Team
			</DropdownMenu.Item>
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>
					<PlusCircleIcon />
					Invite users
				</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent>
					<DropdownMenu.Item>Email</DropdownMenu.Item>
					<DropdownMenu.Item>Message</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>More...</DropdownMenu.Item>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			<LogOutIcon />
			Log out
			<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
