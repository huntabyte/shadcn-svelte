<script lang="ts">
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import CopyIcon from "@tabler/icons-svelte/icons/copy";
	import CheckIcon from "@tabler/icons-svelte/icons/check";
	import Css from "./icons/css.svelte";
	import ColorIndicator from "./color-indicator.svelte";
	import {
		type BaseColor,
		type BaseColorOKLCH,
		getThemeCodeOKLCH,
		getThemeCodeHSLV4,
		getThemeCode,
	} from "./theme-customizer.svelte";

	interface Props {
		tailwindVersion: "v4-oklch" | "v4-hsl" | "v3";
		hasCopied: boolean;
		copyToClipboard: (text: string) => void;
		activeTheme: BaseColor | undefined;
		activeThemeOKLCH: BaseColorOKLCH | undefined;
	}

	let { tailwindVersion, hasCopied, copyToClipboard, activeTheme, activeThemeOKLCH }: Props =
		$props();
</script>

<Tabs.Root
	value={tailwindVersion}
	onValueChange={(v) => (tailwindVersion = v as "v4-oklch" | "v4-hsl" | "v3")}
	class="min-w-0 px-4 pb-4 md:p-0"
>
	<Tabs.List>
		<Tabs.Trigger value="v4-oklch">OKLCH</Tabs.Trigger>
		<Tabs.Trigger value="v4-hsl">HSL</Tabs.Trigger>
		<Tabs.Trigger value="v3">Tailwind v3</Tabs.Trigger>
	</Tabs.List>

	<Tabs.Content value="v4-oklch">
		<figure data-rehype-pretty-code-figure class="mx-0! mt-0 rounded-lg">
			<figcaption
				class="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
				data-rehype-pretty-code-title=""
				data-language="css"
				data-theme="github-dark github-light-default"
			>
				<Css class="fill-foreground" />
				app/globals.css
			</figcaption>
			<pre
				class="no-scrollbar max-h-[300px] min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-data-highlighted-line:px-0 has-data-line-numbers:px-0 has-data-[slot=tabs]:p-0 md:max-h-[450px]">
				<Button
					data-slot="copy-button"
					size="icon"
					variant="ghost"
					class="bg-code text-code-foreground absolute top-3 right-2 z-10 size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
					onclick={() => {
						copyToClipboard(getThemeCodeOKLCH(activeThemeOKLCH, 0.65));
					}}>
					<span class="sr-only">Copy</span>
					{#if hasCopied}
						<CheckIcon />
					{:else}
						<CopyIcon />
					{/if}
				</Button>
				<code data-line-numbers data-language="css" class="-my-10">
					<span data-line class="line text-code-foreground">&nbsp;:root &#123;</span>
					<span data-line class="line text-code-foreground">&nbsp;&nbsp;&nbsp;--radius: 0.65rem;</span>
					{#each Object.entries(activeThemeOKLCH?.light || {}) as [key, value] (key)}
						<span data-line class="line text-code-foreground"
							>&nbsp;&nbsp;&nbsp;--{key}: <ColorIndicator
								color={value}
							/> {value};</span
						>
					{/each}
					<span data-line class="line text-code-foreground">&nbsp;&#125;</span>
					<span data-line class="line text-code-foreground">&nbsp;</span>
					<span data-line class="line text-code-foreground">&nbsp;.dark &#123;</span>
					{#each Object.entries(activeThemeOKLCH?.dark || {}) as [key, value] (key)}
						<span data-line class="line text-code-foreground"
							>&nbsp;&nbsp;&nbsp;--{key}: <ColorIndicator
								color={value}
							/> {value};</span
						>
					{/each}
					<span data-line class="line text-code-foreground">&nbsp;&#125;</span>
				</code>
			</pre>
		</figure>
	</Tabs.Content>

	<Tabs.Content value="v4-hsl">
		<figure data-rehype-pretty-code-figure class="mx-0! mt-0 rounded-lg">
			<figcaption
				class="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
				data-rehype-pretty-code-title=""
				data-language="css"
				data-theme="github-dark github-light-default"
			>
				<Css class="fill-foreground" />
				app/globals.css
			</figcaption>
			<pre
				class="no-scrollbar max-h-[300px] min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-data-highlighted-line:px-0 has-data-line-numbers:px-0 has-data-[slot=tabs]:p-0 md:max-h-[450px]">
				<Button
					data-slot="copy-button"
					size="icon"
					variant="ghost"
					class="bg-code text-code-foreground absolute top-3 right-2 z-10 size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
					onclick={() => {
						copyToClipboard(getThemeCodeHSLV4(activeTheme, 0.65));
					}}>
					<span class="sr-only" data-llm-ignore>Copy</span>
					{#if hasCopied}
						<CheckIcon />
					{:else}
						<CopyIcon />
					{/if}
				</Button>
				<code data-line-numbers data-language="css" class="-my-10">
					<span data-line class="line text-code-foreground">&nbsp;:root &#123;</span>
					<span data-line class="line text-code-foreground">&nbsp;&nbsp;&nbsp;--radius: 0.65rem;</span>
					{#each Object.entries(activeTheme?.cssVars.light || {}) as [key, value] (key)}
						<span data-line class="line text-code-foreground"
							>&nbsp;&nbsp;&nbsp;--{key}: <ColorIndicator
								color={`hsl(${value})`}
							/> hsl({value});</span
						>
					{/each}
					<span data-line class="line text-code-foreground">&nbsp;&#125;</span>
					<span data-line class="line text-code-foreground">&nbsp;</span>
					<span data-line class="line text-code-foreground">&nbsp;.dark &#123;</span>
					{#each Object.entries(activeTheme?.cssVars.dark || {}) as [key, value] (key)}
						<span data-line class="line text-code-foreground"
							>&nbsp;&nbsp;&nbsp;--{key}: <ColorIndicator
								color={`hsl(${value})`}
							/> hsl({value});</span
						>
					{/each}
					<span data-line class="line text-code-foreground">&nbsp;&#125;</span>
				</code>
			</pre>
		</figure>
	</Tabs.Content>

	<Tabs.Content value="v3">
		<figure data-rehype-pretty-code-figure class="mx-0! mt-0 rounded-lg">
			<figcaption
				class="text-code-foreground [&_svg]:text-code-foreground flex items-center gap-2 [&_svg]:size-4 [&_svg]:opacity-70"
				data-rehype-pretty-code-title=""
				data-language="css"
				data-theme="github-dark github-light-default"
			>
				<Css class="fill-foreground" />
				app/globals.css
			</figcaption>
			<pre
				class="no-scrollbar max-h-[300px] min-w-0 overflow-x-auto px-4 py-3.5 outline-none has-data-highlighted-line:px-0 has-data-line-numbers:px-0 has-data-[slot=tabs]:p-0 md:max-h-[450px]">
				<Button
					data-slot="copy-button"
					size="icon"
					variant="ghost"
					class="bg-code text-code-foreground absolute top-3 right-2 z-10 size-7 shadow-none hover:opacity-100 focus-visible:opacity-100"
					onclick={() => {
						copyToClipboard(getThemeCode(activeTheme, 0.5));
					}}>
					<span class="sr-only">Copy</span>
					{#if hasCopied}
						<CheckIcon />
					{:else}
						<CopyIcon />
					{/if}
				</Button>
				<code data-line-numbers data-language="css" class="-my-10">
					<span data-line class="line">@layer base &#123;</span>
					<span data-line class="line">&nbsp;&nbsp;:root &#123;</span>
					<span data-line class="line"
						>&nbsp;&nbsp;&nbsp;&nbsp;--background: <ColorIndicator
							color={`hsl(${activeTheme?.cssVars.light["background"]})`}
						/> {activeTheme?.cssVars.light["background"]};</span
					>
					<span data-line class="line"
						>&nbsp;&nbsp;&nbsp;&nbsp;--foreground: <ColorIndicator
							color={`hsl(${activeTheme?.cssVars.light["foreground"]})`}
						/> {activeTheme?.cssVars.light["foreground"]};</span
					>
					{#each ["card", "popover", "primary", "secondary", "muted", "accent", "destructive"] as prefix (prefix)}
						<span data-line class="line"
							>&nbsp;&nbsp;&nbsp;&nbsp;--{prefix}: <ColorIndicator
								color={`hsl(${activeTheme?.cssVars.light[prefix] || ""})`}
							/> {activeTheme?.cssVars.light[prefix]};</span
						>
						<span data-line class="line"
							>&nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground: <ColorIndicator
								color={`hsl(${activeTheme?.cssVars.light[`${prefix}-foreground`] || ""})`}
							/> {activeTheme?.cssVars.light[`${prefix}-foreground`]};</span
						>
					{/each}
					<span data-line class="line"
						>&nbsp;&nbsp;&nbsp;&nbsp;--border: <ColorIndicator
							color={`hsl(${activeTheme?.cssVars.light["border"]})`}
						/> {activeTheme?.cssVars.light["border"]};</span
					>
					<span data-line class="line"
						>&nbsp;&nbsp;&nbsp;&nbsp;--input: <ColorIndicator
							color={`hsl(${activeTheme?.cssVars.light["input"]})`}
						/> {activeTheme?.cssVars.light["input"]};</span
					>
					<span data-line class="line"
						>&nbsp;&nbsp;&nbsp;&nbsp;--ring: <ColorIndicator
							color={`hsl(${activeTheme?.cssVars.light["ring"]})`}
						/> {activeTheme?.cssVars.light["ring"]};</span
					>
					<span data-line class="line">&nbsp;&nbsp;&nbsp;&nbsp;--radius: 0.5rem;</span>
					{#each ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"] as prefix (prefix)}
						<span data-line class="line"
							>&nbsp;&nbsp;&nbsp;&nbsp;--{prefix}: <ColorIndicator
								color={`hsl(${activeTheme?.cssVars.light[prefix] || ""})`}
							/> {activeTheme?.cssVars.light[prefix]};</span
						>
					{/each}
					<span data-line class="line">&nbsp;&nbsp;&#125;</span>
					<span data-line class="line">&nbsp;</span>
					<span data-line class="line">&nbsp;&nbsp;.dark &#123;</span>
					<span data-line class="line"
						>&nbsp;&nbsp;&nbsp;&nbsp;--background: <ColorIndicator
							color={`hsl(${activeTheme?.cssVars.dark["background"]})`}
						/> {activeTheme?.cssVars.dark["background"]};</span
					>
					<span data-line class="line"
						>&nbsp;&nbsp;&nbsp;&nbsp;--foreground: <ColorIndicator
							color={`hsl(${activeTheme?.cssVars.dark["foreground"]})`}
						/> {activeTheme?.cssVars.dark["foreground"]};</span
					>
					{#each ["card", "popover", "primary", "secondary", "muted", "accent", "destructive"] as prefix (prefix)}
						<span data-line class="line"
							>&nbsp;&nbsp;&nbsp;&nbsp;--{prefix}: <ColorIndicator
								color={`hsl(${activeTheme?.cssVars.dark[prefix] || ""})`}
							/> {activeTheme?.cssVars.dark[prefix]};</span
						>
						<span data-line class="line"
							>&nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground: <ColorIndicator
								color={`hsl(${activeTheme?.cssVars.dark[`${prefix}-foreground`] || ""})`}
							/> {activeTheme?.cssVars.dark[`${prefix}-foreground`]};</span
						>
					{/each}
					<span data-line class="line"
						>&nbsp;&nbsp;&nbsp;&nbsp;--border: <ColorIndicator
							color={`hsl(${activeTheme?.cssVars.dark["border"]})`}
						/> {activeTheme?.cssVars.dark["border"]};</span
					>
					<span data-line class="line"
						>&nbsp;&nbsp;&nbsp;&nbsp;--input: <ColorIndicator
							color={`hsl(${activeTheme?.cssVars.dark["input"]})`}
						/> {activeTheme?.cssVars.dark["input"]};</span
					>
					<span data-line class="line"
						>&nbsp;&nbsp;&nbsp;&nbsp;--ring: <ColorIndicator
							color={`hsl(${activeTheme?.cssVars.dark["ring"]})`}
						/> {activeTheme?.cssVars.dark["ring"]};</span
					>
					{#each ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"] as prefix (prefix)}
						<span data-line class="line"
							>&nbsp;&nbsp;&nbsp;&nbsp;--{prefix}: <ColorIndicator
								color={`hsl(${activeTheme?.cssVars.dark[prefix] || ""})`}
							/> {activeTheme?.cssVars.dark[prefix]};</span
						>
					{/each}
					<span data-line class="line">&nbsp;&nbsp;&#125;</span>
					<span data-line class="line">&#125;</span>
				</code>
			</pre>
		</figure>
	</Tabs.Content>
</Tabs.Root>
