<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	let replay = $state(0);
</script>

<Example title="Once">
	<div class="flex flex-col items-center gap-4">
		{#key replay}
			<p class="shimmer text-sm text-muted-foreground shimmer-duration-1100 shimmer-once">
				Generating response&hellip;
			</p>
		{/key}
		<Button variant="outline" size="sm" onclick={() => (replay += 1)}>Replay</Button>
	</div>
</Example>
