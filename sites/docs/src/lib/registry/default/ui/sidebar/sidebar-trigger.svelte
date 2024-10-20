<script lang="ts">
	import type { ComponentProps } from "svelte";
	import { Button } from "$lib/registry/default/ui/button/index.js";
	import { getSidebarContext } from "./context.svelte.js";
	import { cn } from "$lib/utils.js";
	import PanelLeft from "lucide-svelte/icons/panel-left";

	let {
		ref = $bindable(null),
		class: className,
		onclick,
		...restProps
	}: ComponentProps<typeof Button> & {
		onclick: (e: MouseEvent) => void;
	} = $props();

	const sidebar = getSidebarContext();
</script>

<Button
	type="button"
	onclick={(e) => {
		onclick?.(e);
		sidebar.toggleSidebar();
	}}
	data-sidebar="trigger"
	variant="ghost"
	size="icon"
	class={cn("size-7", className)}
	{...restProps}
>
	<PanelLeft />
	<span class="sr-only">Toggle Sidebar</span>
</Button>
