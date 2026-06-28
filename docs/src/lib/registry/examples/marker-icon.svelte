<script lang="ts">
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import BookOpenCheckIcon from "@lucide/svelte/icons/book-open-check";
	import GitBranchIcon from "@lucide/svelte/icons/git-branch";
	import SearchIcon from "@lucide/svelte/icons/search";
</script>

<div class="flex w-full max-w-sm flex-col gap-12 py-12">
	<Marker.Root>
		<Marker.Icon>
			<GitBranchIcon />
		</Marker.Icon>
		<Marker.Content>Switched to a new branch</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="separator">
		<Marker.Icon>
			<SearchIcon />
		</Marker.Icon>
		<Marker.Content>Explored 4 files</Marker.Content>
	</Marker.Root>
	<Marker.Root class="flex-col">
		<Marker.Icon>
			<BookOpenCheckIcon />
		</Marker.Icon>
		<Marker.Content>Syncing completed</Marker.Content>
	</Marker.Root>
</div>
