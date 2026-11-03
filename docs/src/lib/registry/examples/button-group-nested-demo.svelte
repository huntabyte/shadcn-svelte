<script lang="ts">
	import AudioLinesIcon from "@lucide/svelte/icons/audio-lines";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
</script>

<ButtonGroup.Root>
	<ButtonGroup.Root>
		<Button variant="outline" size="icon">
			<PlusIcon />
		</Button>
	</ButtonGroup.Root>
	<ButtonGroup.Root>
		<InputGroup.Root>
			<InputGroup.Input placeholder="Send a message..." />
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						<InputGroup.Addon {...props} align="inline-end">
							<AudioLinesIcon />
						</InputGroup.Addon>
					{/snippet}
				</Tooltip.Trigger>
				<Tooltip.Content>Voice Mode</Tooltip.Content>
			</Tooltip.Root>
		</InputGroup.Root>
	</ButtonGroup.Root>
</ButtonGroup.Root>
