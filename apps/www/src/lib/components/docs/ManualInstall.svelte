<script lang="ts">
	import * as Accordion from "@/registry/default/ui/accordion";
</script>

<Accordion.Root>
	<Accordion.Item value="manual-installation">
		<Accordion.Trigger>Manual Installation</Accordion.Trigger>
		<Accordion.Content>
			<slot />
		</Accordion.Content>
	</Accordion.Item>
</Accordion.Root>
