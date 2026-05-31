<script lang="ts">
	import {
		ArrowRight01Icon,
		Calendar03Icon,
		MoreHorizontalCircle01Icon,
		RefreshIcon,
		Settings01Icon,
	} from "@hugeicons/core-free-icons";
	import { HugeiconsIcon } from "@hugeicons/svelte";
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
							<HugeiconsIcon icon={MoreHorizontalCircle01Icon} stroke-width={2}
							></HugeiconsIcon>
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
						<HugeiconsIcon icon={Settings01Icon} stroke-width={2}></HugeiconsIcon>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Change transfer limit</ItemTitle>
						<ItemDescription>
							Adjust how much you can send from your balance.
						</ItemDescription>
					</ItemContent>
					<HugeiconsIcon
						icon={ArrowRight01Icon}
						class="text-muted-foreground size-4 shrink-0"
						stroke-width={2}
					></HugeiconsIcon>
				</Item>
			</div>
			<div role="listitem" class="w-full">
				<Item variant="muted">
					<ItemMedia variant="icon">
						<HugeiconsIcon icon={Calendar03Icon} stroke-width={2}></HugeiconsIcon>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Scheduled transfers</ItemTitle>
						<ItemDescription>
							Set up a transfer to send at a later date.
						</ItemDescription>
					</ItemContent>
					<HugeiconsIcon
						icon={ArrowRight01Icon}
						class="text-muted-foreground size-4 shrink-0"
						stroke-width={2}
					></HugeiconsIcon>
				</Item>
			</div>
			<div role="listitem" class="w-full">
				<Item variant="muted">
					<ItemMedia variant="icon">
						<HugeiconsIcon icon={RefreshIcon} stroke-width={2}></HugeiconsIcon>
					</ItemMedia>
					<ItemContent>
						<ItemTitle>Recurring card payments</ItemTitle>
						<ItemDescription>Manage your repeated card transactions.</ItemDescription>
					</ItemContent>
					<HugeiconsIcon
						icon={ArrowRight01Icon}
						class="text-muted-foreground size-4 shrink-0"
						stroke-width={2}
					></HugeiconsIcon>
				</Item>
			</div>
		</ItemGroup>
	</CardContent>
</Card>
