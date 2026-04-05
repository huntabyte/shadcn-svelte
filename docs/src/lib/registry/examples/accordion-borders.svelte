<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
</script>

<Accordion.Root type="single" class="w-full max-w-lg rounded-lg border" value="item-1">
	<Accordion.Item value="item-1" class="border-b px-4 last:border-b-0">
		<Accordion.Trigger>How does billing work?</Accordion.Trigger>
		<Accordion.Content>
			We offer monthly and annual subscription plans. Billing is charged at the beginning of
			each cycle, and you can cancel anytime. All plans include automatic backups, 24/7
			support, and unlimited team members. There are no hidden fees or setup costs.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-2" class="border-b px-4 last:border-b-0">
		<Accordion.Trigger>Is my data secure?</Accordion.Trigger>
		<Accordion.Content>
			Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party
			security audits. All data is encrypted at rest and in transit using industry-standard
			protocols. We also offer optional two-factor authentication and single sign-on for
			enterprise customers.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-3" class="border-b px-4 last:border-b-0">
		<Accordion.Trigger>What integrations do you support?</Accordion.Trigger>
		<Accordion.Content>
			<p>
				We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot,
				and more. You can also build custom integrations using our REST API and webhooks.
			</p>
			<p class="mt-4">
				Our API documentation includes code examples in 10+ programming languages.
			</p>
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
