<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import type { Component } from "svelte";

	let {
		teams,
	}: {
		teams: {
			name: string;
			logo: Component;
			plan: string;
		}[];
	} = $props();

	// svelte-ignore state_referenced_locally
	let activeTeam = $state(teams[0]);
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton {...props} class="w-fit px-1.5">
						<div
							class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-5 items-center justify-center rounded-md"
						>
							<activeTeam.logo class="size-3" />
						</div>
						<span class="truncate font-medium">{activeTeam.name}</span>
						<ChevronDownIcon class="opacity-50" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-64 rounded-lg"
				align="start"
				side="bottom"
				sideOffset={4}
			>
				<DropdownMenu.Label class="text-muted-foreground text-xs">Teams</DropdownMenu.Label>
				{#each teams as team, index (team.name)}
					<DropdownMenu.Item onSelect={() => (activeTeam = team)} class="gap-2 p-2">
						<div class="flex size-6 items-center justify-center rounded-xs border">
							<team.logo class="size-4 shrink-0" />
						</div>
						{team.name}
						<DropdownMenu.Shortcut>⌘{index + 1}</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
				{/each}
				<DropdownMenu.Separator />
				<DropdownMenu.Item class="gap-2 p-2">
					<div
						class="bg-background flex size-6 items-center justify-center rounded-md border"
					>
						<PlusIcon class="size-4" />
					</div>
					<div class="text-muted-foreground font-medium">Add team</div>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
