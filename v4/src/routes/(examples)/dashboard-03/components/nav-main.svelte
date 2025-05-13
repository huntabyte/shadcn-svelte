<script lang="ts">
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import { page } from "$app/state";
	import type { Component } from "svelte";

	let {
		items,
	}: {
		items: {
			title: string;
			url: string;
			icon: Component;
			isActive?: boolean;
			items?: {
				title: string;
				url: string;
			}[];
			disabled?: boolean;
		}[];
	} = $props();
</script>

<Sidebar.Group>
	<Sidebar.GroupLabel>Dashboard</Sidebar.GroupLabel>
	<Sidebar.Menu>
		{#each items as item (item.title)}
			<Collapsible.Root open={item.isActive}>
				{#snippet child({ props })}
					<Sidebar.MenuItem {...props}>
						<Sidebar.MenuButton
							isActive={page.url.pathname === item.url}
							disabled={item.disabled}
							class="data-[disabled=true]:opacity-60"
						>
							{#snippet tooltipContent()}
								{item.title}
							{/snippet}
							{#snippet child({ props })}
								<a
									href={item.disabled ? "#" : item.url}
									data-disabled={item.disabled}
									{...props}
								>
									<item.icon class="text-muted-foreground" />
									<span>{item.title}</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
						{#if item.items?.length}
							<Collapsible.Trigger>
								{#snippet child({ props })}
									<Sidebar.MenuAction
										{...props}
										class="data-[state=open]:rotate-90"
									>
										<ChevronRightIcon />
										<span class="sr-only">Toggle</span>
									</Sidebar.MenuAction>
								{/snippet}
							</Collapsible.Trigger>
							<Collapsible.Content>
								<Sidebar.MenuSub>
									{#each item.items as subItem (subItem.title)}
										<Sidebar.MenuSubItem>
											<Sidebar.MenuSubButton>
												{#snippet child({ props })}
													<a href={subItem.url} {...props}>
														<span>{subItem.title}</span>
													</a>
												{/snippet}
											</Sidebar.MenuSubButton>
										</Sidebar.MenuSubItem>
									{/each}
								</Sidebar.MenuSub>
							</Collapsible.Content>
						{/if}
					</Sidebar.MenuItem>
				{/snippet}
			</Collapsible.Root>
		{/each}
	</Sidebar.Menu>
</Sidebar.Group>
