<script lang="ts">
	import { setSidebarContext } from "./context.svelte.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { WithElementRef } from "bits-ui";
	import {
		SIDEBAR_COOKIE_MAX_AGE,
		SIDEBAR_COOKIE_NAME,
		SIDEBAR_WIDTH,
		SIDEBAR_WIDTH_ICON,
	} from "./constants.js";
	import * as Tooltip from "$lib/registry/default/ui/tooltip/index.js";
	import { cn } from "$lib/utils.js";

	let {
		ref = $bindable(null),
		open = $bindable(true),
		onOpenChange = () => {},
		controlledOpen = false,
		class: className,
		style,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		controlledOpen?: boolean;
	} = $props();

	const sidebar = setSidebarContext({
		open: () => open,
		setOpen: (value: boolean) => {
			if (controlledOpen) {
				onOpenChange(value);
			} else {
				open = value;
				onOpenChange(value);
			}

			// This sets the cookie to keep the sidebar state.
			document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
		},
	});
</script>

<svelte:window onkeydown={sidebar.handleShortcutKeydown} />

<Tooltip.Provider delayDuration={0}>
	<div
		style="--sidebar-width: {SIDEBAR_WIDTH}; --sidebar-width-icon: {SIDEBAR_WIDTH_ICON}; {style}"
		class={cn(
			"group/sidebar-wrapper text-sidebar-foreground has-[[data-variant=inset]]:bg-sidebar flex min-h-svh w-full",
			className
		)}
		bind:this={ref}
		{...restProps}
	>
		{@render children?.()}
	</div>
</Tooltip.Provider>
