<script lang="ts">
	import {
		Cloud,
		CreditCard,
		Github,
		Keyboard,
		LifeBuoy,
		LogOut,
		Mail,
		MessageSquare,
		Plus,
		PlusCircle,
		Settings,
		User,
		UserPlus,
		Users
	} from "lucide-svelte";

	import { Button } from "@/registry/default/ui/button";
	import * as DropdownMenu from "@/registry/default/ui/dropdown-menu";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">Open</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Label>My Account</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<User class="mr-2 h-4 w-4" />
				<span>Profile</span>
				<DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<CreditCard class="mr-2 h-4 w-4" />
				<span>Billing</span>
				<DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<Settings class="mr-2 h-4 w-4" />
				<span>Settings</span>
				<DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<Keyboard class="mr-2 h-4 w-4" />
				<span>Keyboard shortcuts</span>
				<DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<Users class="mr-2 h-4 w-4" />
				<span>Team</span>
			</DropdownMenu.Item>
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>
					<UserPlus class="mr-2 h-4 w-4" />
					<span>Invite users</span>
				</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent>
					<DropdownMenu.Item>
						<Mail class="mr-2 h-4 w-4" />
						<span>Email</span>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<MessageSquare class="mr-2 h-4 w-4" />
						<span>Message</span>
					</DropdownMenu.Item>
					<DropdownMenu.Item>
						<PlusCircle class="mr-2 h-4 w-4" />
						<span>More...</span>
					</DropdownMenu.Item>
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>
			<DropdownMenu.Item>
				<Plus class="mr-2 h-4 w-4" />
				<span>New Team</span>
				<DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			<Github class="mr-2 h-4 w-4" />
			<span>GitHub</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item>
			<LifeBuoy class="mr-2 h-4 w-4" />
			<span>Support</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item>
			<Cloud class="mr-2 h-4 w-4" />
			<span>API</span>
		</DropdownMenu.Item>
		<DropdownMenu.Separator />
		<DropdownMenu.Item>
			<LogOut class="mr-2 h-4 w-4" />
			<span>Log out</span>
			<DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
