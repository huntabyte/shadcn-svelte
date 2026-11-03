<script lang="ts">
	import { createAttachmentKey } from "svelte/attachments";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { getRoot } from "./toast-context.js";
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	let {
		children,
		class: className,
		ref = $bindable(null),
		child,
		...restProps
	}: HTMLButtonAttributes & {
		ref?: HTMLButtonElement | null;
		children?: Snippet;
		child?: Snippet<[{ props: HTMLButtonAttributes }]>;
	} = $props();
	const root = getRoot();
	const content = $derived(root.toast.actionProps?.children ?? children);
	const attachmentKey = createAttachmentKey();
	const elementProps = $derived({
		[attachmentKey]: (node: HTMLButtonElement) => {
			ref = node;
			return () => {
				if (ref === node) ref = null;
			};
		},
		...restProps,
		...root.toast.actionProps,
		children: undefined,
		type: "button" as const,
		"data-slot": "toast-action",
		"data-type": root.toast.type,
		class: cn(
			buttonVariants({ variant: "outline", size: "sm" }),
			"shrink-0",
			className,
			root.toast.actionProps?.class
		),
	});
</script>

{#if content !== undefined && content !== null && content !== ""}
	{#if child}{@render child({ props: elementProps })}{:else}
		<button {...elementProps}
			>{#if typeof content === "function"}{@render content()}{:else}{content}{/if}</button
		>
	{/if}
{/if}
