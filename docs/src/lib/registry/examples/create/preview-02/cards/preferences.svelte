<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const CURRENCIES = [
		{ label: "USD — United States Dollar", value: "usd" },
		{ label: "EUR — Euro", value: "eur" },
		{ label: "GBP — British Pound", value: "gbp" },
		{ label: "JPY — Japanese Yen", value: "jpy" },
	] as const;

	let currency = $state<string>("usd");
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Preferences</Card.Title>
		<Card.Description>Manage your account settings and notifications.</Card.Description>
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
				<Field.Label for="default-currency">Default Currency</Field.Label>
				<Select.Root type="single" bind:value={currency}>
					<Select.Trigger id="default-currency" class="w-full">
						{CURRENCIES.find((c) => c.value === currency)?.label}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each CURRENCIES as item (item.value)}
								<Select.Item value={item.value}>{item.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</Field.Field>
			<Field.Separator class="-my-4" />
			<Field.Field orientation="horizontal">
				<Field.Content>
					<Field.Label for="public-statistics">Public Statistics</Field.Label>
					<Field.Description>
						Allow others to see your total stream count and listening activity
					</Field.Description>
				</Field.Content>
				<Switch id="public-statistics" checked={true} />
			</Field.Field>
			<Field.Separator class="-my-4" />
			<Field.Field orientation="horizontal">
				<Field.Content>
					<Field.Label for="email-notifications">Email Notifications</Field.Label>
					<Field.Description
						>Monthly royalty reports and distribution updates</Field.Description
					>
				</Field.Content>
				<Switch id="email-notifications" checked={true} />
			</Field.Field>
		</Field.Group>
	</Card.Content>
	<Card.Footer>
		<Button variant="outline">Reset</Button>
		<Button class="ml-auto">Save Preferences</Button>
	</Card.Footer>
</Card.Root>
