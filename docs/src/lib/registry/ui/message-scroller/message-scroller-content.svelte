<script lang="ts">
	import { getContext } from "svelte";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { MESSAGE_SCROLLER_CONTEXT, type MessageScrollerContextValue } from "./context.js";

	const controller = getContext<MessageScrollerContextValue | null>(MESSAGE_SCROLLER_CONTEXT);

	let {
		ref = $bindable(null),
		"aria-relevant": ariaRelevant = "additions",
		class: className,
		children,
		role = "log",
		spacerClassName,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		spacerClassName?: string;
	} = $props();

	let spacerRef = $state<HTMLDivElement | null>(null);

	$effect(() => {
		controller?.setContentElement(ref);
		controller?.handleContentChange();

		if (!ref || !controller) return;

		const mutationObserver =
			typeof MutationObserver === "undefined"
				? null
				: new MutationObserver(controller.scheduleContentChange);
		const resizeObserver =
			typeof ResizeObserver === "undefined"
				? null
				: new ResizeObserver(controller.handleResize);

		mutationObserver?.observe(ref, { childList: true });
		resizeObserver?.observe(ref);

		return () => {
			controller?.setContentElement(null);
			mutationObserver?.disconnect();
			resizeObserver?.disconnect();
		};
	});

	$effect(() => {
		controller?.setSpacerElement(spacerRef);
		return () => controller?.setSpacerElement(null);
	});
</script>

<div
	bind:this={ref}
	data-slot="message-scroller-content"
	{role}
	aria-relevant={ariaRelevant}
	class={cn("flex h-max min-h-full flex-col gap-8", className)}
	{...restProps}
>
	{@render children?.()}
	<div
		bind:this={spacerRef}
		aria-hidden="true"
		data-message-scroller-spacer="true"
		hidden
		class={cn("shrink-0", spacerClassName)}
	></div>
</div>
