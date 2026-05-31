<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";

	const items = [
		{
			value: "plans",
			trigger: "What subscription plans do you offer?",
			content: [
				"We offer three subscription tiers: Starter ($9/month), Professional ($29/month), and Enterprise ($99/month). Each plan includes increasing storage limits, API access, priority support, and team collaboration features.",
			],
			hasButton: true,
		},
		{
			value: "billing",
			trigger: "How does billing work?",
			content: [
				"Billing occurs automatically at the start of each billing cycle. We accept all major credit cards, PayPal, and ACH transfers for enterprise customers.",
				"You'll receive an invoice via email after each payment. You can update your payment method or billing information anytime in your account settings. Failed payments will trigger automated retry attempts and email notifications.",
			],
		},
		{
			value: "upgrade",
			trigger: "Can I upgrade or downgrade my plan?",
			content: [
				"Yes, you can change your plan at any time. When upgrading, you'll be charged a prorated amount for the remainder of your billing cycle and immediately gain access to new features.",
				"When downgrading, the change takes effect at the end of your current billing period, and you'll retain access to premium features until then. No refunds are provided for downgrades.",
			],
		},
		{
			value: "cancel",
			trigger: "How do I cancel my subscription?",
			content: [
				"You can cancel your subscription anytime from your account settings. There are no cancellation fees or penalties. Your access will continue until the end of your current billing period.",
				"After cancellation, your data is retained for 30 days in case you want to reactivate. You can export all your data before or after canceling. We'd love to hear your feedback about why you're leaving.",
			],
		},
		{
			value: "refund",
			trigger: "What is your refund policy?",
			content: [
				"We offer a 30-day money-back guarantee for new subscriptions. If you're not satisfied within the first 30 days, contact our support team for a full refund.",
				"After 30 days, we don't provide refunds for partial billing periods, but you can cancel anytime to avoid future charges. Enterprise customers have custom refund terms outlined in their contracts.",
			],
		},
	];
</script>

<Example title="In Card">
	<Card.Root class="mx-auto w-full max-w-lg gap-4">
		<Card.Header>
			<Card.Title>Subscription & Billing</Card.Title>
			<Card.Description>
				Common questions about your account, plans, and payments
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<Accordion.Root
				type="multiple"
				value={["plans"]}
				class="style-maia:rounded-md style-mira:rounded-md"
			>
				{#each items as item (item.value)}
					<Accordion.Item value={item.value}>
						<Accordion.Trigger>{item.trigger}</Accordion.Trigger>
						<Accordion.Content>
							{#each item.content as paragraph, i (i)}
								<p>{paragraph}</p>
							{/each}
							{#if item.hasButton}
								<p>
									<a href="#/">Annual billing is available</a> with a 20% discount.
									All plans include a 14-day free trial with no credit card required.
								</p>
								<Button size="sm">
									View plans
									<ArrowUpRightIcon />
								</Button>
							{/if}
						</Accordion.Content>
					</Accordion.Item>
				{/each}
			</Accordion.Root>
		</Card.Content>
	</Card.Root>
</Example>
