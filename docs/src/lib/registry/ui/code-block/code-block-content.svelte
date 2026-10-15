<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import CodeBlockLine from "./code-block-line.svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		class: className,
		style,
		code,
		wrap = false,
		lineNumbers = false,
		startLine = 1,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLPreElement>> & {
		/** Plain text to render. Split into lines when `lineNumbers` is set. */
		code?: string;
		wrap?: boolean;
		lineNumbers?: boolean;
		startLine?: number;
	} = $props();
</script>

<!-- The markup is kept tight because whitespace inside a <pre> is rendered. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<pre
	bind:this={ref}
	data-slot="code-block-content"
	data-wrap={wrap || undefined}
	data-numbered={lineNumbers || undefined}
	dir="ltr"
	tabindex={0}
	style="counter-reset: line {startLine - 1};{style ?? ''}"
	class={cn(
		"cn-code-block-content min-h-0 min-w-0 scroll-fade-x scrollbar-thin overflow-auto text-start font-mono outline-none data-wrap:scroll-fade-y data-wrap:wrap-break-word data-wrap:whitespace-pre-wrap",
		className
	)}
	{...restProps}><code
		data-slot="code-block-code"
		class="cn-code-block-code grid min-h-lh min-w-max content-start in-data-numbered:grid-cols-[auto_1fr] in-data-wrap:min-w-0"
		>{#if code !== undefined && lineNumbers}{#each code
				.replace(/\n$/, "")
				.split("\n") as line, index (index)}<CodeBlockLine
					code={line}
				/>{/each}{:else if code !== undefined}{code}{:else}{@render children?.()}{/if}</code
	></pre>
