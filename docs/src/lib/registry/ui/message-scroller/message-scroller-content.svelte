<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { useMessageScrollerController } from "./message-scroller.svelte.js";
	import type { HTMLAttributes } from "svelte/elements";

	const controller = useMessageScrollerController();

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
		controller.setContentElement(ref);
		controller.handleContentChange();
		if (!ref) return () => controller.setContentElement(null);

		const mutationObserver =
			typeof MutationObserver === "undefined"
				? null
				: new MutationObserver(controller.scheduleContentChange);
		mutationObserver?.observe(ref, { childList: true });

		let resizeFrame = 0;
		const resizeObserver =
			typeof ResizeObserver === "undefined"
				? null
				: new ResizeObserver(() => {
						cancelAnimationFrame(resizeFrame);
						resizeFrame = requestAnimationFrame(controller.handleResize);
					});
		resizeObserver?.observe(ref);

		return () => {
			cancelAnimationFrame(resizeFrame);
			mutationObserver?.disconnect();
			resizeObserver?.disconnect();
			controller.setContentElement(null);
		};
	});

	$effect(() => {
		controller.setSpacerElement(spacerRef);
		return () => controller.setSpacerElement(null);
	});
</script>

<div
	bind:this={ref}
	data-slot="message-scroller-content"
	{role}
	aria-relevant={ariaRelevant}
	class={cn("cn-message-scroller-content flex h-max min-h-full flex-col", className)}
	{...restProps}
>
	{@render children?.()}
	<div
		bind:this={spacerRef}
		aria-hidden="true"
		data-message-scroller-spacer=""
		hidden
		class={cn("shrink-0", spacerClassName)}
	></div>
</div>
