<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Vertical Nested">
	<ButtonGroup orientation="vertical" aria-label="Design tools palette">
		<ButtonGroup orientation="vertical">
			<Button variant="outline" size="icon">
				<IconPlaceholder
					lucide="SearchIcon"
					tabler="IconSearch"
					hugeicons="Search01Icon"
					phosphor="MagnifyingGlassIcon"
				/>
			</Button>
			<Button variant="outline" size="icon">
				<IconPlaceholder
					lucide="CopyIcon"
					tabler="IconCopy"
					hugeicons="Copy01Icon"
					phosphor="CopyIcon"
				/>
			</Button>
			<Button variant="outline" size="icon">
				<IconPlaceholder
					lucide="ShareIcon"
					tabler="IconShare"
					hugeicons="Share03Icon"
					phosphor="ShareIcon"
				/>
			</Button>
		</ButtonGroup>
		<ButtonGroup orientation="vertical">
			<Button variant="outline" size="icon">
				<IconPlaceholder
					lucide="FlipHorizontalIcon"
					tabler="IconFlipHorizontal"
					hugeicons="FlipHorizontalIcon"
					phosphor="ArrowsHorizontalIcon"
				/>
			</Button>
			<Button variant="outline" size="icon">
				<IconPlaceholder
					lucide="FlipVerticalIcon"
					tabler="IconFlipVertical"
					hugeicons="FlipVerticalIcon"
					phosphor="ArrowsVerticalIcon"
				/>
			</Button>
			<Button variant="outline" size="icon">
				<IconPlaceholder
					lucide="RotateCwIcon"
					tabler="IconRotateClockwise2"
					hugeicons="Rotate01Icon"
					phosphor="ArrowClockwiseIcon"
				/>
			</Button>
		</ButtonGroup>
		<ButtonGroup>
			<Button variant="outline" size="icon">
				<IconPlaceholder
					lucide="TrashIcon"
					tabler="IconTrash"
					hugeicons="Delete02Icon"
					phosphor="TrashIcon"
				/>
			</Button>
		</ButtonGroup>
	</ButtonGroup>
</Example>
