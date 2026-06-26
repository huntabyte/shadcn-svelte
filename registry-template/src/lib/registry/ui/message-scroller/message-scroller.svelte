<script lang="ts">
	import { tick } from "svelte";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	type MessageScrollerProps = HTMLAttributes<HTMLDivElement> & {
		ref?: HTMLDivElement | null;
		follow?: boolean;
	};

	let {
		ref = $bindable(null),
		class: className,
		follow = true,
		children,
		...restProps
	}: MessageScrollerProps = $props();

	export function scrollToBottom(behavior: ScrollBehavior = "smooth") {
		ref?.scrollTo({ top: ref.scrollHeight, behavior });
	}

	$effect(() => {
		if (!ref || !follow) return;
		const node = ref;

		const observer = new MutationObserver(() => {
			const distanceFromBottom = node.scrollHeight - node.scrollTop - node.clientHeight;
			if (distanceFromBottom < 96) {
				tick().then(() => scrollToBottom("instant"));
			}
		});

		observer.observe(node, { childList: true, subtree: true, characterData: true });
		return () => observer.disconnect();
	});
</script>

<div
	data-slot="message-scroller"
	class={cn(
		"flex h-full min-h-0 flex-col gap-2 overflow-y-auto overscroll-contain scroll-smooth",
		className
	)}
	bind:this={ref}
	{...restProps}
>
	{@render children?.()}
</div>
