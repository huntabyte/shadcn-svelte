<script lang="ts">
	import { components } from "$content/index.js";
	import { NEW_COMPONENTS } from "$lib/navigation.js";

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
			class="flex items-center gap-2 text-lg font-medium underline-offset-4 hover:underline md:text-base"
		>
			{component.title}
			{#if NEW_COMPONENTS.has(component.slug)}
				<span class="bg-svelte-orange flex size-2 rounded-full" title="New"></span>
			{/if}
		</a>
	{/each}
</div>
