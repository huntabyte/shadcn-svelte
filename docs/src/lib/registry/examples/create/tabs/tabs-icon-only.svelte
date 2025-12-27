<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Icon Only">
	<Tabs.Root value="home">
		<Tabs.List>
			<Tabs.Trigger value="home">
				<IconPlaceholder
					lucide="HomeIcon"
					tabler="IconHome"
					hugeicons="HomeIcon"
					phosphor="HouseIcon"
				/>
			</Tabs.Trigger>
			<Tabs.Trigger value="search">
				<IconPlaceholder
					lucide="SearchIcon"
					tabler="IconSearch"
					hugeicons="SearchIcon"
					phosphor="MagnifyingGlassIcon"
				/>
			</Tabs.Trigger>
			<Tabs.Trigger value="settings">
				<IconPlaceholder
					lucide="SettingsIcon"
					tabler="IconSettings"
					hugeicons="SettingsIcon"
					phosphor="GearIcon"
				/>
			</Tabs.Trigger>
		</Tabs.List>
	</Tabs.Root>
</Example>
