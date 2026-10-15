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
	}: HTMLAttributes<HTMLParagraphElement> & {
		ref?: HTMLParagraphElement | null;
		children?: Snippet;
		child?: Snippet<[{ props: Record<string, unknown>; state: { type?: string } }]>;
	} = $props();
	const root = getRoot();
	const content = $derived(root.toast.description ?? children);
	$effect(() => {
		root.descriptionId =
			content !== undefined && content !== null && content !== "" ? (id ?? defaultId) : undefined;
		return () => {
			root.descriptionId = undefined;
		};
	});
	const attachmentKey = createAttachmentKey();
	const elementProps = $derived({
		...restProps,
		[attachmentKey]: (node: HTMLParagraphElement) => {
			ref = node;
			return () => {
				if (ref === node) ref = null;
			};
		},
		"data-slot": "toast-description",
		id,
		"data-type": root.toast.type,
		class: cn("text-sm text-muted-foreground", className),
	});
	const partState = $derived({ type: root.toast.type });
</script>

{#if content !== undefined && content !== null && content !== ""}
	{#if child}{@render child({ props: elementProps, state: partState })}{:else}
		<p {...elementProps}>
			{#if typeof content === "function"}{@render content()}{:else}{content}{/if}
		</p>
	{/if}
{/if}
