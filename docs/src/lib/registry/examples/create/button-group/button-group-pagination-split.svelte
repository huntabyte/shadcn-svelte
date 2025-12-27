<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Pagination Split">
	<ButtonGroup>
		<ButtonGroup>
			<Button variant="outline" size="sm">1</Button>
			<Button variant="outline" size="sm">2</Button>
			<Button variant="outline" size="sm">3</Button>
			<Button variant="outline" size="sm">4</Button>
			<Button variant="outline" size="sm">5</Button>
		</ButtonGroup>
		<ButtonGroup>
			<Button variant="outline" size="icon-xs">
				<IconPlaceholder
					lucide="ArrowLeftIcon"
					tabler="IconArrowLeft"
					hugeicons="ArrowLeft01Icon"
					phosphor="ArrowLeftIcon"
				/>
			</Button>
			<Button variant="outline" size="icon-xs">
				<IconPlaceholder
					lucide="ArrowRightIcon"
					tabler="IconArrowRight"
					hugeicons="ArrowRight01Icon"
					phosphor="ArrowRightIcon"
				/>
			</Button>
		</ButtonGroup>
	</ButtonGroup>
</Example>
