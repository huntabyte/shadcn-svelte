<script lang="ts">
	import * as Sidebar from "$lib/registry/default/ui/sidebar/index.js";

	// The `any` should be `Component` after @lucide/svelte updates types
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let { items }: { items: { title: string; url: string; icon: any; isActive?: boolean }[] } =
		$props();
</script>

<Sidebar.Menu>
	{#each items as item (item.title)}
		<Sidebar.MenuItem>
			<Sidebar.MenuButton isActive={item.isActive}>
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
