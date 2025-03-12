<script lang="ts">
	import CirclePlus from "@lucide/svelte/icons/circle-plus";
	import Cloud from "@lucide/svelte/icons/cloud";
	import CreditCard from "@lucide/svelte/icons/credit-card";
	import Github from "@lucide/svelte/icons/github";
	import Keyboard from "@lucide/svelte/icons/keyboard";
	import LifeBuoy from "@lucide/svelte/icons/life-buoy";
	import LogOut from "@lucide/svelte/icons/log-out";
	import Mail from "@lucide/svelte/icons/mail";
	import MessageSquare from "@lucide/svelte/icons/message-square";
	import Plus from "@lucide/svelte/icons/plus";
	import Settings from "@lucide/svelte/icons/settings";
	import User from "@lucide/svelte/icons/user";
	import UserPlus from "@lucide/svelte/icons/user-plus";
	import Users from "@lucide/svelte/icons/users";

	import * as DropdownMenu from "$lib/registry/default/ui/dropdown-menu/index.js";
	import { buttonVariants } from "$lib/registry/default/ui/button/index.js";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: "outline" })}>Open</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>My Account</DropdownMenu.GroupHeading>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item>
					<User class="mr-2 size-4" />
					<span>Profile</span>
					<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<CreditCard class="mr-2 size-4" />
					<span>Billing</span>
					<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<Settings class="mr-2 size-4" />
					<span>Settings</span>
					<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<Keyboard class="mr-2 size-4" />
					<span>Keyboard shortcuts</span>
					<DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item>
					<Users class="mr-2 size-4" />
					<span>Team</span>
				</DropdownMenu.Item>
				<DropdownMenu.Sub>
					<DropdownMenu.SubTrigger>
						<UserPlus class="mr-2 size-4" />
						<span>Invite users</span>
					</DropdownMenu.SubTrigger>
					<DropdownMenu.SubContent>
						<DropdownMenu.Item>
							<Mail class="mr-2 size-4" />
							<span>Email</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<MessageSquare class="mr-2 size-4" />
							<span>Message</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<CirclePlus class="mr-2 size-4" />
							<span>More...</span>
						</DropdownMenu.Item>
					</DropdownMenu.SubContent>
				</DropdownMenu.Sub>
				<DropdownMenu.Item>
					<Plus class="mr-2 size-4" />
					<span>New Team</span>
					<DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<Github class="mr-2 size-4" />
				<span>GitHub</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<LifeBuoy class="mr-2 size-4" />
				<span>Support</span>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<Cloud class="mr-2 size-4" />
				<span>API</span>
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item>
				<LogOut class="mr-2 size-4" />
				<span>Log out</span>
				<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
