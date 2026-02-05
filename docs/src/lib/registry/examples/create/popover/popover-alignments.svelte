<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
</script>

<Example title="Alignments">
	<div class="flex gap-6">
		<Popover.Root>
			<Popover.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" size="sm" {...props}>Start</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content align="start" class="w-40">Aligned to start</Popover.Content>
		</Popover.Root>
		<Popover.Root>
			<Popover.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" size="sm" {...props}>Center</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content align="center" class="w-40">Aligned to center</Popover.Content>
		</Popover.Root>
		<Popover.Root>
			<Popover.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" size="sm" {...props}>End</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content align="end" class="w-40">Aligned to end</Popover.Content>
		</Popover.Root>
	</div>
</Example>
