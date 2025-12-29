<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Examples">
	<div class="flex flex-wrap items-center gap-4">
		<div class="flex items-center gap-2">
			<Button variant="outline">Cancel</Button>
			<Button>
				Submit
				<IconPlaceholder
					lucide="ArrowRightIcon"
					tabler="IconArrowRight"
					hugeicons="ArrowRight02Icon"
					phosphor="ArrowRightIcon"
					data-icon="inline-end"
				/>
			</Button>
		</div>
		<div class="flex items-center gap-2">
			<Button variant="destructive">Delete</Button>
			<Button size="icon">
				<IconPlaceholder
					lucide="ArrowRightIcon"
					tabler="IconArrowRight"
					hugeicons="ArrowRight02Icon"
					phosphor="ArrowRightIcon"
					data-icon="inline-end"
				/>
			</Button>
		</div>
		<Button href="#/">Link</Button>
	</div>
</Example>
