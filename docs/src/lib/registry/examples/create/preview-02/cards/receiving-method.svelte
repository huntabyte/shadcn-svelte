<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Card.Root>
	<Card.Header>
		<Card.Description>Payout Preferences</Card.Description>
		<Card.Title>Receiving Method</Card.Title>
		<Card.Action>
			<Button variant="ghost" size="icon-sm" class="bg-muted">
				<IconPlaceholder
					lucide="XIcon"
					tabler="IconX"
					hugeicons="Cancel01Icon"
					phosphor="XIcon"
					remixicon="RiCloseLine"
				/>
			</Button>
		</Card.Action>
	</Card.Header>
	<Card.Content>
		<Field.Group>
			<Field.Field>
				<Field.Label for="account-holder">Account Holder Name</Field.Label>
				<Input id="account-holder" value="Synthetic Horizons Music LLC" />
			</Field.Field>
			<Field.Set>
				<Field.Legend variant="label">Receiving Method</Field.Legend>
				<RadioGroup.Root value="bank" class="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
					<Field.Label for="method-bank">
						<Field.Field orientation="horizontal" class="pb-2.5">
							<RadioGroup.Item value="bank" id="method-bank" />
							<Field.Content>
								<Field.Description class="font-medium text-foreground">Bank Transfer</Field.Description>
								<Field.Description>SWIFT / IBAN</Field.Description>
							</Field.Content>
						</Field.Field>
					</Field.Label>
					<Field.Label for="method-paypal">
						<Field.Field orientation="horizontal" class="pb-2.5">
							<RadioGroup.Item value="paypal" id="method-paypal" />
							<Field.Content>
								<Field.Description class="font-medium text-foreground">PayPal</Field.Description>
								<Field.Description class="line-clamp-1">Instant Payout</Field.Description>
							</Field.Content>
						</Field.Field>
					</Field.Label>
				</RadioGroup.Root>
			</Field.Set>
			<Field.Field>
				<Field.Label for="iban">IBAN / Account Number</Field.Label>
				<Input id="iban" placeholder="DE89 3704 0044 ...." />
			</Field.Field>
		</Field.Group>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full" disabled>Save Payout Settings</Button>
	</Card.Footer>
</Card.Root>
