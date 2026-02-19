<script lang="ts">
	import FileIcon from "@lucide/svelte/icons/file";
	import PrinterIcon from "@lucide/svelte/icons/printer";
	import ShareIcon from "@lucide/svelte/icons/share-2";
	import ScissorsIcon from "@lucide/svelte/icons/scissors";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import ClipboardIcon from "@lucide/svelte/icons/clipboard";
	import * as Menubar from "$lib/registry/ui/menubar/index.js";
</script>

<Menubar.Root>
	<Menubar.Menu>
		<Menubar.Trigger>File</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				<FileIcon />
				New Tab
				<Menubar.Shortcut>⌘T</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				<ShareIcon />
				Share
			</Menubar.Item>
			<Menubar.Separator />
			<Menubar.Item>
				<PrinterIcon />
				Print...
				<Menubar.Shortcut>⌘P</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Edit</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.Item>
				<ScissorsIcon />
				Cut
				<Menubar.Shortcut>⌘X</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				<CopyIcon />
				Copy
				<Menubar.Shortcut>⌘C</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item>
				<ClipboardIcon />
				Paste
				<Menubar.Shortcut>⌘V</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
