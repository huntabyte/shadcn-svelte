<script lang="ts">
	import { Badge } from "$lib/registry/ui/badge/index.js";

	const tones = ["gray", "blue", "green", "red", "orange", "yellow", "purple", "pink", "turquoise"] as const;
</script>

<div class="flex flex-wrap items-center gap-2">
	{#each tones as tone (tone)}
		<Badge {tone}>{tone}</Badge>
	{/each}
</div>
