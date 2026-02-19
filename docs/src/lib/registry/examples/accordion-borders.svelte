<script lang="ts">
	import * as Accordion from "$lib/registry/ui/accordion/index.js";
</script>

<Accordion.Root type="single" class="w-full sm:max-w-[70%]" value="item-1">
	<Accordion.Item value="item-1" class="border rounded-md px-4 mb-2 last:mb-0">
		<Accordion.Trigger class="py-3">Is it accessible?</Accordion.Trigger>
		<Accordion.Content>
			Yes. It adheres to the WAI-ARIA design pattern.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-2" class="border rounded-md px-4 mb-2 last:mb-0">
		<Accordion.Trigger class="py-3">Is it styled?</Accordion.Trigger>
		<Accordion.Content>
			Yes. It comes with default styles that match the other components' aesthetic.
		</Accordion.Content>
	</Accordion.Item>
	<Accordion.Item value="item-3" class="border rounded-md px-4 mb-2 last:mb-0">
		<Accordion.Trigger class="py-3">Is it animated?</Accordion.Trigger>
		<Accordion.Content>
			Yes. It's animated by default, but you can disable it if you prefer.
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
