<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Vertical">
	<div class="flex gap-6">
		<ButtonGroup orientation="vertical" aria-label="Media controls" class="h-fit">
			<Button variant="outline" size="icon">
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="PlusSignIcon"
					phosphor="PlusIcon"
				/>
			</Button>
			<Button variant="outline" size="icon">
				<IconPlaceholder
					lucide="MinusIcon"
					tabler="IconMinus"
					hugeicons="MinusSignIcon"
					phosphor="MinusIcon"
				/>
			</Button>
		</ButtonGroup>
	</div>
</Example>
