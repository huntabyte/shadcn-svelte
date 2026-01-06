<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Item from "$lib/registry/ui/item/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { CalendarDate, DateFormatter, getLocalTimeZone } from "@internationalized/date";

	const billingItems = [
		{
			month: "November 2025",
			invoiceDate: new CalendarDate(2025, 11, 5),
			amount: "$10.00",
			status: "Paid" as const,
		},
		{
			month: "October 2025",
			invoiceDate: new CalendarDate(2025, 10, 4),
			amount: "$10.00",
			status: "Paid" as const,
		},
		{
			month: "September 2025",
			invoiceDate: new CalendarDate(2025, 9, 4),
			amount: "$10.00",
			status: "Paid" as const,
		},
	];

	const dateFormatter = new DateFormatter("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
</script>

<Example title="Billing" class="items-center lg:p-16" containerClass="col-span-full">
	<Item.Group class="max-w-7xl gap-0 rounded-lg border">
		{#each billingItems as item, index (item.month)}
			<Item.Root class="grid grid-cols-[1fr_auto] lg:grid-cols-[2fr_1fr_1fr_auto]">
				<Item.Content>
					<Item.Title>
						{item.month}
						<Badge
							variant="secondary"
							class="bg-green-100 text-green-700 hover:bg-green-100"
						>
							{item.status}
						</Badge>
					</Item.Title>
					<Item.Description>Infrastructure usage & Vercel platform</Item.Description>
				</Item.Content>
				<Item.Content class="hidden lg:flex">
					<Item.Title>Total Due</Item.Title>
					<Item.Description>{item.amount}</Item.Description>
				</Item.Content>
				<Item.Content class="hidden lg:flex">
					<Item.Description>
						Invoiced {dateFormatter.format(item.invoiceDate.toDate(getLocalTimeZone()))}
					</Item.Description>
				</Item.Content>
				<Item.Actions>
					<DropdownMenu.Root>
						<DropdownMenu.Trigger>
							{#snippet child({ props })}
								<Button variant="ghost" size="icon" {...props}>
									<IconPlaceholder
										lucide="MoreHorizontalIcon"
										tabler="IconDots"
										hugeicons="MoreHorizontalCircle01Icon"
										phosphor="DotsThreeOutlineIcon"
									/>
									<span class="sr-only">More options</span>
								</Button>
							{/snippet}
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Item>View invoice</DropdownMenu.Item>
							<DropdownMenu.Item>Download PDF</DropdownMenu.Item>
							<DropdownMenu.Separator />
							<DropdownMenu.Item>Contact support</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</Item.Actions>
				<Item.Footer class="col-span-full w-full border-t pt-4 lg:hidden">
					<Item.Content>
						<Item.Title>Total Due</Item.Title>
						<Item.Description>{item.amount}</Item.Description>
					</Item.Content>
					<Item.Content>
						<Item.Description>
							Invoiced {dateFormatter.format(
								item.invoiceDate.toDate(getLocalTimeZone())
							)}
						</Item.Description>
					</Item.Content>
				</Item.Footer>
			</Item.Root>
			{#if index !== billingItems.length - 1}
				<Item.Separator class="my-0" />
			{/if}
		{/each}
	</Item.Group>
</Example>
