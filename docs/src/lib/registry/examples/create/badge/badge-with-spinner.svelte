<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
</script>

<Example title="With Spinner" class="max-w-fit">
	<div class="flex flex-wrap gap-2">
		<Badge>
			<Spinner data-icon="inline-start" />
			Default
		</Badge>
		<Badge variant="secondary">
			<Spinner data-icon="inline-start" />
			Secondary
		</Badge>
		<Badge variant="destructive">
			<Spinner data-icon="inline-start" />
			Destructive
		</Badge>
		<Badge variant="outline">
			<Spinner data-icon="inline-start" />
			Outline
		</Badge>
		<Badge variant="ghost">
			<Spinner data-icon="inline-start" />
			Ghost
		</Badge>
		<Badge variant="link">
			<Spinner data-icon="inline-start" />
			Link
		</Badge>
	</div>
</Example>
