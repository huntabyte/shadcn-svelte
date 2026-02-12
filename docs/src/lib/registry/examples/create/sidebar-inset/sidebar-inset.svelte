<script lang="ts">
	/* eslint-disable @typescript-eslint/no-explicit-any */
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const data = {
		navMain: [
			{
				title: "Dashboard",
				url: "#",
				lucide: "HomeIcon",
				tabler: "IconHome",
				hugeicons: "Home01Icon",
				phosphor: "HouseIcon",
				remixicon: "RiHomeLine",
				isActive: true,
				items: [
					{
						title: "Overview",
						url: "#",
					},
					{
						title: "Analytics",
						url: "#",
					},
				],
			},
			{
				title: "Analytics",
				url: "#",
				lucide: "ChartLineIcon",
				tabler: "IconChartLine",
				hugeicons: "ChartIcon",
				phosphor: "ChartLineIcon",
				remixicon: "RiLineChartLine",
				items: [
					{
						title: "Reports",
						url: "#",
					},
					{
						title: "Metrics",
						url: "#",
					},
				],
			},
			{
				title: "Orders",
				url: "#",
				lucide: "ShoppingBagIcon",
				tabler: "IconShoppingBag",
				hugeicons: "ShoppingBag01Icon",
				phosphor: "BagIcon",
				remixicon: "RiShoppingBagLine",
				items: [
					{
						title: "All Orders",
						url: "#",
					},
					{
						title: "Pending",
						url: "#",
					},
					{
						title: "Completed",
						url: "#",
					},
				],
			},
			{
				title: "Products",
				url: "#",
				lucide: "ShoppingCartIcon",
				tabler: "IconShoppingCart",
				hugeicons: "ShoppingCart01Icon",
				phosphor: "ShoppingCartIcon",
				remixicon: "RiShoppingCartLine",
				items: [
					{
						title: "All Products",
						url: "#",
					},
					{
						title: "Categories",
						url: "#",
					},
				],
			},
			{
				title: "Invoices",
				url: "#",
				lucide: "FileIcon",
				tabler: "IconFile",
				hugeicons: "File01Icon",
				phosphor: "FileIcon",
				remixicon: "RiFileLine",
			},
			{
				title: "Customers",
				url: "#",
				lucide: "UserIcon",
				tabler: "IconUser",
				hugeicons: "UserIcon",
				phosphor: "UserIcon",
				remixicon: "RiUserLine",
			},
			{
				title: "Settings",
				url: "#",
				lucide: "Settings2Icon",
				tabler: "IconSettings",
				hugeicons: "Settings05Icon",
				phosphor: "GearIcon",
				remixicon: "RiSettingsLine",
			},
		],
		navSecondary: [
			{
				title: "Support",
				url: "#",
				lucide: "LifeBuoy",
				tabler: "IconLifebuoy",
				hugeicons: "ChartRingIcon",
				phosphor: "LifebuoyIcon",
				remixicon: "RiLifebuoyLine",
			},
			{
				title: "Feedback",
				url: "#",
				lucide: "Send",
				tabler: "IconSend",
				hugeicons: "SentIcon",
				phosphor: "PaperPlaneTiltIcon",
				remixicon: "RiSendPlaneLine",
			},
		],
	};
</script>

<Sidebar.Provider>
	<Sidebar.Root variant="inset" class="absolute">
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>Dashboard</Sidebar.GroupLabel>
				<Sidebar.Menu>
					{#each data.navMain as item (item.title)}
						<Collapsible.Root open={item.isActive}>
							{#snippet child({ props })}
								<Sidebar.MenuItem {...props}>
									<Sidebar.MenuButton isActive={item.isActive}>
										{#snippet child({ props })}
											<a href={item.url} {...props}>
												<IconPlaceholder
													lucide={item.lucide as any}
													tabler={item.tabler as any}
													hugeicons={item.hugeicons as any}
													phosphor={item.phosphor as any}
													remixicon={item.remixicon as any}
												/>
												<span>{item.title}</span>
											</a>
										{/snippet}
									</Sidebar.MenuButton>
									{#if item.items?.length}
										<Collapsible.Trigger>
											{#snippet child({ props })}
												<Sidebar.MenuAction
													class="data-[state=open]:rotate-90"
													{...props}
												>
													<IconPlaceholder
														lucide="ChevronRightIcon"
														tabler="IconChevronRight"
														hugeicons="ArrowRight01Icon"
														phosphor="CaretRightIcon"
														remixicon="RiArrowRightSLine"
													/>
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
																<a href={subItem.url} {...props}
																	>{subItem.title}</a
																>
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
			<Sidebar.Group class="mt-auto">
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each data.navSecondary as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton size="sm">
									{#snippet child({ props })}
										<a href={item.url} {...props}>
											<IconPlaceholder
												lucide={item.lucide as any}
												tabler={item.tabler as any}
												hugeicons={item.hugeicons as any}
												phosphor={item.phosphor as any}
												remixicon={item.remixicon as any}
											/>
											<span>{item.title}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
		<Sidebar.Rail />
	</Sidebar.Root>
	<Sidebar.Inset>
		<header class="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<Sidebar.Trigger class="-ml-1" />
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4">
			<div class="grid auto-rows-min gap-4 md:grid-cols-3">
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
				<div class="bg-muted/50 aspect-video rounded-xl"></div>
			</div>
			<div class="bg-muted/50 min-h-screen flex-1 rounded-xl md:min-h-min"></div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
