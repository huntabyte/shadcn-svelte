<script lang="ts">
	import { ScrollArea } from "$lib/registry/ui/scroll-area/index.js";
	import { page } from "$app/state";
	import { cn } from "$lib/utils.js";
	import { getColors } from "$lib/colors.js";
	import type { HTMLAttributes } from "svelte/elements";

	const colors = getColors();

	let { class: className, ...restProps }: HTMLAttributes<HTMLElement> = $props();
</script>

<div class={cn("flex items-center", className)} {...restProps}>
	<ScrollArea class="max-w-full" orientation="both" scrollbarXClasses="invisible">
		<div class="flex items-center">
			{#each colors as colorPalette, index (colorPalette.name)}
				<a
					href="/colors#{colorPalette.name}"
					data-active={page.url.pathname?.startsWith(colorPalette.name) ||
						(index === 0 && page.url.pathname === "/colors")}
					class={cn(
						"text-muted-foreground hover:text-primary data-[active=true]:text-primary flex h-7 items-center justify-center px-4 text-center text-base font-medium capitalize transition-colors"
					)}
				>
					{colorPalette.name}
				</a>
			{/each}
		</div>
	</ScrollArea>
</div>
