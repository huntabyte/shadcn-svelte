<script lang="ts">
	import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
	import BookmarkIcon from "@lucide/svelte/icons/bookmark";
	import { Badge } from "$lib/registry/ui/badge/index.js";
</script>

<div class="flex flex-wrap gap-2">
	<Badge variant="secondary">
		<BadgeCheckIcon />
		Verified
	</Badge>
	<Badge variant="outline">
		Bookmark
		<BookmarkIcon />
	</Badge>
</div>
