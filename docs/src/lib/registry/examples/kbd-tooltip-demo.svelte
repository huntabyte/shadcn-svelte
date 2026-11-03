<script lang="ts">
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<div class="flex flex-wrap gap-4">
	<ButtonGroup.Root>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>Save</Button>
				{/snippet}
			</Tooltip.Trigger>
			<Tooltip.Content>
				Save Changes <Kbd.Root>S</Kbd.Root>
			</Tooltip.Content>
		</Tooltip.Root>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" {...props}>Print</Button>
				{/snippet}
			</Tooltip.Trigger>
			<Tooltip.Content>
				Print Document
				<Kbd.Group>
					<Kbd.Root>Ctrl</Kbd.Root>
					<Kbd.Root>P</Kbd.Root>
				</Kbd.Group>
			</Tooltip.Content>
		</Tooltip.Root>
	</ButtonGroup.Root>
</div>
