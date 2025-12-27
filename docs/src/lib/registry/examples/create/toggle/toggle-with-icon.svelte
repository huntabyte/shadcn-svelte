<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Toggle } from "$lib/registry/ui/toggle/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
</script>

<Example title="With Icon">
	<div class="flex flex-wrap items-center gap-2">
		<Toggle aria-label="Toggle bookmark" pressed>
			<IconPlaceholder
				lucide="BookmarkIcon"
				tabler="IconBookmark"
				hugeicons="BookmarkIcon"
				phosphor="BookmarkIcon"
				class="group-data-[state=on]/toggle:fill-accent-foreground"
			/>
		</Toggle>
		<Toggle variant="outline" aria-label="Toggle bookmark outline">
			<IconPlaceholder
				lucide="BookmarkIcon"
				tabler="IconBookmark"
				hugeicons="BookmarkIcon"
				phosphor="BookmarkIcon"
				class="group-data-[state=on]/toggle:fill-accent-foreground"
			/>
			Bookmark
		</Toggle>
	</div>
</Example>
