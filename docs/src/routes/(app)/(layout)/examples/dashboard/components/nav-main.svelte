<script lang="ts">
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import type { Icon } from "@tabler/icons-svelte";

	let { items }: { items: { title: string; url: string; icon?: Icon }[] } = $props();
</script>

<Sidebar.Group>
	<Sidebar.GroupContent>
		<Sidebar.GroupLabel>Home</Sidebar.GroupLabel>
		<Sidebar.Menu>
			{#each items as item (item.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent={item.title}>
						{#if item.icon}
							<item.icon />
						{/if}
						<span>{item.title}</span>
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
