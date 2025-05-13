<script lang="ts">
	import * as Sidebar from "$lib/registry/new-york/ui/sidebar/index.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";
	import Ellipsis from "@lucide/svelte/icons/ellipsis";
	import LifeBuoy from "@lucide/svelte/icons/life-buoy";
	import Send from "@lucide/svelte/icons/send";
	import Frame from "@lucide/svelte/icons/frame";
	import ChartPie from "@lucide/svelte/icons/chart-pie";
	import Map from "@lucide/svelte/icons/map";

	const projects = [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: ChartPie,
		},
		{
			name: "Travel",
			url: "#",
			icon: Map,
		},
		{
			name: "Support",
			url: "#",
			icon: LifeBuoy,
		},
		{
			name: "Feedback",
			url: "#",
			icon: Send,
		},
	];
</script>

<Sidebar.Provider>
	<Sidebar.Root>
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each projects as project (project.name)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton
									class="group-has-[[data-state=open]]/menu-item:bg-sidebar-accent"
								>
									{#snippet child({ props })}
										<a href={project.url} {...props}>
											<project.icon />
											<span>{project.name}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
								<DropdownMenu.Root>
									<DropdownMenu.Trigger>
										{#snippet child({ props })}
											<Sidebar.MenuAction {...props}>
												<Ellipsis />
												<span class="sr-only">More</span>
											</Sidebar.MenuAction>
										{/snippet}
									</DropdownMenu.Trigger>
									<DropdownMenu.Content side="right" align="start">
										<DropdownMenu.Item>
											<span>Edit Project</span>
										</DropdownMenu.Item>
										<DropdownMenu.Item>
											<span>Delete Project</span>
										</DropdownMenu.Item>
									</DropdownMenu.Content>
								</DropdownMenu.Root>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
	</Sidebar.Root>
</Sidebar.Provider>
