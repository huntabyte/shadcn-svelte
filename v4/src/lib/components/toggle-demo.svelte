<script lang="ts">
	import BoldIcon from "@lucide/svelte/icons/bold";
	import BookmarkIcon from "@lucide/svelte/icons/bookmark";
	import ItalicIcon from "@lucide/svelte/icons/italic";
	import UnderlineIcon from "@lucide/svelte/icons/underline";
	import { Toggle } from "$lib/registry/ui/toggle/index.js";
</script>

<div class="flex flex-wrap items-center gap-6">
	<Toggle aria-label="Toggle italic">
		<BoldIcon />
	</Toggle>
	<Toggle aria-label="Toggle italic" variant="default">
		<UnderlineIcon />
	</Toggle>
	<Toggle aria-label="Toggle italic" variant="default" disabled>Disabled</Toggle>
	<Toggle variant="outline" aria-label="Toggle italic">
		<ItalicIcon />
		Italic
	</Toggle>
	<Toggle aria-label="Toggle book" class="data-[state=on]:[&_svg]:fill-accent-foreground">
		<BookmarkIcon />
	</Toggle>
	<Toggle variant="outline" aria-label="Toggle italic" size="sm">Small</Toggle>
	<Toggle variant="outline" aria-label="Toggle italic" size="lg">Large</Toggle>
</div>
