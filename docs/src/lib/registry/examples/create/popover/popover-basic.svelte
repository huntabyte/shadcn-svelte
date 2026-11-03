<script lang="ts">
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Basic">
	<Popover.Root>
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" class="w-fit" {...props}>Open Popover</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content align="start">
			<Popover.Header>
				<Popover.Title>Dimensions</Popover.Title>
				<Popover.Description>Set the dimensions for the layer.</Popover.Description>
			</Popover.Header>
		</Popover.Content>
	</Popover.Root>
</Example>
