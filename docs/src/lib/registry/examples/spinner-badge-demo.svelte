<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
</script>

<div class="flex items-center gap-4 [--radius:1.2rem]">
	<Badge>
		<Spinner data-icon="inline-start" />
		Syncing
	</Badge>
	<Badge variant="secondary">
		<Spinner data-icon="inline-start" />
		Updating
	</Badge>
	<Badge variant="outline">
		<Spinner data-icon="inline-start" />
		Processing
	</Badge>
</div>
