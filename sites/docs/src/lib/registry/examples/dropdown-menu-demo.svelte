<script lang="ts">
	import CirclePlusIcon from "@lucide/svelte/icons/circle-plus";
	import CloudIcon from "@lucide/svelte/icons/cloud";
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";
	import GithubIcon from "@lucide/svelte/icons/github";
	import KeyboardIcon from "@lucide/svelte/icons/keyboard";
	import LifeBuoyIcon from "@lucide/svelte/icons/life-buoy";
	import LogOutIcon from "@lucide/svelte/icons/log-out";
	import MailIcon from "@lucide/svelte/icons/mail";
	import MessageSquareIcon from "@lucide/svelte/icons/message-square";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import UserIcon from "@lucide/svelte/icons/user";
	import UserPlusIcon from "@lucide/svelte/icons/user-plus";
	import UsersIcon from "@lucide/svelte/icons/users";

	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: "outline" })}>Open</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Group>
			<DropdownMenu.Label>My Account</DropdownMenu.Label>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item>
					<UserIcon />
					<span>Profile</span>
					<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<CreditCardIcon />
					<span>Billing</span>
					<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<SettingsIcon />
					<span>Settings</span>
					<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<KeyboardIcon />
					<span>Keyboard shortcuts</span>
					<DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item>
					<UsersIcon />
					<span>Team</span>
				</DropdownMenu.Item>
				<DropdownMenu.Sub>
					<DropdownMenu.SubTrigger>
						<UserPlusIcon />
						<span>Invite users</span>
					</DropdownMenu.SubTrigger>
					<DropdownMenu.SubContent>
						<DropdownMenu.Item>
							<MailIcon />
							<span>Email</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<MessageSquareIcon />
							<span>Message</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<CirclePlusIcon />
							<span>More...</span>
						</DropdownMenu.Item>
					</DropdownMenu.SubContent>
				</DropdownMenu.Sub>
				<DropdownMenu.Item>
					<PlusIcon />
					<span>New Team</span>
					<DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<GithubIcon />
				<span>GitHub</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<LifeBuoyIcon />
				<span>Support</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<CloudIcon />
				<span>API</span>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<LogOutIcon />
				<span>Log out</span>
				<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
