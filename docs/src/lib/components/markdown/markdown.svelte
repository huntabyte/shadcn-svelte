<script lang="ts">
	import { Streamdown, type StreamdownProps } from "svelte-streamdown";
	import { cn } from "$lib/utils.js";
	import MarkdownCodeBlock from "./markdown-code-block.svelte";

	let {
		class: className,
		components = { code: MarkdownCodeBlock },
		controls = false,
		...restProps
	}: StreamdownProps = $props();
</script>

<!--
	Mirrors upstream's `components/markdown.tsx`. React Streamdown puts
	`space-y-4 whitespace-normal …` on its root, svelte-streamdown doesn't, so
	the block spacing is added here.
-->
<Streamdown
	{components}
	{controls}
	class={cn(
		"w-full min-w-0 space-y-4 overflow-hidden whitespace-normal [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
		className
	)}
	{...restProps}
>
	<!-- Fenced code renders through `components.code`. Inline code stays inline. -->
	{#snippet codespan({ children })}
		<code class="rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.9em]">{@render children()}</code>
	{/snippet}
</Streamdown>
