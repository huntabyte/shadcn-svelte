<script lang="ts">
	import { createAttachmentKey } from "svelte/attachments";
	import { cn } from "$lib/utils.js";
	import { getRoot } from "./toast-context.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	const defaultId = $props.id();
	let {
		children,
		child,
		class: className,
		id = defaultId,
		ref = $bindable(null),
		...restProps
	}: HTMLAttributes<HTMLHeadingElement> & {
		ref?: HTMLHeadingElement | null;
		children?: Snippet;
		child?: Snippet<[{ props: Record<string, unknown>; state: { type?: string } }]>;
	} = $props();
	const root = getRoot();
	const content = $derived(root.toast.title ?? children);
	$effect(() => {
		root.titleId =
			content !== undefined && content !== null && content !== "" ? (id ?? defaultId) : undefined;
		return () => {
			root.titleId = undefined;
		};
	});
	const attachmentKey = createAttachmentKey();
	const elementProps = $derived({
		...restProps,
		[attachmentKey]: (node: HTMLHeadingElement) => {
			ref = node;
			return () => {
				if (ref === node) ref = null;
			};
		},
		"data-slot": "toast-title",
		id,
		"data-type": root.toast.type,
		class: cn("text-sm font-medium", className),
	});
	const partState = $derived({ type: root.toast.type });
</script>

{#if content !== undefined && content !== null && content !== ""}
	{#if child}{@render child({ props: elementProps, state: partState })}{:else}
		<h2 {...elementProps}>
			{#if typeof content === "function"}{@render content()}{:else}{content}{/if}
		</h2>
	{/if}
{/if}
