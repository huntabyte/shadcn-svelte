<script lang="ts">
	import { Button } from "@/registry/new-york/ui/button";
	import * as Tooltip from "@/registry/new-york/ui/tooltip";
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">Hover</Button>
	</Tooltip.Trigger>
	<Tooltip.Content>
		<p>Add to library</p>
	</Tooltip.Content>
</Tooltip.Root>
