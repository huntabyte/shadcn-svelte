<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Pagination">
	<ButtonGroup>
		<Button variant="outline" size="sm">
			<IconPlaceholder
				lucide="ArrowLeftIcon"
				tabler="IconArrowLeft"
				hugeicons="ArrowLeft02Icon"
				phosphor="ArrowLeftIcon"
				remixicon="RiArrowLeftLine"
				data-icon="inline-start"
			/>
			Previous
		</Button>
		<Button variant="outline" size="sm">1</Button>
		<Button variant="outline" size="sm">2</Button>
		<Button variant="outline" size="sm">3</Button>
		<Button variant="outline" size="sm">4</Button>
		<Button variant="outline" size="sm">5</Button>
		<Button variant="outline" size="sm">
			Next
			<IconPlaceholder
				lucide="ArrowRightIcon"
				tabler="IconArrowRight"
				hugeicons="ArrowRight02Icon"
				phosphor="ArrowRightIcon"
				remixicon="RiArrowRightLine"
				data-icon="inline-end"
			/>
		</Button>
	</ButtonGroup>
</Example>
