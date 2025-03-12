<script lang="ts">
	import ChevronLeft from "@lucide/svelte/icons/chevron-left";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import Copy from "@lucide/svelte/icons/copy";
	import CreditCard from "@lucide/svelte/icons/credit-card";

	import EllipsisVertical from "@lucide/svelte/icons/ellipsis-vertical";

	import Truck from "@lucide/svelte/icons/truck";

	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Card from "$lib/registry/new-york/ui/card/index.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";

	import * as Pagination from "$lib/registry/new-york/ui/pagination/index.js";

	import { Separator } from "$lib/registry/new-york/ui/separator/index.js";
</script>

<Card.Root
	class="overflow-hidden"
	data-x-chunk-name="dashboard-05-chunk-4"
	data-x-chunk-description="An order details card with order details, shipping information, customer information and payment information."
>
	<Card.Header class="bg-muted/50 flex flex-row items-start">
		<div class="grid gap-0.5">
			<Card.Title class="group flex items-center gap-2 text-lg">
				Order Oe31b70H
				<Button
					size="icon"
					variant="outline"
					class="size-6 opacity-0 transition-opacity group-hover:opacity-100"
				>
					<Copy class="size-3" />
					<span class="sr-only">Copy Order ID</span>
				</Button>
			</Card.Title>
			<Card.Description>Date: November 23, 2023</Card.Description>
		</div>
		<div class="ml-auto flex items-center gap-1">
			<Button size="sm" variant="outline" class="h-8 gap-1">
				<Truck class="size-3.5" />
				<span class="lg:sr-only xl:not-sr-only xl:whitespace-nowrap"> Track Order </span>
			</Button>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button {...props} size="icon" variant="outline" class="size-8">
							<EllipsisVertical class="size-3.5" />
							<span class="sr-only">More</span>
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Item>Edit</DropdownMenu.Item>
					<DropdownMenu.Item>Export</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item>Trash</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</Card.Header>
	<Card.Content class="p-6 text-sm">
		<div class="grid gap-3">
			<div class="font-semibold">Order Details</div>
			<ul class="grid gap-3">
				<li class="flex items-center justify-between">
					<span class="text-muted-foreground">
						Glimmer Lamps x <span>2</span>
					</span>
					<span>$250.00</span>
				</li>
				<li class="flex items-center justify-between">
					<span class="text-muted-foreground">
						Aqua Filters x <span>1</span>
					</span>
					<span>$49.00</span>
				</li>
			</ul>
			<Separator class="my-2" />
			<ul class="grid gap-3">
				<li class="flex items-center justify-between">
					<span class="text-muted-foreground">Subtotal</span>
					<span>$299.00</span>
				</li>
				<li class="flex items-center justify-between">
					<span class="text-muted-foreground">Shipping</span>
					<span>$5.00</span>
				</li>
				<li class="flex items-center justify-between">
					<span class="text-muted-foreground">Tax</span>
					<span>$25.00</span>
				</li>
				<li class="flex items-center justify-between font-semibold">
					<span class="text-muted-foreground">Total</span>
					<span>$329.00</span>
				</li>
			</ul>
		</div>
		<Separator class="my-4" />
		<div class="grid grid-cols-2 gap-4">
			<div class="grid gap-3">
				<div class="font-semibold">Shipping Information</div>
				<address class="text-muted-foreground grid gap-0.5 not-italic">
					<span>Liam Johnson</span>
					<span>1234 Main St.</span>
					<span>Anytown, CA 12345</span>
				</address>
			</div>
			<div class="grid auto-rows-max gap-3">
				<div class="font-semibold">Billing Information</div>
				<div class="text-muted-foreground">Same as shipping address</div>
			</div>
		</div>
		<Separator class="my-4" />
		<div class="grid gap-3">
			<div class="font-semibold">Customer Information</div>
			<dl class="grid gap-3">
				<div class="flex items-center justify-between">
					<dt class="text-muted-foreground">Customer</dt>
					<dd>Liam Johnson</dd>
				</div>
				<div class="flex items-center justify-between">
					<dt class="text-muted-foreground">Email</dt>
					<dd>
						<a href="mailto:">liam@acme.com</a>
					</dd>
				</div>
				<div class="flex items-center justify-between">
					<dt class="text-muted-foreground">Phone</dt>
					<dd>
						<a href="tel:">+1 234 567 890</a>
					</dd>
				</div>
			</dl>
		</div>
		<Separator class="my-4" />
		<div class="grid gap-3">
			<div class="font-semibold">Payment Information</div>
			<dl class="grid gap-3">
				<div class="flex items-center justify-between">
					<dt class="text-muted-foreground flex items-center gap-1">
						<CreditCard class="size-4" />
						Visa
					</dt>
					<dd>**** **** **** 4532</dd>
				</div>
			</dl>
		</div>
	</Card.Content>
	<Card.Footer class="bg-muted/50 flex flex-row items-center border-t px-6 py-3">
		<div class="text-muted-foreground text-xs">
			Updated <time dateTime="2023-11-23">November 23, 2023</time>
		</div>
		<Pagination.Root count={10} class="ml-auto mr-0 w-auto">
			<Pagination.Content>
				<Pagination.Item>
					<Button size="icon" variant="outline" class="size-6">
						<ChevronLeft class="size-3.5" />
						<span class="sr-only">Previous Order</span>
					</Button>
				</Pagination.Item>
				<Pagination.Item>
					<Button size="icon" variant="outline" class="size-6">
						<ChevronRight class="size-3.5" />
						<span class="sr-only">Next Order</span>
					</Button>
				</Pagination.Item>
			</Pagination.Content>
		</Pagination.Root>
	</Card.Footer>
</Card.Root>
