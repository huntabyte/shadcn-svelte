<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import {
		Breadcrumb,
		BreadcrumbItem,
		BreadcrumbLink,
		BreadcrumbList,
		BreadcrumbPage,
		BreadcrumbSeparator,
	} from "$lib/registry/ui/breadcrumb/index.js";
	import { Card, CardContent, CardHeader } from "$lib/registry/ui/card/index.js";
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuItem,
		DropdownMenuTrigger,
	} from "$lib/registry/ui/dropdown-menu/index.js";
	import {
		Item,
		ItemContent,
		ItemDescription,
		ItemGroup,
		ItemMedia,
		ItemTitle,
	} from "$lib/registry/ui/item/index.js";
</script>

<Card>
	<CardHeader class="flex flex-col gap-3">
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator></BreadcrumbSeparator>
				<BreadcrumbItem>
					<DropdownMenu>
						<DropdownMenuTrigger
							class="cn-button cn-button-variant-ghost cn-button-size-icon-sm"
							aria-label="Account options"
						>
							<IconPlaceholder
								lucide="MoreHorizontalIcon"
								tabler="IconDots"
								hugeicons="MoreHorizontalCircle01Icon"
								phosphor="DotsThreeIcon"
								remixicon="RiMoreLine"
							/>
							<span class="sr-only">Account options</span>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="start" portalProps={{ disabled: true }}>
							<DropdownMenuGroup>
								<DropdownMenuItem>Profile</DropdownMenuItem>
								<DropdownMenuItem>Statements</DropdownMenuItem>
								<DropdownMenuItem>Documents</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</BreadcrumbItem>
				<BreadcrumbSeparator></BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>Payments</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	</CardHeader>
	<CardContent>
		<ItemGroup>
			<div role="listitem" class="w-full">
				<Item variant="muted">
					<ItemMedia variant="icon">
						<IconPlaceholder
							lucide="SettingsIcon"
							tabler="IconSettings"
							hugeicons="Settings01Icon"
							phosphor="GearIcon"
							remixicon="RiSettingsLine"
						/>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Change transfer limit</ItemTitle>
						<ItemDescription>
							Adjust how much you can send from your balance.
						</ItemDescription>
					</ItemContent>
					<IconPlaceholder
						lucide="ArrowRightIcon"
						tabler="IconArrowRight"
						hugeicons="ArrowRight01Icon"
						phosphor="ArrowRightIcon"
						remixicon="RiArrowRightLine"
						class="text-muted-foreground size-4 shrink-0"
					/>
				</Item>
			</div>
			<div role="listitem" class="w-full">
				<Item variant="muted">
					<ItemMedia variant="icon">
						<IconPlaceholder
							lucide="CalendarIcon"
							tabler="IconCalendar"
							hugeicons="Calendar03Icon"
							phosphor="CalendarIcon"
							remixicon="RiCalendarLine"
						/>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Scheduled transfers</ItemTitle>
						<ItemDescription>
							Set up a transfer to send at a later date.
						</ItemDescription>
					</ItemContent>
					<IconPlaceholder
						lucide="ArrowRightIcon"
						tabler="IconArrowRight"
						hugeicons="ArrowRight01Icon"
						phosphor="ArrowRightIcon"
						remixicon="RiArrowRightLine"
						class="text-muted-foreground size-4 shrink-0"
					/>
				</Item>
			</div>
			<div role="listitem" class="w-full">
				<Item variant="muted">
					<ItemMedia variant="icon">
						<IconPlaceholder
							lucide="RefreshCwIcon"
							tabler="IconRefresh"
							hugeicons="RefreshIcon"
							phosphor="ArrowsClockwiseIcon"
							remixicon="RiRefreshLine"
						/>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Recurring card payments</ItemTitle>
						<ItemDescription>Manage your repeated card transactions.</ItemDescription>
					</ItemContent>
					<IconPlaceholder
						lucide="ArrowRightIcon"
						tabler="IconArrowRight"
						hugeicons="ArrowRight01Icon"
						phosphor="ArrowRightIcon"
						remixicon="RiArrowRightLine"
						class="text-muted-foreground size-4 shrink-0"
					/>
				</Item>
			</div>
		</ItemGroup>
	</CardContent>
</Card>
