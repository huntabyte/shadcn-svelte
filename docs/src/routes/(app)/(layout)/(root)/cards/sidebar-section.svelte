<script lang="ts">
	import { Card } from "$lib/registry/ui/card/index.js";
	import {
		Sidebar,
		SidebarContent,
		SidebarGroup,
		SidebarGroupContent,
		SidebarGroupLabel,
		SidebarMenu,
		SidebarProvider,
	} from "$lib/registry/ui/sidebar/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	let {
		label,
		class: className,
		children,
	}: { label: string; class?: string; children?: Snippet } = $props();
</script>

<Card class={cn("w-full overflow-hidden rounded-3xl py-0", className)}>
	<SidebarProvider class="min-h-0">
		<Sidebar collapsible="none" class="w-full bg-transparent">
			<SidebarContent class="gap-0 overflow-hidden">
				<SidebarGroup>
					<SidebarGroupLabel>{label}</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu class="gap-1">{@render children?.()}</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	</SidebarProvider>
</Card>
