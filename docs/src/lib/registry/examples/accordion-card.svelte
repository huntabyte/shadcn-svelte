<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
</script>

<Card.Root class="w-full">
	<Card.Content class="p-0">
		<Accordion.Root type="single">
			<Accordion.Item value="item-1" class="border-t border-b-0 px-6 first:border-t-0">
				<Accordion.Trigger>What's included in the free plan?</Accordion.Trigger>
				<Accordion.Content>
					The free plan includes up to 3 projects, 5GB of storage, and access to core
					features. Upgrade anytime to unlock unlimited projects and advanced tools.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2" class="border-t border-b-0 px-6">
				<Accordion.Trigger>How do I upgrade my subscription?</Accordion.Trigger>
				<Accordion.Content>
					Go to Settings → Billing and select a plan. Upgrades take effect immediately and
					are prorated for the remainder of your billing cycle.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3" class="border-t border-b-0 px-6">
				<Accordion.Trigger>Can I cancel my subscription?</Accordion.Trigger>
				<Accordion.Content>
					Yes, you can cancel at any time from the Billing section. You'll retain access
					until the end of your current billing period.
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</Card.Content>
</Card.Root>
