<script lang="ts">
	import * as InputGroup from "#lib/registry/ui/input-group/index.js";
	import SearchIcon from "@lucide/svelte/icons/search";
	import { Kbd } from "#lib/registry/ui/kbd/index.js";
</script>

<InputGroup.Root class="max-w-sm">
	<InputGroup.Input placeholder="Search..." />
	<InputGroup.Addon>
		<SearchIcon class="text-muted-foreground" />
	</InputGroup.Addon>
	<InputGroup.Addon align="inline-end">
		<Kbd>⌘K</Kbd>
	</InputGroup.Addon>
</InputGroup.Root>
