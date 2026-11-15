<script lang="ts">
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Marker.Root role="status">
		<Marker.Icon>
			<Spinner />
		</Marker.Icon>
		<Marker.Content>Compacting conversation</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="separator" role="status">
		<Marker.Icon>
			<Spinner />
		</Marker.Icon>
		<Marker.Content>Running tests</Marker.Content>
	</Marker.Root>
</div>
