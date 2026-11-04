<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import {
		SIDEBAR_COOKIE_MAX_AGE,
		SIDEBAR_COOKIE_NAME,
		SIDEBAR_WIDTH,
		SIDEBAR_WIDTH_ICON,
	} from "./constants.js";
	import { setSidebar } from "./context.svelte.js";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		ref = $bindable(null),
		open = $bindable(true),
		onOpenChange = () => {},
		keyboardShortcut = true,
		persist = true,
		class: className,
		style,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		open?: boolean;
		onOpenChange?: (open: boolean) => void;
		/** Toggle with Cmd/Ctrl+B. Turn off for a nested provider that must not react to the app sidebar's shortcut. */
		keyboardShortcut?: boolean;
		/** Save the open state in the sidebar_state cookie. Turn off for a nested provider. */
		persist?: boolean;
	} = $props();

	const sidebar = setSidebar({
		open: () => open,
		setOpen: (value: boolean) => {
			open = value;
			onOpenChange(value);

			// This sets the cookie to keep the sidebar state.
			if (persist) {
				document.cookie = `${SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
			}
		},
	});
</script>

<svelte:window onkeydown={keyboardShortcut ? sidebar.handleShortcutKeydown : undefined} />

<div
	data-slot="sidebar-wrapper"
	style="--sidebar-width: {SIDEBAR_WIDTH}; --sidebar-width-icon: {SIDEBAR_WIDTH_ICON}; {style}"
	class={cn(
		"group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
		className
	)}
	bind:this={ref}
	{...restProps}
>
	{@render children?.()}
</div>
