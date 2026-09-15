<script lang="ts">
	import { attachRef, boxWith, mergeProps } from "svelte-toolbelt";
	import type { MessageScrollerContentProps } from "../types.js";
	import { MessageScrollerProviderState } from "../message-scroller.svelte.js";

	let {
		children,
		child,
		ref = $bindable(null),
		"aria-relevant": ariaRelevant,
		role,
		spacerClassName,
		...restProps
	}: MessageScrollerContentProps = $props();

	const root = MessageScrollerProviderState.get();
	let contentElement = $state<HTMLDivElement | null>(null);

	const attachment = attachRef(
		boxWith(
			() => ref,
			(v) => (ref = v)
		),
		(node) => {
			contentElement = node as HTMLDivElement | null;
			root.setContentElement(contentElement);
		}
	);

	const spacerAttachment = attachRef((node) => {
		root.setSpacerElement(node as HTMLDivElement | null);
	});

	function ensureSpacer(content: HTMLDivElement) {
		let spacer = content.querySelector<HTMLDivElement>("[data-message-scroller-spacer]");

		if (!spacer) {
			spacer = document.createElement("div");
			spacer.setAttribute("aria-hidden", "true");
			spacer.setAttribute("data-message-scroller-spacer", "");
			spacer.hidden = true;
			content.appendChild(spacer);
		}

		if (spacerClassName) {
			spacer.className = spacerClassName;
		}

		root.setSpacerElement(spacer);
	}

	$effect(() => {
		const content = contentElement;

		if (!content) {
			return;
		}

		if (child) {
			ensureSpacer(content);
		}

		root.handleContentChange();

		if (typeof MutationObserver === "undefined") {
			return;
		}

		const observer = new MutationObserver(() => {
			root.handleContentChange();
		});

		observer.observe(content, { childList: true });

		return () => observer.disconnect();
	});

	$effect(() => {
		const content = contentElement;

		if (!content || typeof ResizeObserver === "undefined") {
			return;
		}

		// Coalesce into rAF: handleResize mutates the spacer inside this observed
		// element, and resizing an observed element during delivery fires
		// "ResizeObserver loop completed with undelivered notifications".
		let frame = 0;

		const observer = new ResizeObserver(() => {
			window.cancelAnimationFrame(frame);
			frame = window.requestAnimationFrame(root.handleResize);
		});

		observer.observe(content);

		return () => {
			window.cancelAnimationFrame(frame);
			observer.disconnect();
		};
	});

	const mergedProps = $derived(
		mergeProps(restProps, {
			role: role ?? "log",
			"aria-relevant": ariaRelevant ?? "additions",
			...attachment,
		})
	);
</script>

{#if child}
	{@render child({ props: mergedProps })}
{:else}
	<div {...mergedProps}>
		{@render children?.()}
		<div
			aria-hidden="true"
			data-message-scroller-spacer=""
			hidden
			class={spacerClassName}
			{...spacerAttachment}
		></div>
	</div>
{/if}
