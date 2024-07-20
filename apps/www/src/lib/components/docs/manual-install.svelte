<script lang="ts">
	import * as Accordion from "$lib/registry/new-york/ui/accordion/index.js";

	export let title = "Manual Installation";

	let value = title.replaceAll(" ", "-").toLowerCase();
</script>

<Accordion.Root>
	<Accordion.Item {value}>
		<Accordion.Trigger>{title}</Accordion.Trigger>
		<Accordion.Content>
			<slot />
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
