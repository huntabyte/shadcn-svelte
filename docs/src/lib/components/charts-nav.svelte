<script lang="ts">
	import { page } from "$app/state";
	import { cn } from "$lib/utils.js";
	import { ScrollArea } from "$lib/registry/ui/scroll-area/index.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();

	const links = [
		{
			name: "Area Charts",
			href: "/charts/area#charts",
		},
		{
			name: "Bar Charts",
			href: "/charts/bar#charts",
		},
		{
			name: "Line Charts",
			href: "/charts/line#charts",
		},
		{
			name: "Pie Charts",
			href: "/charts/pie#charts",
		},
		{
			name: "Radar Charts",
			href: "/charts/radar#charts",
		},
		{
			name: "Radial Charts",
			href: "/charts/radial#charts",
		},
		{
			name: "Tooltips",
			href: "/charts/tooltip#charts",
		},
	];
</script>

<div class="relative overflow-hidden">
	<ScrollArea
		class="max-w-[600px] lg:max-w-none"
		orientation="both"
		scrollbarXClasses="invisible"
	>
		<div class={cn("flex items-center", className)} {...restProps}>
			{#each links as link (link.href)}
				<a
					href={link.href}
					data-active={link.href.startsWith(page.url.pathname)}
					class={cn(
						"text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 shrink-0 items-center justify-center px-4 text-center text-base font-medium transition-colors"
					)}
				>
					{link.name}
				</a>
			{/each}
		</div>
	</ScrollArea>
</div>
