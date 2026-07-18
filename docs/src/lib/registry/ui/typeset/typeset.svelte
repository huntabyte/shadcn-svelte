<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { ref = $bindable(null), class: className, children, ...restProps }: WithElementRef<
		HTMLAttributes<HTMLDivElement>
	> = $props();
</script>

<div bind:this={ref} data-slot="typeset" class={cn("typeset", className)} {...restProps}>
	{@render children?.()}
</div>

<style>
	.typeset { color: var(--foreground, currentColor); font-size: 1rem; line-height: 1.75; overflow-wrap: break-word; }
	.typeset :global(p), .typeset :global(ul), .typeset :global(ol), .typeset :global(pre), .typeset :global(blockquote), .typeset :global(figure), .typeset :global(table), .typeset :global(details) { margin-top: 1.25em; }
	.typeset :global(h1), .typeset :global(h2), .typeset :global(h3), .typeset :global(h4), .typeset :global(h5), .typeset :global(h6) { color: var(--foreground, currentColor); font-family: var(--font-heading, inherit); font-weight: 600; line-height: 1.3; margin-top: 1.5em; }
	.typeset :global(h1) { font-size: 1.75em; }
	.typeset :global(h2) { font-size: 1.25em; }
	.typeset :global(h3) { font-size: 1.125em; }
	.typeset :global(h5), .typeset :global(h6), .typeset :global(figcaption) { color: var(--muted-foreground, currentColor); }
	.typeset :global(a) { color: inherit; font-weight: 500; text-decoration: underline; text-decoration-color: color-mix(in oklab, currentColor 30%, transparent); }
	.typeset :global(a:hover) { text-decoration-color: currentColor; }
	.typeset :global(ul), .typeset :global(ol) { padding-inline-start: 1.5em; }
	.typeset :global(ul) { list-style: disc; }
	.typeset :global(ol) { list-style: decimal; }
	.typeset :global(li) { margin-top: .5em; padding-inline-start: .4em; }
	.typeset :global(code) { background: var(--muted, color-mix(in oklab, currentColor 8%, transparent)); border-radius: calc(var(--radius, .5em) * .6); font-family: var(--font-mono, monospace); font-size: .85em; padding: .125em .3em; }
	.typeset :global(pre) { background: var(--muted, color-mix(in oklab, currentColor 8%, transparent)); border-radius: var(--radius, .5em); font-family: var(--font-mono, monospace); font-size: .875em; overflow-x: auto; padding: .75em 1em; }
	.typeset :global(pre code) { background: transparent; font-size: inherit; padding: 0; }
	.typeset :global(blockquote) { border-inline-start: 2px solid var(--border, currentColor); margin-inline: 0; padding-inline-start: 1em; }
	.typeset :global(hr) { border: 0; border-top: 1px solid var(--border, currentColor); margin-top: 2.5em; }
	.typeset :global(img), .typeset :global(video) { border-radius: var(--radius, .5em); height: auto; max-width: 100%; }
	.typeset :global(table) { border-collapse: collapse; display: block; max-width: 100%; overflow-x: auto; }
	.typeset :global(th), .typeset :global(td) { border-bottom: 1px solid var(--border, currentColor); padding: .65em 1em; text-align: start; }
	.typeset :global(th) { font-weight: 500; }
	.typeset :global(:first-child) { margin-top: 0; }
</style>
