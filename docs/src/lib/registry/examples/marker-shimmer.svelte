<script lang="ts">
	import * as Marker from "$lib/registry/ui/marker/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Marker.Root role="status">
		<Marker.Content class="shimmer">Thinking...</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="separator" role="status">
		<Marker.Content class="shimmer">Reading 4 files</Marker.Content>
	</Marker.Root>
</div>
