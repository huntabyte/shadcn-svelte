<script lang="ts">
	import BuildingsIcon from "@lucide/svelte/icons/building-2";
	import CheckSquareIcon from "@lucide/svelte/icons/square-check";
	import UserIcon from "@lucide/svelte/icons/user";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { WorkspaceSwitcher, type Workspace } from "$lib/registry/ui/workspace-switcher/index.js";

	const workspaces: Workspace[] = [
		{ id: "advena", name: "Advena Group" },
		{ id: "vwork", name: "vwork Digital" },
		{ id: "touchline", name: "Touchline" },
	];

	let current = $state("advena");
	let created = $state(false);
	const items = [
		{ title: "Companies", icon: BuildingsIcon },
		{ title: "People", icon: UserIcon },
		{ title: "Tasks", icon: CheckSquareIcon },
	];
</script>

<div class="relative h-[420px] w-full [transform:translateZ(0)] overflow-hidden rounded-lg border">
	<Sidebar.Provider class="h-full min-h-0" keyboardShortcut={false} persist={false}>
		<Sidebar.Root collapsible="icon" class="h-full">
			<Sidebar.Header>
				<WorkspaceSwitcher {workspaces} bind:value={current} onCreate={() => (created = true)} />
			</Sidebar.Header>
			<Sidebar.Content>
				<Sidebar.Group>
					<Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{#each items as item (item.title)}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton tooltipContent={item.title}>
										<item.icon />
										<span>{item.title}</span>
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
			<header class="flex h-12 items-center gap-2 border-b px-3">
				<Sidebar.Trigger />
				<span class="text-[13px] text-muted-foreground">
					Current: {workspaces.find((w) => w.id === current)?.name}{created
						? " · create workspace clicked"
						: ""}
				</span>
			</header>
		</Sidebar.Inset>
	</Sidebar.Provider>
</div>
