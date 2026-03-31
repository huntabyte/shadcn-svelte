<script lang="ts">
	import * as Breadcrumb from "$lib/registry/ui/breadcrumb/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Card.Root>
	<Card.Header class="flex flex-col gap-3">
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link href="#/">Home</Breadcrumb.Link>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Button size="icon-sm" variant="ghost" {...props}>
									<IconPlaceholder
										lucide="MoreHorizontalIcon"
										tabler="IconDots"
										hugeicons="MoreHorizontalCircle01Icon"
										phosphor="DotsThreeIcon"
										remixicon="RiMoreLine"
									/>
									<span class="sr-only">Account options</span>
								</Button>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="start">
							<DropdownMenu.Group>
								<DropdownMenu.Item>Profile</DropdownMenu.Item>
								<DropdownMenu.Item>Statements</DropdownMenu.Item>
								<DropdownMenu.Item>Documents</DropdownMenu.Item>
							</DropdownMenu.Group>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Breadcrumb.Item>
				<Breadcrumb.Separator />
				<Breadcrumb.Item>
					<Breadcrumb.Page>Payments</Breadcrumb.Page>
				</Breadcrumb.Item>
			</Breadcrumb.List>
		</Breadcrumb.Root>
	</Card.Header>
	<Card.Content>
		<Item.Group>
			<Item.Root variant="muted">
				{#snippet child({ props })}
					<a href="#/" {...props}>
						<Item.Media variant="icon">
							<IconPlaceholder
								lucide="GaugeIcon"
								tabler="IconGauge"
								hugeicons="Settings01Icon"
								phosphor="GaugeIcon"
								remixicon="RiDashboardLine"
							/>
						</Item.Media>
						<Item.Content>
							<Item.Title>Change transfer limit</Item.Title>
							<Item.Description>Adjust how much you can send from your balance.</Item.Description>
						</Item.Content>
						<IconPlaceholder
							lucide="ChevronRightIcon"
							tabler="IconChevronRight"
							hugeicons="ArrowRight01Icon"
							phosphor="CaretRightIcon"
							remixicon="RiArrowRightSLine"
							class="text-muted-foreground size-4 shrink-0"
						/>
					</a>
				{/snippet}
			</Item.Root>
			<Item.Root variant="muted">
				{#snippet child({ props })}
					<a href="#/" {...props}>
						<Item.Media variant="icon">
							<IconPlaceholder
								lucide="CalendarIcon"
								tabler="IconCalendar"
								hugeicons="Calendar03Icon"
								phosphor="CalendarIcon"
								remixicon="RiCalendarLine"
							/>
						</Item.Media>
						<Item.Content>
							<Item.Title>Scheduled transfers</Item.Title>
							<Item.Description>Set up a transfer to send at a later date.</Item.Description>
						</Item.Content>
						<IconPlaceholder
							lucide="ChevronRightIcon"
							tabler="IconChevronRight"
							hugeicons="ArrowRight01Icon"
							phosphor="CaretRightIcon"
							remixicon="RiArrowRightSLine"
							class="text-muted-foreground size-4 shrink-0"
						/>
					</a>
				{/snippet}
			</Item.Root>
			<Item.Root variant="muted">
				{#snippet child({ props })}
					<a href="#/" {...props}>
						<Item.Media variant="icon">
							<IconPlaceholder
								lucide="RepeatIcon"
								tabler="IconRepeat"
								hugeicons="RepeatIcon"
								phosphor="RepeatIcon"
								remixicon="RiRepeatLine"
							/>
						</Item.Media>
						<Item.Content>
							<Item.Title>Direct Debits</Item.Title>
							<Item.Description>Set up and manage regular payments.</Item.Description>
						</Item.Content>
						<IconPlaceholder
							lucide="ChevronRightIcon"
							tabler="IconChevronRight"
							hugeicons="ArrowRight01Icon"
							phosphor="CaretRightIcon"
							remixicon="RiArrowRightSLine"
							class="text-muted-foreground size-4 shrink-0"
						/>
					</a>
				{/snippet}
			</Item.Root>
			<Item.Root variant="muted">
				{#snippet child({ props })}
					<a href="#/" {...props}>
						<Item.Media variant="icon">
							<IconPlaceholder
								lucide="RefreshCwIcon"
								tabler="IconRefresh"
								hugeicons="RepeatIcon"
								phosphor="ArrowsClockwiseIcon"
								remixicon="RiRefreshLine"
							/>
						</Item.Media>
						<Item.Content>
							<Item.Title>Recurring card payments</Item.Title>
							<Item.Description>Manage your repeated card transactions.</Item.Description>
						</Item.Content>
						<IconPlaceholder
							lucide="ChevronRightIcon"
							tabler="IconChevronRight"
							hugeicons="ArrowRight01Icon"
							phosphor="CaretRightIcon"
							remixicon="RiArrowRightSLine"
							class="text-muted-foreground size-4 shrink-0"
						/>
					</a>
				{/snippet}
			</Item.Root>
		</Item.Group>
	</Card.Content>
</Card.Root>
