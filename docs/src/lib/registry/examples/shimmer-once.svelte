<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";

	let key = $state(0);
</script>

<div class="flex flex-col items-center gap-4">
	{#key key}
		<p class="shimmer text-muted-foreground shimmer-duration-1100 shimmer-once text-sm">
			Generating response&hellip;
		</p>
	{/key}
	<Button variant="outline" size="sm" onclick={() => key++}>Replay</Button>
</div>
