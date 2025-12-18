<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Nested">
	<ButtonGroup>
		<ButtonGroup>
			<Button variant="outline" size="icon">
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="PlusSignIcon"
					phosphor="PlusIcon"
				/>
			</Button>
		</ButtonGroup>
		<ButtonGroup>
			<InputGroup.Root>
				<InputGroup.Input placeholder="Send a message..." />
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<InputGroup.Addon align="inline-end" {...props}>
								<IconPlaceholder
									lucide="AudioLinesIcon"
									tabler="IconHeadphones"
									hugeicons="AudioWave01Icon"
									phosphor="MicrophoneIcon"
								/>
							</InputGroup.Addon>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content>Voice Mode</Tooltip.Content>
				</Tooltip.Root>
			</InputGroup.Root>
		</ButtonGroup>
	</ButtonGroup>
</Example>
