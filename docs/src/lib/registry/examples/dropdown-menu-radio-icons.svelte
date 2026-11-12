<script lang="ts">
	import Building2Icon from "@lucide/svelte/icons/building-2";
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";
	import WalletIcon from "@lucide/svelte/icons/wallet";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";

	let paymentMethod = $state("card");
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: "outline" })}>
		Payment Method
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="min-w-56">
		<DropdownMenu.Group>
			<DropdownMenu.Label>Select Payment Method</DropdownMenu.Label>
			<DropdownMenu.RadioGroup bind:value={paymentMethod}>
				<DropdownMenu.RadioItem value="card">
					<CreditCardIcon />
					Credit Card
				</DropdownMenu.RadioItem>
				<DropdownMenu.RadioItem value="paypal">
					<WalletIcon />
					PayPal
				</DropdownMenu.RadioItem>
				<DropdownMenu.RadioItem value="bank">
					<Building2Icon />
					Bank Transfer
				</DropdownMenu.RadioItem>
			</DropdownMenu.RadioGroup>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
