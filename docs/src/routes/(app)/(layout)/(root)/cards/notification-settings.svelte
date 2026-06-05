<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "$lib/registry/ui/card/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import {
		Field,
		FieldContent,
		FieldDescription,
		FieldGroup,
		FieldLabel,
	} from "$lib/registry/ui/field/index.js";
	let notifications = $state([
		{
			id: "transactions",
			label: "Transaction alerts",
			description: "Deposits, withdrawals, and transfers.",
			checked: true,
		},
		{
			id: "security",
			label: "Security alerts",
			description: "Login attempts and account changes.",
			checked: true,
		},
		{
			id: "goals",
			label: "Goal milestones",
			description: "Updates at 25%, 50%, 75%, and 100%.",
			checked: false,
		},
		{
			id: "market",
			label: "Market updates",
			description: "Daily portfolio summary and price alerts.",
			checked: false,
		},
	]);
</script>

<Card>
	<CardHeader>
		<CardTitle>Notifications</CardTitle>
		<CardDescription>Choose which email and push alerts you want to receive.</CardDescription>
	</CardHeader>
	<CardContent>
		<FieldGroup>
			{#each notifications as n (n.id)}
				<Field orientation="horizontal">
					<Checkbox id={`notify-${n.id}`} bind:checked={n.checked}></Checkbox>
					<FieldContent>
						<FieldLabel for={`notify-${n.id}`}>{n.label}</FieldLabel>
						<FieldDescription>{n.description}</FieldDescription>
					</FieldContent>
				</Field>
			{/each}
		</FieldGroup>
	</CardContent>
	<CardFooter>
		<Button class="w-full">Save Preferences</Button>
	</CardFooter>
</Card>
