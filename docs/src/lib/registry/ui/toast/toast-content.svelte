<script lang="ts">
	import { createAttachmentKey } from "svelte/attachments";
	import { cn } from "$lib/utils.js";
	import { getRoot } from "./toast-context.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	let {
		children,
		child,
		class: className,
		ref = $bindable(null),
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		ref?: HTMLDivElement | null;
		children?: Snippet;
		child?: Snippet<
			[{ props: Record<string, unknown>; state: { expanded: boolean; behind: boolean } }]
		>;
	} = $props();
	const root = getRoot();
	const attachmentKey = createAttachmentKey();
	const elementProps = $derived({
		...restProps,
		[attachmentKey]: (node: HTMLDivElement) => {
			ref = node;
			return () => {
				if (ref === node) ref = null;
			};
		},
		"data-slot": "toast-content",
		"data-behind": root.index > 0 ? "" : undefined,
		"data-expanded": root.expanded ? "" : undefined,
		class: cn("base-toast-content flex h-full items-center gap-3 overflow-hidden p-4", className),
	});
	const partState = $derived({ expanded: root.expanded, behind: root.index > 0 });
</script>

{#if child}{@render child({ props: elementProps, state: partState })}{:else}
	<div {...elementProps}>
		{@render children?.()}
	</div>
{/if}
