<script lang="ts">
	import * as Accordion from "$lib/registry/new-york/ui/accordion/index.js";
</script>

<Accordion.Root>
	<Accordion.Item value="manual-installation">
		<Accordion.Trigger>Manual Installation</Accordion.Trigger>
		<Accordion.Content>
			<slot />
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
