<script lang="ts">
	import * as Sheet from "$lib/registry/ui/sheet/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
</script>

<Sheet.Root>
	<Sheet.Trigger class={buttonVariants({ variant: "outline" })}>Open Sheet</Sheet.Trigger>
	<Sheet.Content showCloseButton={false}>
		<Sheet.Header>
			<Sheet.Title>No Close Button</Sheet.Title>
			<Sheet.Description>
				This sheet doesn't have a close button in the top-right corner. Click outside to close.
			</Sheet.Description>
		</Sheet.Header>
	</Sheet.Content>
</Sheet.Root>
