<script lang="ts">
	import { Button } from "$components/ui/button";
	import * as Tooltip from "$components/ui/tooltip";
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:trigger>
		<Button builders={[trigger]} variant="outline">Hover</Button>
	</Tooltip.Trigger>
	<Tooltip.Content>
		<p>Add to library</p>
	</Tooltip.Content>
</Tooltip.Root>
