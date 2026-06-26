<script lang="ts">
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import CheckIcon from "@lucide/svelte/icons/check";
	import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
</script>

<div class="flex w-full max-w-sm flex-col gap-4 py-12">
	<Marker.Root>
		<Marker.Icon>
			<CheckIcon />
		</Marker.Icon>
		<Marker.Content>Explored 4 files</Marker.Content>
	</Marker.Root>
	<Marker.Root role="status">
		<Marker.Icon>
			<LoaderCircleIcon class="animate-spin" />
		</Marker.Icon>
		<Marker.Content>Checking the logs...</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="separator">
		<Marker.Content>Today</Marker.Content>
	</Marker.Root>
</div>
