<script lang="ts">
	import * as ContextMenu from "$lib/registry/ui/context-menu/index.js";

	let showBookmarks = $state(true);
	let showFullURLs = $state(false);
	let showHistory = $state(false);
</script>

<ContextMenu.Root>
	<ContextMenu.Trigger
		class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
	>
		Right click here
	</ContextMenu.Trigger>
	<ContextMenu.Content class="w-52">
		<ContextMenu.Label inset>View Options</ContextMenu.Label>
		<ContextMenu.Separator />
		<ContextMenu.CheckboxItem bind:checked={showBookmarks}>
			Show Bookmarks Bar
		</ContextMenu.CheckboxItem>
		<ContextMenu.CheckboxItem bind:checked={showFullURLs}>
			Show Full URLs
		</ContextMenu.CheckboxItem>
		<ContextMenu.CheckboxItem bind:checked={showHistory}>Show History</ContextMenu.CheckboxItem>
	</ContextMenu.Content>
</ContextMenu.Root>
