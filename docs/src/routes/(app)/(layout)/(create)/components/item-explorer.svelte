<script lang="ts">
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import { cn } from "cn";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { groupItemsByType } from "../lib/utils.js";
	import type { RegistryItem } from "shadcn-svelte/schema";

	type Props = {
		items: Pick<RegistryItem, "name" | "title" | "type">[];
	};
	let { items }: Props = $props();

	const groupedItems = $derived(groupItemsByType(items));
</script>

<Sidebar.Root
	class="sticky z-30 hidden h-[calc(100svh-var(--header-height)-2rem)] overscroll-none bg-transparent xl:flex"
	collapsible="none"
>
	<Sidebar.Content class="-mx-1 no-scrollbar overflow-x-hidden">
		{#each groupedItems as group (group.title)}
			<Collapsible.Root open class="group/collapsible">
				<Sidebar.Group class="px-1 py-0">
					<Collapsible.Trigger
						class="flex w-full items-center gap-1 py-1.5 text-[0.8rem] font-medium [&[data-state=open]>svg]:rotate-90"
					>
						<ChevronRightIcon class="size-3.5 text-muted-foreground transition-transform" />
						<span>{group.title}</span>
					</Collapsible.Trigger>
					<Collapsible.Content>
						<Sidebar.GroupContent>
							<Sidebar.Menu class="relative ml-1.5 border-l border-border/50 pl-2">
								{#each group.items as item, index (item.name)}
									<Sidebar.MenuItem class="relative">
										<div
											class={cn(
												"absolute top-1/2 -left-2 h-px w-2 border-t border-border/50",
												index === group.items.length - 1 && "bg-sidebar"
											)}
										></div>
										{#if index === group.items.length - 1}
											<div class="absolute top-1/2 -bottom-1 -left-2.5 w-1 bg-sidebar"></div>
										{/if}
										<Sidebar.MenuButton
											onclick={() => goto(`/create/${item.name}${page.url.search}`)}
											class="relative h-[26px] w-fit cursor-pointer overflow-visible border border-transparent text-[0.8rem] font-normal after:absolute after:inset-x-0 after:-inset-y-1 after:z-0 after:rounded-md data-[active=true]:border-accent data-[active=true]:bg-accent 3xl:fixed:w-full 3xl:fixed:max-w-48"
											data-active={item.name === page.params.item}
											isActive={item.name === page.params.item}
										>
											{item.title}
											<span class="absolute inset-0 flex w-(--sidebar-width) bg-transparent"></span>
										</Sidebar.MenuButton>
										<a
											href={`/preview/${item.name}`}
											data-sveltekit-preload-data="hover"
											class="sr-only"
											tabindex={-1}
										>
											{item.title}
										</a>
									</Sidebar.MenuItem>
								{/each}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Collapsible.Content>
				</Sidebar.Group>
			</Collapsible.Root>
		{/each}
	</Sidebar.Content>
</Sidebar.Root>
