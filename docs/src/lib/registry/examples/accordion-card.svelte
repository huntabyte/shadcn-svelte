<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
</script>

<Card.Root class="w-full max-w-lg">
	<Card.Header>
		<Card.Title>Subscription & Billing</Card.Title>
		<Card.Description>
			Common questions about your account, plans, and payments
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<Accordion.Root type="single" value="plans">
			<Accordion.Item value="plans">
				<Accordion.Trigger>What subscription plans do you offer?</Accordion.Trigger>
				<Accordion.Content>
					<p>
						We offer three subscription tiers: Starter ($9/month), Professional
						($29/month), and Enterprise ($99/month). Each plan includes increasing
						storage limits, API access, priority support, and team collaboration
						features.
					</p>
					<p class="mt-4">
						Annual billing is available with a 20% discount. All plans include a 14-day
						free trial with no credit card required.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="billing">
				<Accordion.Trigger>How does billing work?</Accordion.Trigger>
				<Accordion.Content>
					<p>
						Billing occurs automatically at the start of each billing cycle. We accept
						all major credit cards, PayPal, and ACH transfers for enterprise customers.
					</p>
					<p class="mt-4">
						You'll receive an invoice via email after each payment. You can update your
						payment method or billing information anytime in your account settings.
						Failed payments will trigger automated retry attempts and email
						notifications.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="upgrade">
				<Accordion.Trigger>Can I upgrade or downgrade my plan?</Accordion.Trigger>
				<Accordion.Content>
					<p>
						Yes, you can change your plan at any time. When upgrading, you'll be charged
						a prorated amount for the remainder of your billing cycle and immediately
						gain access to new features.
					</p>
					<p class="mt-4">
						When downgrading, the change takes effect at the end of your current billing
						period, and you'll retain access to premium features until then. No refunds
						are provided for downgrades.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="cancel">
				<Accordion.Trigger>How do I cancel my subscription?</Accordion.Trigger>
				<Accordion.Content>
					<p>
						You can cancel your subscription anytime from your account settings. There
						are no cancellation fees or penalties. Your access will continue until the
						end of your current billing period.
					</p>
					<p class="mt-4">
						After cancellation, your data is retained for 30 days in case you want to
						reactivate. You can export all your data before or after canceling.
					</p>
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="refund">
				<Accordion.Trigger>What is your refund policy?</Accordion.Trigger>
				<Accordion.Content>
					<p>
						We offer a 30-day money-back guarantee for new subscriptions. If you're not
						satisfied within the first 30 days, contact our support team for a full
						refund.
					</p>
					<p class="mt-4">
						After 30 days, we don't provide refunds for partial billing periods, but you
						can cancel anytime to avoid future charges. Enterprise customers have custom
						refund terms outlined in their contracts.
					</p>
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</Card.Content>
</Card.Root>
