<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
</script>

<div class="flex flex-wrap gap-2">
	<Badge>
		<Spinner />
		Syncing
	</Badge>
	<Badge variant="secondary">
		<Spinner />
		Loading
	</Badge>
	<Badge variant="outline">
		<Spinner />
		Processing
	</Badge>
</div>
