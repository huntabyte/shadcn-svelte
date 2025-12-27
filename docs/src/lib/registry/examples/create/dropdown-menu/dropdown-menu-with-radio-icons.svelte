<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let paymentMethod = $state("card");
</script>

<Example title="Radio with Icons">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" class="w-fit" {...props}>Payment Method</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="min-w-56">
			<DropdownMenu.Group>
				<DropdownMenu.Label>Select Payment Method</DropdownMenu.Label>
				<DropdownMenu.RadioGroup bind:value={paymentMethod}>
					<DropdownMenu.RadioItem value="card">
						<IconPlaceholder
							lucide="CreditCardIcon"
							tabler="IconCreditCard"
							hugeicons="CreditCardIcon"
							phosphor="CreditCardIcon"
						/>
						Credit Card
					</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="paypal">
						<IconPlaceholder
							lucide="WalletIcon"
							tabler="IconWallet"
							hugeicons="WalletIcon"
							phosphor="WalletIcon"
						/>
						PayPal
					</DropdownMenu.RadioItem>
					<DropdownMenu.RadioItem value="bank">
						<IconPlaceholder
							lucide="Building2Icon"
							tabler="IconBuildingBank"
							hugeicons="BankIcon"
							phosphor="BankIcon"
						/>
						Bank Transfer
					</DropdownMenu.RadioItem>
				</DropdownMenu.RadioGroup>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</Example>
