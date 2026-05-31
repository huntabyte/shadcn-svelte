<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
</script>

<Example title="With Checkboxes">
	<ContextMenu.Root>
		<ContextMenu.Trigger
			class="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
		>
			Right click here
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Group>
				<ContextMenu.CheckboxItem checked>Show Bookmarks Bar</ContextMenu.CheckboxItem>
				<ContextMenu.CheckboxItem>Show Full URLs</ContextMenu.CheckboxItem>
				<ContextMenu.CheckboxItem checked>Show Developer Tools</ContextMenu.CheckboxItem>
			</ContextMenu.Group>
		</ContextMenu.Content>
	</ContextMenu.Root>
</Example>
