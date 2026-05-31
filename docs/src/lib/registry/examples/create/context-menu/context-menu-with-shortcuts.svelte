<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
</script>

<Example title="With Shortcuts">
	<ContextMenu.Root>
		<ContextMenu.Trigger
			class="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
		>
			Right click here
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Group>
				<ContextMenu.Item>
					Back
					<ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item disabled>
					Forward
					<ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>
					Reload
					<ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
				</ContextMenu.Item>
			</ContextMenu.Group>
			<ContextMenu.Separator />
			<ContextMenu.Group>
				<ContextMenu.Item>
					Save
					<ContextMenu.Shortcut>⌘S</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>
					Save As...
					<ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
				</ContextMenu.Item>
			</ContextMenu.Group>
		</ContextMenu.Content>
	</ContextMenu.Root>
</Example>
