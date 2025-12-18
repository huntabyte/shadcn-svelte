<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="Icon Left" class="max-w-fit">
	<div class="flex flex-wrap gap-2">
		<Badge>
			<IconPlaceholder
				lucide="BadgeCheck"
				tabler="IconRosetteDiscountCheck"
				hugeicons="CheckmarkBadge02Icon"
				phosphor="CheckCircleIcon"
				data-icon="inline-start"
			/>
			Default
		</Badge>
		<Badge variant="secondary">
			<IconPlaceholder
				lucide="BadgeCheck"
				tabler="IconRosetteDiscountCheck"
				hugeicons="CheckmarkBadge02Icon"
				phosphor="CheckCircleIcon"
				data-icon="inline-start"
			/>
			Secondary
		</Badge>
		<Badge variant="destructive">
			<IconPlaceholder
				lucide="BadgeCheck"
				tabler="IconRosetteDiscountCheck"
				hugeicons="CheckmarkBadge02Icon"
				phosphor="CheckCircleIcon"
				data-icon="inline-start"
			/>
			Destructive
		</Badge>
		<Badge variant="outline">
			<IconPlaceholder
				lucide="BadgeCheck"
				tabler="IconRosetteDiscountCheck"
				hugeicons="CheckmarkBadge02Icon"
				phosphor="CheckCircleIcon"
				data-icon="inline-start"
			/>
			Outline
		</Badge>
		<Badge variant="ghost">
			<IconPlaceholder
				lucide="BadgeCheck"
				tabler="IconRosetteDiscountCheck"
				hugeicons="CheckmarkBadge02Icon"
				phosphor="CheckCircleIcon"
				data-icon="inline-start"
			/>
			Ghost
		</Badge>
		<Badge variant="link">
			<IconPlaceholder
				lucide="BadgeCheck"
				tabler="IconRosetteDiscountCheck"
				hugeicons="CheckmarkBadge02Icon"
				phosphor="CheckCircleIcon"
				data-icon="inline-start"
			/>
			Link
		</Badge>
	</div>
</Example>
