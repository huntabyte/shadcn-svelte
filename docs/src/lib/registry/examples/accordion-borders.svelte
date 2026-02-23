<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
</script>

<Accordion.Root type="single" class="w-full rounded-md border" value="item-1">
	<Accordion.Item value="item-1" class="border-b px-4 last:border-b-0">
		<Accordion.Trigger>What payment methods do you support?</Accordion.Trigger>
		<Accordion.Content>
			We accept Visa, Mastercard, American Express, and PayPal. For annual plans, we also support
			bank transfers.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-2" class="border-b px-4 last:border-b-0">
		<Accordion.Trigger>Can I get a refund?</Accordion.Trigger>
		<Accordion.Content>
			We offer a 30-day money-back guarantee. If you're not satisfied, contact support for a full
			refund.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-3" class="border-b px-4 last:border-b-0">
		<Accordion.Trigger>Do you offer any discounts?</Accordion.Trigger>
		<Accordion.Content>
			Yes, we offer a 20% discount for annual billing and special rates for non-profits and
			educational institutions.
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
