<script lang="ts">
	import BookmarkIcon from "@lucide/svelte/icons/bookmark";
	import { Toggle } from "$lib/registry/ui/toggle/index.js";
</script>

<Toggle aria-label="Toggle bookmark" size="sm" variant="outline">
	<BookmarkIcon class="group-aria-pressed/toggle:fill-foreground" />
	Bookmark
</Toggle>
