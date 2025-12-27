<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
</script>

<Example title="In Badges" class="items-center justify-center">
	<div class="flex flex-wrap items-center justify-center gap-4">
		<Badge>
			<Spinner data-icon="inline-start" />
			Badge
		</Badge>
		<Badge variant="secondary">
			<Spinner data-icon="inline-start" />
			Badge
		</Badge>
		<Badge variant="destructive">
			<Spinner data-icon="inline-start" />
			Badge
		</Badge>
		<Badge variant="outline">
			<Spinner data-icon="inline-start" />
			Badge
		</Badge>
	</div>
</Example>
