<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Drawer from "$lib/registry/ui/drawer/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { IsMobile } from "$lib/registry/hooks/is-mobile.svelte.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Button, buttonVariants } from "$lib/registry/ui/button/index.js";

	const deliveryTimes = [
		{
			value: "asap",
			id: "delivery-asap",
			label: "Standard delivery",
			description: "25–35 min · Driver assigned now",
			badge: "Fastest",
		},
		{
			value: "5-00",
			id: "delivery-5-00",
			label: "5:00 PM – 5:15 PM",
			description: "Prep starts at 4:45 PM",
		},
		{
			value: "5-30",
			id: "delivery-5-30",
			label: "5:30 PM – 5:45 PM",
			description: "Good if you're heading home",
		},
		{
			value: "6-00",
			id: "delivery-6-00",
			label: "6:00 PM – 6:15 PM",
			description: "Most popular · High demand",
		},
		{
			value: "6-30",
			id: "delivery-6-30",
			label: "6:30 PM – 6:45 PM",
			description: "Last slot before kitchen closes",
		},
	];

	let open = $state(false);
	let deliveryTime = $state("asap");
	const isMobile = new IsMobile();

	function handleConfirm() {
		const selected = deliveryTimes.find((time) => time.value === deliveryTime);

		if (!selected) {
			return;
		}

		open = false;
		toast("Delivery time confirmed", {
			description: selected.label,
		});
	}
</script>

<Drawer.Root bind:open direction={isMobile.current ? "bottom" : "right"}>
	<Drawer.Trigger class={buttonVariants({ variant: "secondary" })}>Open Drawer</Drawer.Trigger>
	<Drawer.Content>
		<Drawer.Header>
			<Drawer.Title>Pick a delivery time</Drawer.Title>
			<Drawer.Description>We&apos;ll prepare your order as soon as possible.</Drawer.Description>
		</Drawer.Header>
		<div class="flex-1 overflow-y-auto p-4">
			<RadioGroup.Root bind:value={deliveryTime} class="gap-2">
				{#each deliveryTimes as time (time.value)}
					<Field.Label for={time.id}>
						<Field.Field orientation="horizontal">
							<Field.Content>
								<Field.Title class="flex items-center gap-2">
									{time.label}
									{#if time.badge}
										<Badge variant="secondary">{time.badge}</Badge>
									{/if}
								</Field.Title>
								<Field.Description>{time.description}</Field.Description>
							</Field.Content>
							<RadioGroup.Item value={time.value} id={time.id} />
						</Field.Field>
					</Field.Label>
				{/each}
			</RadioGroup.Root>
		</div>
		<Drawer.Footer>
			<Button onclick={handleConfirm} class="h-[34px]">Confirm Delivery Time</Button>
			<Drawer.Close class={buttonVariants({ variant: "outline" })}>Cancel</Drawer.Close>
		</Drawer.Footer>
	</Drawer.Content>
</Drawer.Root>
