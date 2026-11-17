<script lang="ts">
	import { onMount, type Component } from "svelte";
	import LanguagePreview from "$lib/components/language-selector/language-preview.svelte";
	const examples = import.meta.glob<{ default: Component }>(
		"../../../src/lib/registry/examples/*-rtl.svelte"
	);
	let Example = $state<Component | null>(null);
	const name = new URLSearchParams(window.location.search).get("example");
	onMount(async () => {
		const load = examples[`../../../src/lib/registry/examples/${name}-rtl.svelte`];
		if (load) Example = (await load()).default;
	});
</script>

{#if Example && name === "shimmer"}<div data-testid="rtl-example">
		<Example />
	</div>{:else if Example}<LanguagePreview fullPage={name === "sidebar"}
		><div class="flex min-h-72 items-center justify-center p-10" data-testid="rtl-example">
			<Example />
		</div></LanguagePreview
	>{/if}
