<script lang="ts">
	import { createAttachmentKey } from "svelte/attachments";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { getRoot, getProvider } from "./toast-context.js";
	import type { Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	let {
		children,
		class: className,
		ref = $bindable(null),
		child,
		onclick,
		...restProps
	}: HTMLButtonAttributes & {
		ref?: HTMLButtonElement | null;
		children?: Snippet;
		child?: Snippet<[{ props: HTMLButtonAttributes }]>;
	} = $props();
	const root = getRoot();
	const { store } = getProvider();
	const attachmentKey = createAttachmentKey();
	const elementProps = $derived({
		[attachmentKey]: (node: HTMLButtonElement) => {
			ref = node;
			return () => {
				if (ref === node) ref = null;
			};
		},
		...restProps,
		type: "button" as const,
		"data-slot": "toast-close",
		"data-type": root.toast.type,
		"aria-label": restProps["aria-label"] ?? "Close toast",
		class: cn(
			buttonVariants({ variant: "ghost", size: "icon-sm" }),
			"relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground",
			className
		),
		onclick: (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) => {
			onclick?.(event);
			if (!event.defaultPrevented) store.close(root.toast.id);
		},
	});
</script>

{#if child}{@render child({ props: elementProps })}{:else}
	<button {...elementProps}>
		{#if children}{@render children()}{:else}
			<IconPlaceholder
				lucide="XIcon"
				tabler="IconX"
				hugeicons="Cancel01Icon"
				phosphor="XIcon"
				remixicon="RiCloseLine"
				aria-hidden="true"
			/>
		{/if}
	</button>
{/if}
