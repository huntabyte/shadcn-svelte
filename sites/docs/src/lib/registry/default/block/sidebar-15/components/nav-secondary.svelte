<script lang="ts">
	import * as Sidebar from "$lib/registry/default/ui/sidebar/index.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		items,
		...restProps
	}: ComponentProps<
		typeof Sidebar.Group
		// The `any` should be `Component` after @lucide/svelte updates types
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	> & { items: { title: string; url: string; icon: any; badge?: string }[] } = $props();
</script>

<Sidebar.Group bind:ref {...restProps}>
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
					{#if item.badge}
						<Sidebar.MenuBadge>{item.badge}</Sidebar.MenuBadge>
					{/if}
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
