<script lang="ts">
	import { SidebarOpen } from "lucide-svelte";
	import { Button } from "$components/ui/button";
	import { Sheet, SheetContent, SheetTrigger } from "$components/ui/sheet";
	import { docsConfig } from "$lib/config/docs";
	import { siteConfig } from "$lib/config/site";
	import { Icons } from "../icons";
	import MobileLink from "./MobileLink.svelte";

	export let open = false;
</script>

<Sheet bind:open>
	<SheetTrigger>
		<Button
			variant="ghost"
			class="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
		>
			<SidebarOpen class="h-6 w-6" />
			<span class="sr-only">Toggle Menu</span>
		</Button>
	</SheetTrigger>
	<SheetContent size="xl" position="left" class="pr-0">
		<MobileLink
			href="/"
			class="flex items-center !text-foreground"
			bind:open
		>
			<Icons.logo class="mr-2 h-4 w-4" />
			<span class="font-bold">{siteConfig.name}</span>
		</MobileLink>
		<div class="my-4 h-[calc(100vh-8rem)] pb-10 pl-6 overflow-auto">
			<div class="flex flex-col space-y-3">
				{#each docsConfig.mainNav as navItem, index (navItem + index.toString())}
					{#if navItem.href}
						<MobileLink href={navItem.href} bind:open>
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
							{#each navItem.items as item}
								{#if !item.disabled && item.href}
									<MobileLink href={item.href} bind:open>
										{item.title}
									</MobileLink>
								{/if}
							{/each}
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</SheetContent>
</Sheet>
