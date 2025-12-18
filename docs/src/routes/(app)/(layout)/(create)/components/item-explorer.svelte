<script lang="ts">
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import type { RegistryItem } from "@shadcn-svelte/registry";
	import { groupItemsByType } from "../lib/utils.js";
	import { cn } from "$lib/utils.js";
	import { goto } from "$app/navigation";
	import { page } from "$app/state";

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
	<Sidebar.Content class="no-scrollbar -mx-1 overflow-x-hidden">
		{#each groupedItems as group (group.title)}
			<Collapsible.Root open class="group/collapsible">
				<Sidebar.Group class="px-1 py-0">
					<Collapsible.Trigger
						class="flex w-full items-center gap-1 py-1.5 text-[0.8rem] font-medium [&[data-state=open]>svg]:rotate-90"
					>
						<ChevronRightIcon
							class="text-muted-foreground size-3.5 transition-transform"
						/>
						<span>{group.title}</span>
					</Collapsible.Trigger>
					<Collapsible.Content>
						<Sidebar.GroupContent>
							<Sidebar.Menu class="border-border/50 relative ml-1.5 border-l pl-2">
								{#each group.items as item, index (item.name)}
									<Sidebar.MenuItem class="relative">
										<div
											class={cn(
												"border-border/50 absolute -left-2 top-1/2 h-px w-2 border-t",
												index === group.items.length - 1 && "bg-sidebar"
											)}
										></div>
										{#if index === group.items.length - 1}
											<div
												class="bg-sidebar absolute -bottom-1 -left-2.5 top-1/2 w-1"
											></div>
										{/if}
										<Sidebar.MenuButton
											onclick={() => goto(`/create/${item.name}${page.url.search}`)}
											class="data-[active=true]:bg-accent data-[active=true]:border-accent 3xl:fixed:w-full 3xl:fixed:max-w-48 relative h-[26px] w-fit cursor-pointer overflow-visible border border-transparent text-[0.8rem] font-normal after:absolute after:-inset-y-1 after:inset-x-0 after:z-0 after:rounded-md"
											data-active={item.name === page.params.item}
											isActive={item.name === page.params.item}
										>
											{item.title}
											<span
												class="w-(--sidebar-width) absolute inset-0 flex bg-transparent"
											></span>
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
