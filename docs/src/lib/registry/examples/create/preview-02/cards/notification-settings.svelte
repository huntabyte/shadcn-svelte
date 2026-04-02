<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";

	const NOTIFICATIONS = [
		{
			id: "transactions",
			label: "Transaction alerts",
			description: "Deposits, withdrawals, and transfers.",
			defaultChecked: true,
		},
		{
			id: "security",
			label: "Security alerts",
			description: "Login attempts and account changes.",
			defaultChecked: true,
		},
		{
			id: "goals",
			label: "Goal milestones",
			description: "Updates at 25%, 50%, 75%, and 100%.",
			defaultChecked: false,
		},
		{
			id: "market",
			label: "Market updates",
			description: "Daily portfolio summary and price alerts.",
			defaultChecked: false,
		},
	];

	let checkedMap = $state<Record<string, boolean>>(
		Object.fromEntries(NOTIFICATIONS.map((n) => [n.id, n.defaultChecked]))
	);

	const allChecked = $derived(NOTIFICATIONS.every((n) => checkedMap[n.id]));
	const someChecked = $derived(NOTIFICATIONS.some((n) => checkedMap[n.id]) && !allChecked);

	function setAll(value: boolean) {
		checkedMap = Object.fromEntries(NOTIFICATIONS.map((n) => [n.id, value]));
	}

	function setOne(id: string, value: boolean) {
		checkedMap = { ...checkedMap, [id]: value };
	}
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Notifications</Card.Title>
		<Card.Description>Choose what you want to be notified about.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Field.Group>
			<Field.Field orientation="horizontal">
				<Checkbox
					id="notify-all"
					checked={allChecked}
					indeterminate={someChecked}
					onCheckedChange={(v) => setAll(!!v)}
				/>
				<Field.Content>
					<Field.Label for="notify-all">Select all</Field.Label>
				</Field.Content>
			</Field.Field>
			{#each NOTIFICATIONS as n (n.id)}
				<Field.Field orientation="horizontal">
					<Checkbox
						id={"notify-" + n.id}
						checked={checkedMap[n.id]}
						onCheckedChange={(v) => setOne(n.id, !!v)}
					/>
					<Field.Content>
						<Field.Label for={"notify-" + n.id}>{n.label}</Field.Label>
						<Field.Description>{n.description}</Field.Description>
					</Field.Content>
				</Field.Field>
			{/each}
		</Field.Group>
	</Card.Content>
	<Card.Footer>
		<Button class="w-full">Save Preferences</Button>
	</Card.Footer>
</Card.Root>
