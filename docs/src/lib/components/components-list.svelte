<script lang="ts">
	import { components } from "$content/index.js";

	const list = components.filter((c) => {
		if (c.title === "Components") return false;
		return true;
	});
</script>

<div
	class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20"
>
	{#each list as component (component.title)}
		<a
			href="/docs{component.slugFull}"
			class="text-lg font-medium underline-offset-4 hover:underline md:text-base"
		>
			{component.title}
		</a>
	{/each}
</div>
