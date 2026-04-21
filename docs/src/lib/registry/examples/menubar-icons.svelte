<script lang="ts">
	import FileIcon from "@lucide/svelte/icons/file";
	import FolderIcon from "@lucide/svelte/icons/folder";
	import SaveIcon from "@lucide/svelte/icons/save";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import HelpCircleIcon from "@lucide/svelte/icons/circle-help";
	import TrashIcon from "@lucide/svelte/icons/trash-2";
	import * as Menubar from "$lib/registry/ui/menubar/index.js";
</script>

<Menubar.Root class="w-72">
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				<FileIcon />
				New File <Menubar.Shortcut>⌘N</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				<FolderIcon />
				Open Folder
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>
				<SaveIcon />
				Save <Menubar.Shortcut>⌘S</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>More</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Group>
				<Menubar.Item>
					<SettingsIcon />
					Settings
				</Menubar.Item>
				<Menubar.Item>
					<HelpCircleIcon />
					Help
				</Menubar.Item>
				<Menubar.Separator />
				<Menubar.Item variant="destructive">
					<TrashIcon />
					Delete
				</Menubar.Item>
			</Menubar.Group>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
