<script lang="ts">
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Tooltip from "$lib/registry/new-york/ui/tooltip/index.js";
</script>

<Tooltip.Root>
	<Tooltip.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline">Hover</Button>
	</Tooltip.Trigger>
	<Tooltip.Content>
		<p>Add to library</p>
	</Tooltip.Content>
</Tooltip.Root>
