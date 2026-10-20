<script lang="ts">
	import { components } from "$content/index.js";
	import { PAGES_NEW } from "$lib/navigation.js";

	let { variant = "all" }: { variant?: "all" | "new" } = $props();

	const list = $derived(
		components.filter(
			(component) =>
				component.title !== "Components" &&
				(variant === "all" || PAGES_NEW.includes(`/docs${component.slugFull}`))
		)
	);
</script>

{#if list.length}
	<div
		class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-x-8 lg:gap-x-16 lg:gap-y-6 xl:gap-x-20"
	>
		{#each list as component (component.title)}
			<a
				href="/docs{component.slugFull}"
				class="inline-flex items-center gap-2 text-lg font-medium underline-offset-4 hover:underline md:text-base"
			>
				{component.title}
				{#if variant === "all" && PAGES_NEW.includes("/docs" + component.slugFull)}
					<span class="sr-only">New</span>
					<span aria-hidden="true" class="flex size-2 rounded-full bg-svelte-orange"></span>
				{/if}
			</a>
		{/each}
	</div>
{/if}
