<script lang="ts">
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	// The sub navigation of a settings area. Ported from the shadcn-svelte settings dialog block (sidebar-13): a
	// Sidebar.Provider with a non collapsible Sidebar.Root. The nested provider has its Cmd/Ctrl+B shortcut and its
	// cookie turned off, so it never fights the app sidebar that wraps the page.
	let {
		ref = $bindable(null),
		class: className,
		width = "13.75rem",
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		/** Width of the nav, any CSS length. Twenty uses 220px. */
		width?: string;
	} = $props();
</script>

<Sidebar.Provider
	class="min-h-0 w-auto items-stretch"
	style="--sidebar-width: {width};"
	keyboardShortcut={false}
	persist={false}
>
	<Sidebar.Root
		bind:ref
		collapsible="none"
		data-slot="settings-nav"
		class={cn("hidden border-r md:flex", className)}
		{...restProps}
	>
		<Sidebar.Content>
			{@render children?.()}
		</Sidebar.Content>
	</Sidebar.Root>
</Sidebar.Provider>
