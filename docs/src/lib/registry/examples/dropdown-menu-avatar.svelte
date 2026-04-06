<script lang="ts">
	import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
	import BellIcon from "@lucide/svelte/icons/bell";
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";
	import LogOutIcon from "@lucide/svelte/icons/log-out";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<button
				{...props}
				class={buttonVariants({ variant: "ghost", size: "icon" }) + " rounded-full"}
			>
				<Avatar.Root>
					<Avatar.Image src="https://github.com/shadcn.png" alt="shadcn" />
					<Avatar.Fallback>LR</Avatar.Fallback>
				</Avatar.Root>
			</button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
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
			Sign Out
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
