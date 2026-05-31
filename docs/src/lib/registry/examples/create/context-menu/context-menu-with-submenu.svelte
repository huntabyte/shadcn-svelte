<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
</script>

<Example title="With Submenu">
	<ContextMenu.Root>
		<ContextMenu.Trigger
			class="flex aspect-[2/0.5] w-full items-center justify-center rounded-lg border text-sm"
		>
			Right click here
		</ContextMenu.Trigger>
		<ContextMenu.Content>
			<ContextMenu.Group>
				<ContextMenu.Item>
					Copy
					<ContextMenu.Shortcut>⌘C</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>
					Cut
					<ContextMenu.Shortcut>⌘X</ContextMenu.Shortcut>
				</ContextMenu.Item>
			</ContextMenu.Group>
			<ContextMenu.Sub>
				<ContextMenu.SubTrigger>More Tools</ContextMenu.SubTrigger>
				<ContextMenu.SubContent>
					<ContextMenu.Group>
						<ContextMenu.Item>Save Page...</ContextMenu.Item>
						<ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
						<ContextMenu.Item>Name Window...</ContextMenu.Item>
					</ContextMenu.Group>
					<ContextMenu.Separator />
					<ContextMenu.Group>
						<ContextMenu.Item>Developer Tools</ContextMenu.Item>
					</ContextMenu.Group>
					<ContextMenu.Separator />
					<ContextMenu.Group>
						<ContextMenu.Item variant="destructive">Delete</ContextMenu.Item>
					</ContextMenu.Group>
				</ContextMenu.SubContent>
			</ContextMenu.Sub>
		</ContextMenu.Content>
	</ContextMenu.Root>
</Example>
