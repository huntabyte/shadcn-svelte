<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="As Link">
	<div class="flex flex-wrap gap-2">
		<Badge href="#/">
			Link
			<IconPlaceholder
				lucide="ArrowUpRightIcon"
				tabler="IconArrowUpRight"
				hugeicons="ArrowUpRightIcon"
				phosphor="ArrowUpRightIcon"
				remixicon="RiArrowRightUpLine"
				data-icon="inline-end"
			/>
		</Badge>
		<Badge variant="secondary" href="#/">
			Link
			<IconPlaceholder
				lucide="ArrowUpRightIcon"
				tabler="IconArrowUpRight"
				hugeicons="ArrowUpRightIcon"
				phosphor="ArrowUpRightIcon"
				remixicon="RiArrowRightUpLine"
				data-icon="inline-end"
			/>
		</Badge>
		<Badge variant="destructive" href="#/">
			Link
			<IconPlaceholder
				lucide="ArrowUpRightIcon"
				tabler="IconArrowUpRight"
				hugeicons="ArrowUpRightIcon"
				phosphor="ArrowUpRightIcon"
				remixicon="RiArrowRightUpLine"
				data-icon="inline-end"
			/>
		</Badge>
		<Badge variant="outline" href="#/">
			Link
			<IconPlaceholder
				lucide="ArrowUpRightIcon"
				tabler="IconArrowUpRight"
				hugeicons="ArrowUpRightIcon"
				phosphor="ArrowUpRightIcon"
				remixicon="RiArrowRightUpLine"
				data-icon="inline-end"
			/>
		</Badge>
		<Badge variant="ghost" href="#/">
			Link
			<IconPlaceholder
				lucide="ArrowUpRightIcon"
				tabler="IconArrowUpRight"
				hugeicons="ArrowRight02Icon"
				phosphor="ArrowUpRightIcon"
				remixicon="RiArrowRightUpLine"
				data-icon="inline-end"
			/>
		</Badge>
		<Badge variant="link" href="#/">
			Link
			<IconPlaceholder
				lucide="ArrowUpRightIcon"
				tabler="IconArrowUpRight"
				hugeicons="ArrowRight02Icon"
				phosphor="ArrowUpRightIcon"
				remixicon="RiArrowRightUpLine"
				data-icon="inline-end"
			/>
		</Badge>
	</div>
</Example>
