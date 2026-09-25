<script lang="ts">
	import Search from "@lucide/svelte/icons/search";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
</script>

<InputGroup.Root class="max-w-xs">
	<InputGroup.Input placeholder="Search..." />
	<InputGroup.Addon>
		<Search />
	</InputGroup.Addon>
	<InputGroup.Addon align="inline-end">12 results</InputGroup.Addon>
</InputGroup.Root>
