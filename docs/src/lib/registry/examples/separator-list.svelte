<script lang="ts">
	import { Separator } from "$lib/registry/ui/separator/index.js";

	const tags = ["React", "Vue", "Svelte", "Angular", "Solid"];
</script>

<div>
	<h4 class="text-sm leading-none font-medium">Frameworks</h4>
	<Separator class="my-4" />
	<div class="flex h-5 items-center space-x-4 text-sm">
		{#each tags as tag, i (tag)}
			{tag}
			{#if i < tags.length - 1}
				<Separator orientation="vertical" />
			{/if}
		{/each}
	</div>
</div>
