<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import { page } from "$app/stores";
	import { ScrollArea, Scrollbar } from "$lib/registry/ui/scroll-area/index.js";
	import { cn } from "$lib/utils.js";

	let { class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();

	const links = [
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

<ScrollArea class="max-w-[600px] lg:max-w-none">
	<div class={cn("flex items-center", className)} {...restProps}>
		{#each links as example, index (index)}
			<a
				href={example.href}
				class={cn(
					"hover:text-primary flex h-7 shrink-0 items-center justify-center rounded-full px-4 text-center text-sm transition-colors",
					$page.url.pathname.startsWith(example.href) ||
						(index === 0 && $page.url.pathname === "/")
						? "bg-muted text-primary font-medium"
						: "text-muted-foreground"
				)}
			>
				{example.name}
			</a>
		{/each}
	</div>
	<Scrollbar orientation="horizontal" class="invisible" />
</ScrollArea>
