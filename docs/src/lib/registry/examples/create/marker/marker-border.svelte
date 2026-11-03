<script lang="ts">
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Border" class="gap-3">
	<Marker.Root variant="border">
		<Marker.Icon>
			<IconPlaceholder
				lucide="GitBranchIcon"
				tabler="IconGitBranch"
				hugeicons="GitBranchIcon"
				phosphor="GitBranchIcon"
				remixicon="RiGitBranchLine"
			/>
		</Marker.Icon>
		<Marker.Content>Switched to release-candidate</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="border">
		<Marker.Icon>
			<IconPlaceholder
				lucide="SearchIcon"
				tabler="IconSearch"
				hugeicons="Search01Icon"
				phosphor="MagnifyingGlassIcon"
				remixicon="RiSearchLine"
			/>
		</Marker.Icon>
		<Marker.Content>Reviewed 8 related files</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="border">
		<Marker.Icon>
			<IconPlaceholder
				lucide="FileTextIcon"
				tabler="IconFileDescription"
				hugeicons="File01Icon"
				phosphor="FileTextIcon"
				remixicon="RiFileTextLine"
			/>
		</Marker.Icon>
		<Marker.Content>Opened implementation notes</Marker.Content>
	</Marker.Root>
</Example>
