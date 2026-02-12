<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
</script>

<Example title="In Buttons">
	<div class="flex flex-wrap items-center gap-4">
		<Button>
			<Spinner data-icon="inline-start" /> Submit
		</Button>
		<Button disabled>
			<Spinner data-icon="inline-start" /> Disabled
		</Button>
		<Button variant="outline" disabled>
			<Spinner data-icon="inline-start" /> Outline
		</Button>
		<Button variant="outline" size="icon" disabled>
			<Spinner data-icon="inline-start" />
			<span class="sr-only">Loading...</span>
		</Button>
	</div>
</Example>
