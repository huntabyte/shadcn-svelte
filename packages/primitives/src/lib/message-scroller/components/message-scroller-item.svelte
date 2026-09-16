<script lang="ts">
	import { watch } from "runed";
	import { attachRef, boxWith, mergeProps } from "svelte-toolbelt";
	import type { MessageScrollerItemProps } from "../types.js";
	import { MessageScrollerProviderState } from "../message-scroller.svelte.js";

	let {
		children,
		child,
		ref = $bindable(null),
		messageId,
		scrollAnchor = false,
		...restProps
	}: MessageScrollerItemProps = $props();

	const root = MessageScrollerProviderState.get();
	let element = $state<HTMLDivElement | null>(null);

	const attachment = attachRef(
		boxWith(
			() => ref,
			(v) => (ref = v)
		),
		(node) => {
			element = node as HTMLDivElement | null;
		}
	);

	watch(
		() => element,
		(currentElement) => {
			if (!messageId || !currentElement) {
				return;
			}

			root.registerMessage(messageId, currentElement);

			return () => {
				root.registerMessage(messageId, null, currentElement);
			};
		}
	);

	const mergedProps = $derived(
		mergeProps(restProps, {
			"data-message-id": messageId,
			"data-scroll-anchor": scrollAnchor ? "true" : "false",
			...attachment,
		})
	);
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div {...mergedProps}>
		{@render children?.()}
	</div>
{/if}
