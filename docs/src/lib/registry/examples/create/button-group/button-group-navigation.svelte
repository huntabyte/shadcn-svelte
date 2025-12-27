<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Navigation">
	<ButtonGroup>
		<ButtonGroup>
			<Button variant="outline">
				<IconPlaceholder
					lucide="ArrowLeftIcon"
					tabler="IconArrowLeft"
					hugeicons="ArrowLeft01Icon"
					phosphor="ArrowLeftIcon"
				/>
			</Button>
			<Button variant="outline">
				<IconPlaceholder
					lucide="ArrowRightIcon"
					tabler="IconArrowRight"
					hugeicons="ArrowRight01Icon"
					phosphor="ArrowRightIcon"
				/>
			</Button>
		</ButtonGroup>
		<ButtonGroup aria-label="Single navigation button">
			<Button variant="outline" size="icon">
				<IconPlaceholder
					lucide="ArrowLeftIcon"
					tabler="IconArrowLeft"
					hugeicons="ArrowLeft01Icon"
					phosphor="ArrowLeftIcon"
				/>
			</Button>
		</ButtonGroup>
	</ButtonGroup>
</Example>
