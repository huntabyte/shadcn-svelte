<script lang="ts">
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
</script>

<Popover.Root>
	<Popover.Trigger class={buttonVariants({ variant: "outline" })}>Open Popover</Popover.Trigger>
	<Popover.Content align="start">
		<Popover.Header>
			<Popover.Title>Dimensions</Popover.Title>
			<Popover.Description>Set the dimensions for the layer.</Popover.Description>
		</Popover.Header>
	</Popover.Content>
</Popover.Root>
