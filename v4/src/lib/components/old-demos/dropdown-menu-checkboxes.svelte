<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import UserIcon from "@lucide/svelte/icons/user";
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";
	import Settings2Icon from "@lucide/svelte/icons/settings-2";
	import LogOutIcon from "@lucide/svelte/icons/log-out";
	let showStatusBar = $state(true);
	let showActivityBar = $state(false);
	let showPanel = $state(false);
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">Checkboxes</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="start" class="w-56">
		<DropdownMenu.Group>
			<DropdownMenu.Label>Account</DropdownMenu.Label>
			<DropdownMenu.Item>
				<UserIcon /> Profile
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<CreditCardIcon /> Billing
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<Settings2Icon /> Settings
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Label>Appearance</DropdownMenu.Label>
			<DropdownMenu.CheckboxItem bind:checked={showStatusBar}>
				Status Bar
			</DropdownMenu.CheckboxItem>
			<DropdownMenu.CheckboxItem bind:checked={showActivityBar} disabled>
				Activity Bar
			</DropdownMenu.CheckboxItem>
			<DropdownMenu.CheckboxItem bind:checked={showPanel}>Panel</DropdownMenu.CheckboxItem>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Group>
			<DropdownMenu.Item>
				<LogOutIcon /> Sign Out
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
