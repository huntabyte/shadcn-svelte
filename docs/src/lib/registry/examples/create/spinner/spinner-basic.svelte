<script lang="ts">
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Basic">
	<div class="flex items-center gap-6">
		<Spinner />
		<Spinner class="size-6" />
	</div>
</Example>
