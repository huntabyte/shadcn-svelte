<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
</script>

<div class="flex flex-wrap gap-2">
	<Badge variant="destructive">
		<Spinner data-icon="inline-start" />
		Deleting
	</Badge>
	<Badge variant="secondary">
		Generating
		<Spinner data-icon="inline-end" />
	</Badge>
</div>
