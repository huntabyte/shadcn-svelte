<script lang="ts">
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import Example from "../../../../../routes/(app)/(layout)/create/components/example.svelte";
</script>

<Example title="With Icons">
	<ToggleGroup.Root type="multiple" variant="outline" spacing={2} size="sm">
		<ToggleGroup.Item
			value="star"
			aria-label="Toggle star"
			class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-foreground data-[state=on]:*:[svg]:stroke-foreground"
		>
			<IconPlaceholder
				lucide="StarIcon"
				tabler="IconStar"
				hugeicons="StarIcon"
				phosphor="StarIcon"
				remixicon="RiStarLine"
			/>
			Star
		</ToggleGroup.Item>
		<ToggleGroup.Item
			value="heart"
			aria-label="Toggle heart"
			class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-foreground data-[state=on]:*:[svg]:stroke-foreground"
		>
			<IconPlaceholder
				lucide="HeartIcon"
				tabler="IconHeart"
				hugeicons="FavouriteIcon"
				phosphor="HeartIcon"
				remixicon="RiHeartLine"
			/>
			Heart
		</ToggleGroup.Item>
		<ToggleGroup.Item
			value="bookmark"
			aria-label="Toggle bookmark"
			class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-foreground data-[state=on]:*:[svg]:stroke-foreground"
		>
			<IconPlaceholder
				lucide="BookmarkIcon"
				tabler="IconBookmark"
				hugeicons="BookmarkIcon"
				phosphor="BookmarkIcon"
				remixicon="RiBookmarkLine"
			/>
			Bookmark
		</ToggleGroup.Item>
	</ToggleGroup.Root>
</Example>
