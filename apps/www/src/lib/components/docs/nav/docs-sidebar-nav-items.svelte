<script lang="ts">
	import type { SidebarNavItem } from "$lib/types/nav.js";
	import { page } from "$app/stores";
	import { cn } from "$lib/utils.js";

	export let items: SidebarNavItem[] = [];
</script>

{#if items.length}
	<div class="grid grid-flow-row auto-rows-max text-sm">
		{#each items as item, index (index)}
			{#if item.href}
				<a
					href={item.href}
					class={cn(
						"group w-full rounded-md border border-transparent px-2 py-1",
						item.disabled && "cursor-not-allowed opacity-60",
						$page.url.pathname === item.href
							? "font-medium text-foreground"
							: "text-muted-foreground"
					)}
					target={item.external ? "_blank" : ""}
					rel={item.external ? "noreferrer" : ""}
				>
					<span class="group-hover:underline">{item.title}</span>
					{#if item.label}
						<span
							class="ml-1 inline-block rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000]"
						>
							{item.label}
						</span>
					{/if}
				</a>
			{:else}
				<span
					class="flex w-full cursor-not-allowed items-center rounded-md p-2 text-muted-foreground hover:underline"
				>
					{item.title}
				</span>
			{/if}
		{/each}
	</div>
{/if}
