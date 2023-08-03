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

	import { Button } from "$components/ui/button";
	import { DropdownMenu } from "$components/ui/dropdown-menu";
</script>

<DropdownMenu>
	<DropdownMenu.Trigger asChild let:trigger>
		<Button builders={[trigger]} variant="outline">Open</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-56">
		<DropdownMenu.Item>
			<User class="mr-2 h-4 w-4" />
			<span>Profile</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item>
			<CreditCard class="mr-2 h-4 w-4" />
			<span>Billing</span>
		</DropdownMenu.Item>
		<DropdownMenu.Item>
			<Settings class="mr-2 h-4 w-4" />
			<span>Settings</span>
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu>
