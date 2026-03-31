<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Empty from "$lib/registry/ui/empty/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Card.Root>
	<Card.Content>
		<Empty.Root class="p-4">
			<Empty.Media variant="icon">
				<IconPlaceholder
					lucide="CreditCardIcon"
					tabler="IconCreditCard"
					hugeicons="CreditCardIcon"
					phosphor="CreditCardIcon"
					remixicon="RiBankCardLine"
				/>
			</Empty.Media>
			<Empty.Header>
				<Empty.Title>Connect Bank</Empty.Title>
				<Empty.Description>
					Link your payout method to receive monthly royalty distributions automatically.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<Button>Set Up Payouts</Button>
			</Empty.Content>
		</Empty.Root>
	</Card.Content>
</Card.Root>
