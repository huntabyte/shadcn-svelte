<script lang="ts">
	import * as DropdownMenu from "$lib/registry/default/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/registry/default/ui/sidebar/index.js";
	import Check from "@lucide/svelte/icons/check";
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import GalleryVerticalEnd from "@lucide/svelte/icons/gallery-vertical-end";

	let { versions, defaultVersion }: { versions: string[]; defaultVersion: string } = $props();

	let selectedVersion = $state(defaultVersion);
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						{...props}
					>
						<div
							class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
						>
							<GalleryVerticalEnd class="size-4" />
						</div>
						<div class="flex flex-col gap-0.5 leading-none">
							<span class="font-semibold">Documentation</span>
							<span class="">v{selectedVersion}</span>
						</div>
						<ChevronsUpDown class="ml-auto" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-[var(--bits-dropdown-menu-anchor-width)]" align="start">
				{#each versions as version (version)}
					<DropdownMenu.Item onSelect={() => (selectedVersion = version)}>
						v{version}
						{#if version === selectedVersion}
							<Check class="ml-auto" />
						{/if}
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
