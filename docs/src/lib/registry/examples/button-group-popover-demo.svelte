<script lang="ts">
	import Bot from "@lucide/svelte/icons/bot";
	import ChevronDown from "@lucide/svelte/icons/chevron-down";
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
</script>

<ButtonGroup.Root>
	<Button variant="outline">
		<Bot /> Copilot
	</Button>
	<Popover.Root>
		<Popover.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline" size="icon" aria-label="Open Popover">
					<ChevronDown />
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content align="end" class="rounded-xl text-sm">
			<Popover.Header>
				<Popover.Title>Start a new task with Copilot</Popover.Title>
				<Popover.Description>Describe your task in natural language.</Popover.Description>
			</Popover.Header>
			<Field.Field>
				<Field.Label for="task" class="sr-only">Task Description</Field.Label>
				<Textarea id="task" placeholder="I need to..." class="resize-none" />
				<Field.Description>Copilot will open a pull request for review.</Field.Description>
			</Field.Field>
		</Popover.Content>
	</Popover.Root>
</ButtonGroup.Root>
