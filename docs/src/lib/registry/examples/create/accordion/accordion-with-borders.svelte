<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Accordion from "$lib/registry/ui/accordion/index.js";

	const items = [
		{
			value: "billing",
			trigger: "How does billing work?",
			content:
				"We offer monthly and annual subscription plans. Billing is charged at the beginning of each cycle, and you can cancel anytime. All plans include automatic backups, 24/7 support, and unlimited team members. There are no hidden fees or setup costs.",
		},
		{
			value: "security",
			trigger: "Is my data secure?",
			content:
				"Yes. We use end-to-end encryption, SOC 2 Type II compliance, and regular third-party security audits. All data is encrypted at rest and in transit using industry-standard protocols. We also offer optional two-factor authentication and single sign-on for enterprise customers.",
		},
		{
			value: "integration",
			trigger: "What integrations do you support?",
			content: [
				"We integrate with 500+ popular tools including Slack, Zapier, Salesforce, HubSpot, and more. You can also build custom integrations using our REST API and webhooks. ",
				"Our API documentation includes code examples in 10+ programming languages.",
			],
		},
	];
</script>

<Example title="With Borders">
	<Accordion.Root
		type="single"
		class="style-lyra:gap-2 style-vega:gap-2 style-nova:gap-2 mx-auto flex max-w-lg flex-col"
	>
		{#each items as item (item.value)}
			<Accordion.Item
				value={item.value}
				class="style-vega:border style-nova:border style-lyra:border style-vega:rounded-lg style-nova:rounded-lg"
			>
				<Accordion.Trigger
					class="style-nova:px-2.5 style-nova:text-sm style-vega:text-sm style-maia:text-sm style-mira:text-xs style-lyra:px-2 style-lyra:text-xs style-vega:px-4 font-medium"
				>
					{item.trigger}
				</Accordion.Trigger>
				<Accordion.Content
					class="text-muted-foreground style-nova:px-2.5 style-nova:text-sm style-lyra:px-2 style-lyra:text-xs style-vega:px-4 style-maia:px-0 style-mira:px-0"
				>
					{#if Array.isArray(item.content)}
						{#each item.content as paragraph, i (i)}
							<p>{paragraph}</p>
						{/each}
					{:else}
						{item.content}
					{/if}
				</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</Example>
