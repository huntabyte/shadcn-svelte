<script lang="ts">
	import { Label } from "$lib/registry/ui/label/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import type { WithElementRef } from "$lib/utils.js";
	import SearchIcon from "@lucide/svelte/icons/search";
	import type { HTMLFormAttributes } from "svelte/elements";

	let { ref = $bindable(null), ...restProps }: WithElementRef<HTMLFormAttributes> = $props();
</script>

<form bind:this={ref} {...restProps}>
	<Sidebar.Group class="py-0">
		<Sidebar.GroupContent class="relative">
			<Label for="search" class="sr-only">Search</Label>
			<Sidebar.Input id="search" placeholder="Search the docs..." class="ps-8" />
			<SearchIcon
				class="pointer-events-none absolute start-2 top-1/2 size-4 -translate-y-1/2 opacity-50 select-none"
			/>
		</Sidebar.GroupContent>
	</Sidebar.Group>
</form>
