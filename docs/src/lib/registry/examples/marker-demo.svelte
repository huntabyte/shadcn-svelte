<script lang="ts">
	import GitBranchIcon from "@lucide/svelte/icons/git-branch";
	import SearchIcon from "@lucide/svelte/icons/search";
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Marker.Root>
		<Marker.Icon>
			<GitBranchIcon />
		</Marker.Icon>
		<Marker.Content>Switched to a new branch</Marker.Content>
	</Marker.Root>
	<Marker.Root role="status">
		<Marker.Icon>
			<Spinner />
		</Marker.Icon>
		<Marker.Content class="shimmer">Thinking...</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="separator">
		<Marker.Content>Conversation compacted</Marker.Content>
	</Marker.Root>
	<Marker.Root>
		<Marker.Icon>
			<SearchIcon />
		</Marker.Icon>
		<Marker.Content>Explored 4 files</Marker.Content>
	</Marker.Root>
</div>
