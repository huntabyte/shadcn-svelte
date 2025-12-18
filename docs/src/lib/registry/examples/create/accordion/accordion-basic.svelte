<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Accordion from "$lib/registry/ui/accordion/index.js";

	const items = [
		{
			value: "item-1",
			trigger: "Is it accessible?",
			content: "Yes. It adheres to the WAI-ARIA design pattern.",
		},
		{
			value: "item-2",
			trigger: "Is it styled?",
			content:
				"Yes. It comes with default styles that matches the other components' aesthetic.",
		},
		{
			value: "item-3",
			trigger: "Is it animated?",
			content:
				"Yes. It's animated by default, but you can disable it if you prefer.",
		},
	];
</script>

<Example title="Basic">
	<Accordion.Root type="single" class="mx-auto max-w-lg">
		{#each items as item (item.value)}
			<Accordion.Item value={item.value}>
				<Accordion.Trigger>{item.trigger}</Accordion.Trigger>
				<Accordion.Content>{item.content}</Accordion.Content>
			</Accordion.Item>
		{/each}
	</Accordion.Root>
</Example>
