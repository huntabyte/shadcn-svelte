<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
	import { setContext } from "svelte";
	import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
	import { usePreviewOverride } from "../preview-override-context.svelte.js";
	import type { Snippet } from "svelte";

	let {
		ref = $bindable(null),
		sideOffset = 20,
		portalProps,
		class: className,
		submenu = false,
		children,
		...restProps
	}: DropdownMenuPrimitive.ContentProps & {
		portalProps?: WithoutChildrenOrChild<DropdownMenuPrimitive.PortalProps>;
		submenu?: boolean;
		children?: Snippet;
	} = $props();

	// Submenu items are theme-aware; standalone (non-submenu) items always use dark hardcoded colors.
	setContext("picker-is-submenu", () => submenu);
	const previewOverride = usePreviewOverride();

	// On mobile, floating-ui positions via `transform: translate(X, Y)` with left/top both at 0.
	// We intercept style mutations to neutralize the X offset and center the dropdown instead.
	function mobileCenterDropdown(node: HTMLElement) {
		if (typeof window === "undefined") return {};
		if (window.matchMedia("(min-width: 768px)").matches) return {};

		function applyFix() {
			const t = node.style.transform;
			// Match floating-ui's translate(X, Y) but not our translateY(Y) to avoid looping
			const m = t?.match(/^translate\(([^,]+),\s*([^)]+)\)$/);
			if (!m) return;
			const y = parseFloat(m[2]) - 6; // shift down a few px from natural position
			node.style.left = "1rem";
			node.style.width = "calc(100dvw - 2rem)";
			node.style.transform = `translateY(${y}px)`;
		}

		applyFix();
		const observer = new MutationObserver(applyFix);
		observer.observe(node, { attributes: true, attributeFilter: ["style"] });

		return { destroy: () => observer.disconnect() };
	}
</script>

{#if submenu}
	<DropdownMenuPrimitive.Portal>
		<DropdownMenuPrimitive.SubContent
			bind:ref
			data-slot="dropdown-menu-sub-content"
			{sideOffset}
			preventScroll={false}
			updatePositionStrategy="always"
			onmouseleave={previewOverride.clearOverride}
			onpointerleave={previewOverride.clearOverride}
			class={cn(
				"z-50 w-52 overflow-x-hidden rounded-md bg-popover/90 p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 backdrop-blur-xs",
				className
			)}
			{...restProps}
		>
			{@render children?.()}
		</DropdownMenuPrimitive.SubContent>
	</DropdownMenuPrimitive.Portal>
{:else}
	<DropdownMenuPrimitive.Portal {...portalProps}>
		<DropdownMenuPrimitive.Content
			bind:ref
			data-slot="dropdown-menu-content"
			{sideOffset}
			preventScroll={false}
			updatePositionStrategy="always"
			onmouseleave={previewOverride.clearOverride}
			onpointerleave={previewOverride.clearOverride}
			{...restProps}
		>
			{#snippet child({ props, wrapperProps })}
				<div
					use:mobileCenterDropdown
					onmouseleave={previewOverride.clearOverride}
					onpointerleave={previewOverride.clearOverride}
					{...wrapperProps}
				>
					<div
						{...props}
						class={cn(
							"cn-menu-target z-50 no-scrollbar max-h-(--bits-dropdown-menu-content-available-height) origin-(--bits-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-xl border-0 bg-neutral-950/80 p-1.5 text-neutral-100 ring-1 ring-neutral-950/80 backdrop-blur-xl outline-none md:w-52 md:min-w-32 md:translate-y-2 dark:bg-neutral-800/90 dark:ring-neutral-700/50 data-closed:overflow-hidden",
							className
						)}
					>
						{@render children?.()}
					</div>
				</div>
			{/snippet}
		</DropdownMenuPrimitive.Content>
	</DropdownMenuPrimitive.Portal>
{/if}
