<script lang="ts">
	import * as InputGroup from "#lib/registry/ui/input-group/index.js";
	import SearchIcon from "@lucide/svelte/icons/search";
</script>

<InputGroup.Root class="max-w-xs">
	<InputGroup.Input placeholder="Search..." />
	<InputGroup.Addon>
		<SearchIcon />
	</InputGroup.Addon>
	<InputGroup.Addon align="inline-end">12 results</InputGroup.Addon>
</InputGroup.Root>
