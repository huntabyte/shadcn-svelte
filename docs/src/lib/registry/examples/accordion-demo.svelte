<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
</script>

<Accordion.Root type="single" class="w-full" value="item-1">
	<Accordion.Item value="item-1">
		<Accordion.Trigger>How do I reset my password?</Accordion.Trigger>
		<Accordion.Content>
			Click the "Forgot password" link on the login page and enter your email address. You'll
			receive a password reset link within a few minutes.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-2">
		<Accordion.Trigger>Can I change my subscription plan?</Accordion.Trigger>
		<Accordion.Content>
			Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of
			your next billing cycle.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-3">
		<Accordion.Trigger>What payment methods do you accept?</Accordion.Trigger>
		<Accordion.Content>
			We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank
			transfers for annual plans.
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
