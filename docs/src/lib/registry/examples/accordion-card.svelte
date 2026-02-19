<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
</script>

<Card.Root class="w-full sm:max-w-[70%]">
	<Card.Content class="p-0">
		<Accordion.Root type="single">
			<Accordion.Item value="item-1" class="border-b-0 border-t px-6 first:border-t-0">
				<Accordion.Trigger>Is it accessible?</Accordion.Trigger>
				<Accordion.Content>
					Yes. It adheres to the WAI-ARIA design pattern.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-2" class="border-b-0 border-t px-6">
				<Accordion.Trigger>Is it styled?</Accordion.Trigger>
				<Accordion.Content>
					Yes. It comes with default styles that match the other components' aesthetic.
				</Accordion.Content>
			</Accordion.Item>
			<Accordion.Item value="item-3" class="border-b-0 border-t px-6">
				<Accordion.Trigger>Is it animated?</Accordion.Trigger>
				<Accordion.Content>
					Yes. It's animated by default, but you can disable it if you prefer.
				</Accordion.Content>
			</Accordion.Item>
		</Accordion.Root>
	</Card.Content>
</Card.Root>
