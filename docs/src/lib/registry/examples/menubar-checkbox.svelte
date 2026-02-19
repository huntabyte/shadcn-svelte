<script lang="ts">
	import * as Menubar from "$lib/registry/ui/menubar/index.js";

	let showBookmarks = $state(true);
	let showStatusBar = $state(false);
	let showSidebar = $state(true);
</script>

<Menubar.Root>
	<Menubar.Menu>
		<Menubar.Trigger>View</Menubar.Trigger>
		<Menubar.Content>
			<Menubar.CheckboxItem bind:checked={showBookmarks}>
				Show Bookmarks Bar
			</Menubar.CheckboxItem>
			<Menubar.CheckboxItem bind:checked={showStatusBar}>
				Show Status Bar
			</Menubar.CheckboxItem>
			<Menubar.CheckboxItem bind:checked={showSidebar}>
				Show Sidebar
			</Menubar.CheckboxItem>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
