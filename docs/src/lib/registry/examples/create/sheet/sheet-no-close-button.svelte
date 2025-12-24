<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Sheet from "$lib/registry/ui/sheet/index.js";
</script>

<Example title="No Close Button">
	<Sheet.Root>
		<Sheet.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" {...props}>No Close Button</Button>
			{/snippet}
		</Sheet.Trigger>
		<Sheet.Content showCloseButton={false}>
			<Sheet.Header>
				<Sheet.Title>No Close Button</Sheet.Title>
				<Sheet.Description>
					This sheet doesn't have a close button in the top-right corner. You can only
					close it using the button below.
				</Sheet.Description>
			</Sheet.Header>
		</Sheet.Content>
	</Sheet.Root>
</Example>
