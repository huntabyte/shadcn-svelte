<script lang="ts">
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import type { Snippet } from "svelte";

	let {
		label,
		children,
	}: {
		/** The group heading, for example "User" or "Workspace". */
		label?: string;
		children?: Snippet;
	} = $props();
</script>

<Sidebar.Group data-slot="settings-nav-group">
	{#if label}
		<Sidebar.GroupLabel>{label}</Sidebar.GroupLabel>
	{/if}
	<Sidebar.GroupContent>
		<Sidebar.Menu>
			{@render children?.()}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
