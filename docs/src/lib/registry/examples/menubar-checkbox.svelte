<script lang="ts">
	import * as Menubar from "$lib/registry/ui/menubar/index.js";

	let showBookmarks = $state(false);
	let showFullUrls = $state(true);
	let strikethrough = $state(true);
	let code = $state(false);
	let superscript = $state(false);
</script>

<Menubar.Root class="w-72">
	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content class="w-64">
			<Menubar.CheckboxItem bind:checked={showBookmarks}>
				Always Show Bookmarks Bar
			</Menubar.CheckboxItem>
			<Menubar.CheckboxItem bind:checked={showFullUrls}>
				Always Show Full URLs
			</Menubar.CheckboxItem>
			<Menubar.Separator />
			<Menubar.Item inset>
				Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
			</Menubar.Item>
			<Menubar.Item disabled inset>
				Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
			</Menubar.Item>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>Format</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.CheckboxItem bind:checked={strikethrough}>Strikethrough</Menubar.CheckboxItem>
			<Menubar.CheckboxItem bind:checked={code}>Code</Menubar.CheckboxItem>
			<Menubar.CheckboxItem bind:checked={superscript}>Superscript</Menubar.CheckboxItem>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
