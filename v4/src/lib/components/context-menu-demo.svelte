<script lang="ts">
	import Code2Icon from "@lucide/svelte/icons/code-2";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import TrashIcon from "@lucide/svelte/icons/trash";
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
	>
		Right click here
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-64">
		<ContextMenu.Item inset>
			Back
			<ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Item inset disabled>
			Forward
			<ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Item inset>
			Reload
			<ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
		</ContextMenu.Item>
		<ContextMenu.Sub>
			<ContextMenu.SubTrigger inset>More Tools</ContextMenu.SubTrigger>
			<ContextMenu.SubContent class="w-48">
				<ContextMenu.Item inset>
					Save Page...
					<ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
				</ContextMenu.Item>
				<ContextMenu.Item>
					<PlusIcon />
					Create Shortcut...
				</ContextMenu.Item>
				<ContextMenu.Item inset>Name Window...</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Item>
					<Code2Icon />
					Developer Tools
				</ContextMenu.Item>
				<ContextMenu.Separator />
				<ContextMenu.Item variant="destructive">
					<TrashIcon />
					Delete
				</ContextMenu.Item>
			</ContextMenu.SubContent>
		</ContextMenu.Sub>
		<ContextMenu.Separator />
		<ContextMenu.CheckboxItem checked>
			Show Bookmarks Bar
			<ContextMenu.Shortcut>⌘⇧B</ContextMenu.Shortcut>
		</ContextMenu.CheckboxItem>
		<ContextMenu.CheckboxItem>Show Full URLs</ContextMenu.CheckboxItem>
		<ContextMenu.Separator />
		<ContextMenu.RadioGroup value="pedro">
			<ContextMenu.GroupHeading inset>People</ContextMenu.GroupHeading>
			<ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem>
			<ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
		</ContextMenu.RadioGroup>
	</ContextMenu.Content>
</ContextMenu.Root>
