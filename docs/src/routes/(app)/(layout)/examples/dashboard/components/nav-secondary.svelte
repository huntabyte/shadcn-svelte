<script lang="ts">
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import type { Icon } from "@tabler/icons-svelte";
	import type { ComponentProps } from "svelte";

	let {
		items,
		...restProps
	}: {
		items: {
			title: string;
			url: string;
			icon: Icon;
		}[];
	} & ComponentProps<typeof Sidebar.Group> = $props();
</script>

<Sidebar.Group {...restProps}>
	<Sidebar.GroupContent>
		<Sidebar.Menu>
			{#each items as item (item.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton>
						{#snippet child({ props })}
							<a href={item.url} {...props}>
								<item.icon />
								<span>{item.title}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
