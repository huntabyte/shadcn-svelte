<script lang="ts" module>
	interface BaseColorOKLCH {
		light: Record<string, string>;
		dark: Record<string, string>;
	}
	function getThemeCodeOKLCH(theme: BaseColorOKLCH | undefined, radius: number) {
		if (!theme) {
			return "";
		}

		const rootSection =
			":root {\n  --radius: " +
			radius +
			"rem;\n" +
			Object.entries(theme.light)
				.map((entry) => "  --" + entry[0] + ": " + entry[1] + ";")
				.join("\n") +
			"\n}\n\n.dark {\n" +
			Object.entries(theme.dark)
				.map((entry) => "  --" + entry[0] + ": " + entry[1] + ";")
				.join("\n") +
			"\n}\n";

		return rootSection;
	}
</script>

<script lang="ts">
	import { config } from "$lib/stores/index.js";
	import ThemeWrapper from "$lib/components/docs/theme-wrapper.svelte";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { baseColorsOKLCH } from "$lib/registry/registry-base-colors.js";
	import CheckIcon from "@lucide/svelte/icons/check";
	import ClipboardIcon from "@lucide/svelte/icons/clipboard";
	import { Button } from "$lib/registry/ui/button/index.js";

	const clipboard = new UseClipboard();
	const activeThemeOKLCH = $derived(
		baseColorsOKLCH[$config.theme as keyof typeof baseColorsOKLCH]
	);
</script>

<ThemeWrapper defaultTheme="zinc" class="relative space-y-4">
	<Button
		size="sm"
		variant="outline"
		onclick={() => {
			clipboard.copy(getThemeCodeOKLCH(activeThemeOKLCH, $config.radius));
		}}
		class="absolute right-0 top-0 shadow-none"
	>
		{#if clipboard.copied}
			<CheckIcon />
		{:else}
			<ClipboardIcon />
		{/if}
		Copy
	</Button>
	<figure data-rehype-pretty-code-fragment="" class="mt-12">
		<pre
			class="flex max-h-[450px] flex-col overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
			<code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
			  <span class="line text-white">&nbsp;:root &#123;</span>
			  <span class="line text-white">&nbsp;&nbsp;&nbsp;--radius: {$config.radius}rem;</span>
			  {#each Object.entries(activeThemeOKLCH?.light) as [key, value] (key)}
					<span class="line text-white">&nbsp;&nbsp;&nbsp;--{key}: {value};</span>
				{/each}
			  <span class="line text-white">&nbsp;&#125;</span>
			  <span class="line text-white">&nbsp;</span>
			  <span class="line text-white">&nbsp;.dark &#123;</span>
			  {#each Object.entries(activeThemeOKLCH?.dark) as [key, value] (key)}
					<span class="line text-white">&nbsp;&nbsp;&nbsp;--{key}: {value};</span>
				{/each}
			  <span class="line text-white">&nbsp;&#125;</span>
			</code>
		  </pre>
	</figure>
</ThemeWrapper>
