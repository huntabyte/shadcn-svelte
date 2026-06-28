<script lang="ts">
	import { getContext } from "svelte";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { MESSAGE_SCROLLER_CONTEXT, type MessageScrollerContextValue } from "./context.js";

	const controller = getContext<MessageScrollerContextValue | null>(MESSAGE_SCROLLER_CONTEXT);

	let {
		ref = $bindable(null),
		class: className,
		messageId,
		scrollAnchor = false,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		messageId?: string;
		scrollAnchor?: boolean;
	} = $props();

	$effect(() => {
		const element = ref;
		const id = messageId;

		if (id) {
			controller?.registerMessage(id, element);
		}

		controller?.scheduleContentChange();

		return () => {
			if (id) {
				controller?.registerMessage(id, null, element);
			}
		};
	});
</script>

<div
	bind:this={ref}
	data-slot="message-scroller-item"
	data-message-id={messageId}
	data-scroll-anchor={scrollAnchor ? "true" : "false"}
	class={cn(
		"min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</div>
