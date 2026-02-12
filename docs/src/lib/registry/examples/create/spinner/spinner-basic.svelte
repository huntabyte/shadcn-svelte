<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
</script>

<Example title="Basic">
	<div class="flex items-center gap-6">
		<Spinner />
		<Spinner class="size-6" />
	</div>
</Example>
