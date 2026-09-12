<script lang="ts">
	import * as Marker from "$lib/registry/ui/marker/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Marker.Root>
		<Marker.Content>A default marker for inline notes.</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="separator">
		<Marker.Content>A separator marker</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="border">
		<Marker.Content>A border marker for row boundaries.</Marker.Content>
	</Marker.Root>
</div>
