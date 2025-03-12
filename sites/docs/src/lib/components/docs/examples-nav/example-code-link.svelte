<script lang="ts">
	import ArrowRight from "@lucide/svelte/icons/arrow-right";
	import { page } from "$app/state";
	import { examples } from "$lib/config/docs.js";

	const example = $derived(
		examples.find((example) => page.url.pathname.startsWith(example.href))
	);
</script>

{#if example?.code}
	<a
		href={example.code}
		target="_blank"
		rel="nofollow"
		class="absolute right-0 top-0 hidden items-center rounded-[0.5rem] text-sm font-medium md:flex"
	>
		View Code
		<ArrowRight class="ml-1 size-4" />
	</a>
{/if}
