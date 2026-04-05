<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";

	const items = [
		{
			value: "item-1",
			trigger: "Can I access my account history?",
			content:
				"Yes, you can view your complete account history including all transactions, plan changes, and support tickets in the Account History section of your dashboard.",
			disabled: false,
		},
		{
			value: "item-2",
			trigger: "Premium feature information",
			content:
				"This section contains information about premium features. Upgrade your plan to access this content.",
			disabled: true,
		},
		{
			value: "item-3",
			trigger: "How do I update my email address?",
			content:
				"You can update your email address in your account settings. You'll receive a verification email at your new address to confirm the change.",
			disabled: false,
		},
	];
</script>

<Accordion.Root type="single" class="w-full max-w-lg">
	{#each items as item (item.value)}
		<Accordion.Item value={item.value} disabled={item.disabled}>
			<Accordion.Trigger>{item.trigger}</Accordion.Trigger>
			<Accordion.Content>{item.content}</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>
