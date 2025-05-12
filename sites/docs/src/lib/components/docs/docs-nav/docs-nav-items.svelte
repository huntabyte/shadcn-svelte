<script lang="ts">
	import type { SidebarNavItem } from "$lib/types/nav.js";
	import { cn } from "$lib/utils.js";
	import { page } from "$app/state";

	let { items }: { items: SidebarNavItem[] } = $props();
</script>

{#if items.length}
	<div class="grid grid-flow-row auto-rows-max gap-0.5 text-sm">
		{#each items as item, index (index)}
			{#if item.href && !item.disabled}
				<a
					href={item.href}
					class={cn(
						"hover:bg-accent hover:text-accent-foreground group relative flex h-8 w-full items-center rounded-lg px-2 after:absolute  after:inset-x-0 after:inset-y-[-2px] after:rounded-lg ",
						item.disabled && "cursor-not-allowed opacity-60",
						page.url.pathname === item.href
							? "bg-accent text-accent-foreground font-medium"
							: "text-foreground font-normal"
					)}
					target={item.external ? "_blank" : ""}
					rel={item.external ? "noreferrer" : ""}
				>
					{item.title}
					{#if item.label}
						<span
							class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline"
						>
							{item.label}
						</span>
					{/if}
				</a>
			{:else}
				<span
					class={cn(
						"text-muted-foreground flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline",
						item.disabled && "cursor-not-allowed opacity-60"
					)}
				>
					{item.title}
					{#if item.label}
						<span
							class="bg-muted text-muted-foreground ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none no-underline group-hover:no-underline"
						>
							{item.label}
						</span>
					{/if}
				</span>
			{/if}
		{/each}
	</div>
{/if}
