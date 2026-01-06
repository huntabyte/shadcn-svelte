<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Input Group">
	<div class="flex flex-col gap-4">
		<InputGroup.Root>
			<InputGroup.Input placeholder="Type to search..." />
			<InputGroup.Addon align="inline-start" class="text-muted-foreground">
				<IconPlaceholder
					lucide="SearchIcon"
					tabler="IconSearch"
					hugeicons="Search01Icon"
					phosphor="MagnifyingGlassIcon"
				/>
			</InputGroup.Addon>
		</InputGroup.Root>
	</div>
</Example>
