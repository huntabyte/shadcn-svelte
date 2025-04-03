<script lang="ts">
	import { config } from "$lib/stores/index.js";
	import ThemeWrapper from "$lib/components/docs/theme-wrapper.svelte";
	import { generateBaseColorTemplate } from "$lib/components/colors/colors.js";

	const base = $derived(generateBaseColorTemplate(config.current.theme));

	let { setCodeString }: { setCodeString: (node: HTMLElement) => void } = $props();
</script>

<ThemeWrapper defaultTheme="zinc" class="relative space-y-4">
	<div data-rehype-pretty-code-fragment="">
		<pre
			class="max-h-[450px] overflow-x-auto rounded-lg border bg-zinc-950 p-4 dark:bg-zinc-900"
			use:setCodeString><code
				class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm"
				>{base.cssVarsTemplate}</code
			></pre>
	</div>
</ThemeWrapper>
