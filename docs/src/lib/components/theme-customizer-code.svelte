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
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { baseColorsOKLCH } from "$lib/registry/registry-base-colors.js";
	import { theme as activeTheme } from "mode-watcher";
	import Css from "./icons/css.svelte";
	import CheckIcon from "@lucide/svelte/icons/check";
	import ClipboardIcon from "@lucide/svelte/icons/clipboard";
	import { Button } from "$lib/registry/ui/button/index.js";

	const trueActiveTheme = $derived(
		activeTheme.current === "default" ? "neutral" : (activeTheme.current ?? "neutral")
	);

	const activeThemeOKLCH = $derived(
		baseColorsOKLCH[trueActiveTheme as keyof typeof baseColorsOKLCH]
	);

	const clipboard = new UseClipboard();
</script>

<div class="min-w-0 px-4 pb-4 md:p-0">
	<figure data-rehype-pretty-code-figure class="!mx-0 mt-0 rounded-lg">
		<figcaption
			class="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
			data-rehype-pretty-code-title=""
			data-language="css"
			data-theme="github-dark github-light-default"
		>
			<Css class="fill-foreground" />
			src/routes/layout.css
		</figcaption>
		<pre
			class="no-scrollbar max-h-[300px] min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-[[data-slot=tabs]]:p-0 has-[[data-highlighted-line]]:px-0 has-[[data-line-numbers]]:px-0 md:max-h-[450px]"><Button
				data-slot="copy-button"
				size="icon"
				variant="ghost"
				class="bg-code text-code-foreground absolute end-2 top-3 z-10 size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
				onclick={() => {
					clipboard.copy(getThemeCodeOKLCH(activeThemeOKLCH, 0.65));
				}}
				><span class="sr-only" data-llm-ignore>Copy</span>{#if clipboard.copied}<CheckIcon
					/>{:else}<ClipboardIcon />{/if}</Button
			><code data-line-numbers data-language="css"
				><span data-line class="line text-code-foreground">&nbsp;:root &#123;</span><span
					data-line
					class="line text-code-foreground">&nbsp;&nbsp;&nbsp;--radius: 0.65rem;</span
				>{#each Object.entries(activeThemeOKLCH?.light) as [key, value] (key)}<span
						data-line
						class="line text-code-foreground">&nbsp;&nbsp;&nbsp;--{key}: {value};</span
					>{/each}<span data-line class="line text-code-foreground">&nbsp;&#125;</span
				><span data-line class="line text-code-foreground">&nbsp;</span><span
					data-line
					class="line text-code-foreground">&nbsp;.dark &#123;</span
				>{#each Object.entries(activeThemeOKLCH?.dark) as [key, value] (key)}<span
						data-line
						class="line text-code-foreground">&nbsp;&nbsp;&nbsp;--{key}: {value};</span
					>{/each}<span data-line class="line text-code-foreground">&nbsp;&#125;</span
				></code
			></pre>
	</figure>
</div>
