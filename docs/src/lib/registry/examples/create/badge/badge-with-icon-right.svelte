<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Icon Right" class="max-w-fit">
	<div class="flex flex-wrap gap-2">
		<Badge>
			Default
			<IconPlaceholder
				lucide="ArrowRightIcon"
				tabler="IconArrowRight"
				hugeicons="ArrowRight02Icon"
				phosphor="ArrowRightIcon"
				data-icon="inline-end"
			/>
		</Badge>
		<Badge variant="secondary">
			Secondary
			<IconPlaceholder
				lucide="ArrowRightIcon"
				tabler="IconArrowRight"
				hugeicons="ArrowRight02Icon"
				phosphor="ArrowRightIcon"
				data-icon="inline-end"
			/>
		</Badge>
		<Badge variant="destructive">
			Destructive
			<IconPlaceholder
				lucide="ArrowRightIcon"
				tabler="IconArrowRight"
				hugeicons="ArrowRight02Icon"
				phosphor="ArrowRightIcon"
				data-icon="inline-end"
			/>
		</Badge>
		<Badge variant="outline">
			Outline
			<IconPlaceholder
				lucide="ArrowRightIcon"
				tabler="IconArrowRight"
				hugeicons="ArrowRight02Icon"
				phosphor="ArrowRightIcon"
				data-icon="inline-end"
			/>
		</Badge>
		<Badge variant="ghost">
			Ghost
			<IconPlaceholder
				lucide="ArrowRightIcon"
				tabler="IconArrowRight"
				hugeicons="ArrowRight02Icon"
				phosphor="ArrowRightIcon"
				data-icon="inline-end"
			/>
		</Badge>
		<Badge variant="link">
			Link
			<IconPlaceholder
				lucide="ArrowRightIcon"
				tabler="IconArrowRight"
				hugeicons="ArrowRight02Icon"
				phosphor="ArrowRightIcon"
				data-icon="inline-end"
			/>
		</Badge>
	</div>
</Example>
