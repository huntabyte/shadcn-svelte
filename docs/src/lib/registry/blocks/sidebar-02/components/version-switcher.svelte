<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import CheckIcon from "@lucide/svelte/icons/check";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";

	let { versions, defaultVersion }: { versions: string[]; defaultVersion: string } = $props();

	// svelte-ignore state_referenced_locally
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
							<GalleryVerticalEndIcon class="size-4" />
						</div>
						<div class="flex flex-col gap-0.5 leading-none">
							<span class="font-medium">Documentation</span>
							<span class="">v{selectedVersion}</span>
						</div>
						<ChevronsUpDownIcon class="ms-auto" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-(--bits-dropdown-menu-anchor-width)" align="start">
				{#each versions as version (version)}
					<DropdownMenu.Item onSelect={() => (selectedVersion = version)}>
						v{version}
						{#if version === selectedVersion}
							<CheckIcon class="ms-auto" />
						{/if}
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
