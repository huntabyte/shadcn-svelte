<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
</script>

<Example title="With Groups, Labels & Separators">
	<ContextMenu.Root>
		<ContextMenu.Trigger
			class="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
		>
			Right click here
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Group>
				<ContextMenu.Label>File</ContextMenu.Label>
				<ContextMenu.Item>
					New File
					<ContextMenu.Shortcut>⌘N</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>
					Open File
					<ContextMenu.Shortcut>⌘O</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>
					Save
					<ContextMenu.Shortcut>⌘S</ContextMenu.Shortcut>
				</ContextMenu.Item>
			</ContextMenu.Group>
			<ContextMenu.Separator />
			<ContextMenu.Group>
				<ContextMenu.Label>Edit</ContextMenu.Label>
				<ContextMenu.Item>
					Undo
					<ContextMenu.Shortcut>⌘Z</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>
					Redo
					<ContextMenu.Shortcut>⇧⌘Z</ContextMenu.Shortcut>
				</ContextMenu.Item>
			</ContextMenu.Group>
			<ContextMenu.Separator />
			<ContextMenu.Group>
				<ContextMenu.Item>
					Cut
					<ContextMenu.Shortcut>⌘X</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>
					Copy
					<ContextMenu.Shortcut>⌘C</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>
					Paste
					<ContextMenu.Shortcut>⌘V</ContextMenu.Shortcut>
				</ContextMenu.Item>
			</ContextMenu.Group>
			<ContextMenu.Separator />
			<ContextMenu.Group>
				<ContextMenu.Item variant="destructive">
					Delete
					<ContextMenu.Shortcut>⌫</ContextMenu.Shortcut>
				</ContextMenu.Item>
			</ContextMenu.Group>
		</ContextMenu.Content>
	</ContextMenu.Root>
</Example>
