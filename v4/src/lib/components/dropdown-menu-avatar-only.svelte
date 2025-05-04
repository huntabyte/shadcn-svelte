<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import SparklesIcon from "@lucide/svelte/icons/sparkles";
	import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";
	import BellIcon from "@lucide/svelte/icons/bell";
	import LogOutIcon from "@lucide/svelte/icons/log-out";
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline" class="size-8 rounded-full border-none p-0">
				<Avatar.Root>
					<Avatar.Image src="https://github.com/leerob.png" alt="leerob" />
					<Avatar.Fallback class="rounded-lg">LR</Avatar.Fallback>
				</Avatar.Root>
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-(--bits-dropdown-menu-anchor-width) min-w-56" align="start">
		<DropdownMenu.Label class="p-0 font-normal">
			<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
				<Avatar.Root>
					<Avatar.Image src="https://github.com/leerob.png" alt="leerob" />
					<Avatar.Fallback class="rounded-lg">LR</Avatar.Fallback>
				</Avatar.Root>
				<div class="grid flex-1 text-left text-sm leading-tight">
					<span class="truncate font-semibold">leerob</span>
					<span class="text-muted-foreground truncate text-xs"> leerob@example.com </span>
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
			Sign Out
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
