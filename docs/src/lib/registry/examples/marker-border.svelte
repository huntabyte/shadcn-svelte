<script lang="ts">
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import GitBranchIcon from "@lucide/svelte/icons/git-branch";
	import SearchIcon from "@lucide/svelte/icons/search";
</script>

<div class="flex w-full max-w-sm flex-col gap-3 py-12">
	<Marker.Root variant="border">
		<Marker.Icon>
			<GitBranchIcon />
		</Marker.Icon>
		<Marker.Content>Switched to release-candidate</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="border">
		<Marker.Icon>
			<SearchIcon />
		</Marker.Icon>
		<Marker.Content>Reviewed 8 related files</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="border">
		<Marker.Icon>
			<FileTextIcon />
		</Marker.Icon>
		<Marker.Content>Opened implementation notes</Marker.Content>
	</Marker.Root>
</div>
