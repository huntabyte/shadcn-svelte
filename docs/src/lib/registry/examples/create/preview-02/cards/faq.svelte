<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";

	const GENERAL_QUESTIONS = [
		{
			q: "How secure is my financial data with Ledger?",
			a: "We use bank-level AES-256 encryption, SOC 2 Type II certified infrastructure, and never store your credentials. All connections use read-only access tokens. We are a SEC registered investment advisor.",
		},
		{
			q: "How do I connect my bank or investment accounts?",
			a: "Go to Settings > Linked Accounts and search for your institution. We support over 12,000 banks and brokerages via Plaid and MX.",
		},
		{
			q: "Can I export my data for tax purposes?",
			a: "Yes. Navigate to Reports > Tax Export to download a CSV or PDF summary of your transactions, dividends, and capital gains for any tax year.",
		},
	];

	const BILLING_QUESTIONS = [
		{
			q: "What is the difference between Basic and Pro pricing tiers?",
			a: "Basic includes budgeting, goal tracking, and up to 3 linked accounts. Pro adds unlimited accounts, dividend tracking, portfolio analysis, and priority support.",
		},
		{
			q: "How do I cancel my subscription?",
			a: "Go to Settings > Billing > Manage Plan and click Cancel. Your access continues until the end of your current billing period.",
		},
		{
			q: "Do you offer a free trial?",
			a: "Yes. All new accounts start with a 14-day Pro trial. No credit card required.",
		},
	];

	const GOALS_QUESTIONS = [
		{
			q: "How do I set up a custom financial goal?",
			a: "Click New Goal from the Savings Targets card. Choose a category, set a target amount and date, and we'll calculate the monthly contribution needed.",
		},
		{
			q: "Can I track multiple goals at once?",
			a: "Yes. Pro accounts can track unlimited goals. Basic accounts support up to 3 active goals.",
		},
		{
			q: "How are monthly contributions calculated?",
			a: "We divide the remaining amount by the number of months until your target date, adjusted for your current savings rate and any auto-transfer schedules.",
		},
	];
</script>

<Card.Root>
	<Card.Content>
		<Tabs.Root value="general">
			<Tabs.List class="w-full">
				<Tabs.Trigger value="general" class="flex-1">General</Tabs.Trigger>
				<Tabs.Trigger value="billing" class="flex-1">Billing</Tabs.Trigger>
				<Tabs.Trigger value="goals" class="flex-1">Goals</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="general">
				<Accordion.Root type="single" value="0" class="w-full">
					{#each GENERAL_QUESTIONS as item, index (index)}
						<Accordion.Item value={String(index)}>
							<Accordion.Trigger>{item.q}</Accordion.Trigger>
							<Accordion.Content>{item.a}</Accordion.Content>
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			</Tabs.Content>
			<Tabs.Content value="billing">
				<Accordion.Root type="single" value="0" class="w-full">
					{#each BILLING_QUESTIONS as item, index (index)}
						<Accordion.Item value={String(index)}>
							<Accordion.Trigger>{item.q}</Accordion.Trigger>
							<Accordion.Content>{item.a}</Accordion.Content>
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			</Tabs.Content>
			<Tabs.Content value="goals">
				<Accordion.Root type="single" value="0" class="w-full">
					{#each GOALS_QUESTIONS as item, index (index)}
						<Accordion.Item value={String(index)}>
							<Accordion.Trigger>{item.q}</Accordion.Trigger>
							<Accordion.Content>{item.a}</Accordion.Content>
						</Accordion.Item>
					{/each}
				</Accordion.Root>
			</Tabs.Content>
		</Tabs.Root>
	</Card.Content>
	<Card.Footer>
		<Button variant="outline" class="w-full">Contact Support</Button>
		<Button variant="link" class="w-full">Learn More</Button>
	</Card.Footer>
</Card.Root>
