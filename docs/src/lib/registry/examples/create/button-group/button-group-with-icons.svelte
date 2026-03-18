<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Icons">
	<div class="flex flex-col gap-4">
		<ButtonGroup>
			<Button variant="outline">
				<IconPlaceholder
					lucide="FlipHorizontalIcon"
					tabler="IconFlipHorizontal"
					hugeicons="FlipHorizontalIcon"
					phosphor="ArrowsHorizontalIcon"
					remixicon="RiFlipHorizontalLine"
				/>
			</Button>
			<Button variant="outline">
				<IconPlaceholder
					lucide="FlipVerticalIcon"
					tabler="IconFlipVertical"
					hugeicons="FlipVerticalIcon"
					phosphor="ArrowsVerticalIcon"
					remixicon="RiFlipVerticalLine"
				/>
			</Button>
			<Button variant="outline">
				<IconPlaceholder
					lucide="RotateCwIcon"
					tabler="IconRotateClockwise2"
					hugeicons="Rotate01Icon"
					phosphor="ArrowClockwiseIcon"
					remixicon="RiRefreshLine"
				/>
			</Button>
		</ButtonGroup>
	</div>
</Example>
