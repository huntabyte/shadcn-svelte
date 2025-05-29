<script lang="ts">
	import BoldIcon from "@lucide/svelte/icons/bold";
	import ItalicIcon from "@lucide/svelte/icons/italic";
	import UnderlineIcon from "@lucide/svelte/icons/underline";
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
</script>

<div class="flex flex-wrap items-start gap-4">
	<ToggleGroup.Root type="multiple">
		<ToggleGroup.Item value="bold" aria-label="Toggle bold">
			<BoldIcon />
		</ToggleGroup.Item>
		<ToggleGroup.Item value="italic" aria-label="Toggle italic">
			<ItalicIcon />
		</ToggleGroup.Item>
		<ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
			<UnderlineIcon />
		</ToggleGroup.Item>
	</ToggleGroup.Root>
	<ToggleGroup.Root
		variant="outline"
		type="single"
		value="all"
		class="*:data-[slot=toggle-group-item]:w-20"
	>
		<ToggleGroup.Item value="all" aria-label="Toggle all">All</ToggleGroup.Item>
		<ToggleGroup.Item value="missed" aria-label="Toggle missed">Missed</ToggleGroup.Item>
	</ToggleGroup.Root>

	<ToggleGroup.Root
		variant="outline"
		type="single"
		size="sm"
		value="last-24-hours"
		class="*:data-[slot=toggle-group-item]:px-3"
	>
		<ToggleGroup.Item value="last-24-hours" aria-label="Toggle last 24 hours">
			Last 24 hours
		</ToggleGroup.Item>
		<ToggleGroup.Item value="last-7-days" aria-label="Toggle last 7 days">
			Last 7 days
		</ToggleGroup.Item>
	</ToggleGroup.Root>

	<ToggleGroup.Root
		type="single"
		size="sm"
		value="last-24-hours"
		class="*:data-[slot=toggle-group-item]:px-3"
	>
		<ToggleGroup.Item value="last-24-hours" aria-label="Toggle last 24 hours">
			Last 24 hours
		</ToggleGroup.Item>
		<ToggleGroup.Item value="last-7-days" aria-label="Toggle last 7 days">
			Last 7 days
		</ToggleGroup.Item>
	</ToggleGroup.Root>
</div>
