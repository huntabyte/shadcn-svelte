<script lang="ts">
	import ChartPieIcon from "@lucide/svelte/icons/chart-pie";
	import FrameIcon from "@lucide/svelte/icons/frame";
	import LifeBuoyIcon from "@lucide/svelte/icons/life-buoy";
	import MapIcon from "@lucide/svelte/icons/map";
	import PanelLeftCloseIcon from "@lucide/svelte/icons/panel-left-close";
	import PanelLeftOpenIcon from "@lucide/svelte/icons/panel-left-open";
	import SendIcon from "@lucide/svelte/icons/send";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const projects = [
		{
			name: "Design Engineering",
			url: "#",
			icon: FrameIcon,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: ChartPieIcon,
		},
		{
			name: "Travel",
			url: "#",
			icon: MapIcon,
		},
		{
			name: "Support",
			url: "#",
			icon: LifeBuoyIcon,
		},
		{
			name: "Feedback",
			url: "#",
			icon: SendIcon,
		},
	];

	let open = $state(true);
</script>

<Sidebar.Provider bind:open={() => open, (v) => (open = v)}>
	<Sidebar.Root>
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
				<Sidebar.GroupContent>
					<Sidebar.Menu>
						{#each projects as project (project.name)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton>
									{#snippet child({ props })}
										<a href={project.url} {...props}>
											<project.icon />
											<span>{project.name}</span>
										</a>
									{/snippet}
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
	</Sidebar.Root>
	<Sidebar.Inset>
		<header class="flex h-12 items-center justify-between px-4">
			<Button onclick={() => (open = !open)} size="sm" variant="ghost">
				{#if open}
					<PanelLeftCloseIcon />
				{:else}
					<PanelLeftOpenIcon />
				{/if}
				<span>{open ? "Close" : "Open"} Sidebar</span>
			</Button>
		</header>
	</Sidebar.Inset>
</Sidebar.Provider>
