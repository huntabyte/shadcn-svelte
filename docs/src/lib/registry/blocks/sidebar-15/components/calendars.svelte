<script lang="ts">
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import CheckIcon from "@lucide/svelte/icons/check";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";

	let { calendars }: { calendars: { name: string; items: string[] }[] } = $props();
</script>

{#each calendars as calendar, index (calendar.name)}
	<Sidebar.Group class="py-0">
		<Collapsible.Root open={index === 0} class="group/collapsible">
			<Sidebar.GroupLabel
				class="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-sm"
			>
				{#snippet child({ props })}
					<Collapsible.Trigger {...props}>
						{calendar.name}
						<ChevronRightIcon
							class="ms-auto transition-transform group-data-[state=open]/collapsible:rotate-90"
						/>
					</Collapsible.Trigger>
				{/snippet}
			</Sidebar.GroupLabel>
			<Collapsible.Content>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each calendar.items as item, index (item)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									<div
										data-active={index < 2}
										class="group/calendar-item border-sidebar-border text-sidebar-primary-foreground data-[active=true]:border-sidebar-primary data-[active=true]:bg-sidebar-primary flex aspect-square size-4 shrink-0 items-center justify-center rounded-xs border"
									>
										<CheckIcon
											class="hidden size-3 group-data-[active=true]/calendar-item:block"
										/>
									</div>
									{item}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Collapsible.Content>
		</Collapsible.Root>
	</Sidebar.Group>
	<Sidebar.Separator class="mx-0" />
{/each}
