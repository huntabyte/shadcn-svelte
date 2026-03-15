<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
</script>

<Example title="In Dialog">
	<Dialog.Root>
		<Dialog.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" {...props}>Open Dialog</Button>
			{/snippet}
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Popover Example</Dialog.Title>
				<Dialog.Description>Click the button below to see the popover.</Dialog.Description>
			</Dialog.Header>
			<Popover.Root>
				<Popover.Trigger>
					{#snippet child({ props })}
						<Button variant="outline" class="w-fit" {...props}>Open Popover</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content align="start">
					<Popover.Header>
						<Popover.Title>Popover in Dialog</Popover.Title>
						<Popover.Description>
							This popover appears inside a dialog. Click the button to open it.
						</Popover.Description>
					</Popover.Header>
				</Popover.Content>
			</Popover.Root>
		</Dialog.Content>
	</Dialog.Root>
</Example>
