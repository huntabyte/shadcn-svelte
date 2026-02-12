<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Icons">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" class="w-fit" {...props}>Open</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Item>
				<IconPlaceholder
					lucide="UserIcon"
					tabler="IconUser"
					hugeicons="UserIcon"
					phosphor="UserIcon"
					remixicon="RiUserLine"
				/>
				Profile
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<IconPlaceholder
					lucide="CreditCardIcon"
					tabler="IconCreditCard"
					hugeicons="CreditCardIcon"
					phosphor="CreditCardIcon"
					remixicon="RiBankCardLine"
				/>
				Billing
			</DropdownMenu.Item>
			<DropdownMenu.Item>
				<IconPlaceholder
					lucide="SettingsIcon"
					tabler="IconSettings"
					hugeicons="SettingsIcon"
					phosphor="GearIcon"
					remixicon="RiSettingsLine"
				/>
				Settings
			</DropdownMenu.Item>
			<DropdownMenu.Separator />
			<DropdownMenu.Item variant="destructive">
				<IconPlaceholder
					lucide="LogOutIcon"
					tabler="IconLogout"
					hugeicons="LogoutIcon"
					phosphor="SignOutIcon"
					remixicon="RiLogoutBoxLine"
				/>
				Log out
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</Example>
