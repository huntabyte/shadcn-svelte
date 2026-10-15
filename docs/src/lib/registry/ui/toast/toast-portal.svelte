<script lang="ts">
	import { onMount, type Snippet } from "svelte";
	import { createAttachmentKey } from "svelte/attachments";
	import type { HTMLAttributes } from "svelte/elements";
	let {
		container,
		children,
		child,
		ref = $bindable(null),
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		container?: HTMLElement | ShadowRoot | null;
		ref?: HTMLDivElement | null;
		children?: Snippet;
		child?: Snippet<[{ props: HTMLAttributes<HTMLDivElement> }]>;
	} = $props();
	let mounted = $state(false);
	onMount(() => {
		mounted = true;
	});
	function portal(node: HTMLDivElement) {
		(container ?? document.body).append(node);
		return {
			destroy() {
				node.remove();
			},
		};
	}
	const attachmentKey = createAttachmentKey();
	const elementProps = $derived({
		...restProps,
		"data-slot": "toast-portal",
		[attachmentKey]: (node: HTMLDivElement) => {
			ref = node;
			const cleanup = portal(node);
			return () => {
				cleanup.destroy();
				if (ref === node) ref = null;
			};
		},
	});
</script>

{#if mounted}
	{#if child}{@render child({ props: elementProps })}{:else}<div {...elementProps}>
			{@render children?.()}
		</div>{/if}
{/if}
