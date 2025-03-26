<script lang="ts">
	import { config } from "$lib/stores/index.js";
	import ThemeWrapper from "$lib/components/docs/theme-wrapper.svelte";
	import { generateBaseColorTemplate } from "$lib/components/colors/colors.js";

	const base = $derived(generateBaseColorTemplate($config.theme));

	let { setCodeString }: { setCodeString: (node: HTMLElement) => void } = $props();
</script>

<ThemeWrapper defaultTheme="zinc" class="relative space-y-4">
	<div data-rehype-pretty-code-fragment="">
		<pre
			class="max-h-[450px] p-4 overflow-x-auto rounded-lg border bg-zinc-950 dark:bg-zinc-900"
			use:setCodeString>{base.cssVarsTemplate}</pre>
	</div>
</ThemeWrapper>
