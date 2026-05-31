<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Avatar">
	<div class="flex items-center justify-between gap-4">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button
						variant="outline"
						class="h-12 justify-start px-2 md:max-w-[200px]"
						{...props}
					>
						<Avatar.Root>
							<Avatar.Image src="https://github.com/shadcn.png" alt="Shadcn" />
							<Avatar.Fallback class="rounded-lg">CN</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-semibold">shadcn</span>
							<span class="text-muted-foreground truncate text-xs">
								shadcn@example.com
							</span>
						</div>
						<IconPlaceholder
							lucide="ChevronsUpDownIcon"
							tabler="IconSelector"
							hugeicons="UnfoldMoreIcon"
							phosphor="CaretUpDownIcon"
							remixicon="RiArrowUpDownLine"
							class="text-muted-foreground ml-auto"
						/>
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-(--anchor-width) min-w-56">
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="BadgeCheckIcon"
							tabler="IconRosetteDiscountCheck"
							hugeicons="CheckmarkBadgeIcon"
							phosphor="CheckCircleIcon"
							remixicon="RiCheckboxCircleLine"
						/>
						Account
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
							lucide="BellIcon"
							tabler="IconBell"
							hugeicons="NotificationIcon"
							phosphor="BellIcon"
							remixicon="RiNotificationLine"
						/>
						Notifications
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<IconPlaceholder
						lucide="LogOutIcon"
						tabler="IconLogout"
						hugeicons="LogoutIcon"
						phosphor="SignOutIcon"
						remixicon="RiLogoutBoxLine"
					/>
					Sign Out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button variant="ghost" size="icon" class="rounded-full" {...props}>
						<Avatar.Root>
							<Avatar.Image src="https://github.com/shadcn.png" alt="shadcn" />
							<Avatar.Fallback>LR</Avatar.Fallback>
						</Avatar.Root>
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="end" side="top">
				<DropdownMenu.Group>
					<DropdownMenu.Item>
						<IconPlaceholder
							lucide="BadgeCheckIcon"
							tabler="IconRosetteDiscountCheck"
							hugeicons="CheckmarkBadgeIcon"
							phosphor="CheckCircleIcon"
							remixicon="RiCheckboxCircleLine"
						/>
						Account
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
							lucide="BellIcon"
							tabler="IconBell"
							hugeicons="NotificationIcon"
							phosphor="BellIcon"
							remixicon="RiNotificationLine"
						/>
						Notifications
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item>
					<IconPlaceholder
						lucide="LogOutIcon"
						tabler="IconLogout"
						hugeicons="LogoutIcon"
						phosphor="SignOutIcon"
						remixicon="RiLogoutBoxLine"
					/>
					Sign Out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</Example>
