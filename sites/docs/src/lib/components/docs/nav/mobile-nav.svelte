<script lang="ts">
	import * as Icon from "../icons/index.js";
	import MobileLink from "./mobile-link.svelte";
	import * as Sheet from "$lib/registry/new-york/ui/sheet/index.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import { ScrollArea } from "$lib/registry/new-york/ui/scroll-area/index.js";
	import { docsConfig } from "$lib/config/docs.js";
	import { siteConfig } from "$lib/config/site.js";
	import { cn } from "$lib/utils.js";

	let open = $state(false);
</script>

<Sheet.Root bind:open>
	<Sheet.Trigger
		class={cn(
			buttonVariants({
				variant: "ghost",
				class: "mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden",
			})
		)}
	>
		<svg
			stroke-width="1.5"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			class="size-5"
		>
			<path
				d="M3 5H11"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path>
			<path
				d="M3 12H16"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path>
			<path
				d="M3 19H21"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			></path>
		</svg>
		<span class="sr-only">Toggle Menu</span>
	</Sheet.Trigger>
	<Sheet.Content side="left" class="pr-0">
		<MobileLink href="/" class="flex items-center" bind:open>
			<Icon.Logo class="mr-2 size-4" />
			<span class="font-bold">{siteConfig.name}</span>
		</MobileLink>
		<ScrollArea orientation="both" class="h-[calc(100vh-4.5rem)] pb-16 pl-6 pt-4">
			<div class="flex flex-col space-y-3">
				{#each docsConfig.mainNav as navItem, index (navItem + index.toString())}
					{#if navItem.href}
						<MobileLink href={navItem.href} bind:open class="text-foreground">
							{navItem.title}
						</MobileLink>
					{/if}
				{/each}
			</div>
			<div class="flex flex-col space-y-2">
				{#each docsConfig.sidebarNav as navItem, index (index)}
					<div class="flex flex-col space-y-3 pt-6">
						<h4 class="font-medium">{navItem.title}</h4>
						{#if navItem?.items?.length}
							{#each navItem.items as item (item.href)}
								{#if !item.disabled && item.href}
									<MobileLink href={item.href} bind:open>
										{item.title}
										{#if item.label}
											<span
												class="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline"
											>
												{item.label}
											</span>
										{/if}
									</MobileLink>
								{/if}
							{/each}
						{/if}
					</div>
				{/each}
			</div>
		</ScrollArea>
	</Sheet.Content>
</Sheet.Root>
