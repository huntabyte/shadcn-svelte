<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
</script>

<Accordion.Root type="single" value="shipping" class="max-w-lg">
	<Accordion.Item value="shipping">
		<Accordion.Trigger>What are your shipping options?</Accordion.Trigger>
		<Accordion.Content>
			We offer standard (5-7 days), express (2-3 days), and overnight shipping. Free shipping
			on international orders.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="returns">
		<Accordion.Trigger>What is your return policy?</Accordion.Trigger>
		<Accordion.Content>
			Returns accepted within 30 days. Items must be unused and in original packaging. Refunds
			processed within 5-7 business days.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="support">
		<Accordion.Trigger>How can I contact customer support?</Accordion.Trigger>
		<Accordion.Content>
			Reach us via email, live chat, or phone. We respond within 24 hours during business
			days.
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
