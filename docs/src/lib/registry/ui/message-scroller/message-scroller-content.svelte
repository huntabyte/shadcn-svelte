<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import { useMessageScrollerController } from "./message-scroller.svelte.js";
	import type { HTMLAttributes } from "svelte/elements";

	const controller = useMessageScrollerController();
	let spacerRef: HTMLDivElement | null = $state(null);
	let {
		ref = $bindable(null),
		class: className,
		spacerClassName,
		children,
		role = "log",
		"aria-relevant": ariaRelevant = "additions",
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		spacerClassName?: string;
	} = $props();

	$effect(() => {
		const content = ref;
		controller.setContent(content);
		controller.setSpacer(spacerRef);
		if (!content) return;

		controller.handleContentChange();
		const mutationObserver = new MutationObserver(() => controller.handleContentChange());
		mutationObserver.observe(content, { childList: true });

		let frame = 0;
		const resizeObserver = new ResizeObserver(() => {
			window.cancelAnimationFrame(frame);
			frame = window.requestAnimationFrame(() => controller.handleResize());
		});
		resizeObserver.observe(content);

		return () => {
			window.cancelAnimationFrame(frame);
			mutationObserver.disconnect();
			resizeObserver.disconnect();
			controller.setContent(null);
			controller.setSpacer(null);
		};
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
		class={spacerClassName}
	></div>
</div>
