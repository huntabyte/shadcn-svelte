<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { ScrollArea } from "$lib/registry/ui/scroll-area/index.js";
	import { page } from "$app/state";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> = $props();

	const links = [
		{
			name: "All Charts",
			href: "/charts",
		},
		{
			name: "Area Chart",
			href: "/charts#area-chart",
		},
		{
			name: "Bar Chart",
			href: "/charts#bar-chart",
		},
		{
			name: "Line Chart",
			href: "/charts#line-chart",
		},
		{
			name: "Pie Chart",
			href: "/charts#pie-chart",
		},
		{
			name: "Radar Chart",
			href: "/charts#radar-chart",
		},
		{
			name: "Radial Chart",
			href: "/charts#radial-chart",
		},
		{
			name: "Tooltip",
			href: "/charts#tooltip",
		},
	];
</script>

<ScrollArea class="max-w-[600px] lg:max-w-none" orientation="both" scrollbarXClasses="invisible">
	<div class={cn("flex items-center", className)} {...restProps}>
		{#each links as example, index (index)}
			<a
				href={example.href}
				class={cn(
					"hover:text-primary flex h-7 shrink-0 items-center justify-center rounded-full px-4 text-center text-sm font-medium transition-colors",
					page.url.pathname?.startsWith(example.href) ||
						(index === 0 && page.url.pathname === "/charts")
						? "bg-muted text-primary"
						: "text-muted-foreground"
				)}
			>
				{example.name}
			</a>
		{/each}
	</div>
</ScrollArea>
