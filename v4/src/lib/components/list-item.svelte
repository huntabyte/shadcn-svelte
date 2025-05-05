<script lang="ts">
	import * as NavigationMenu from "$lib/registry/ui/navigation-menu/index.js";
	import type { HTMLLiAttributes } from "svelte/elements";

	let { title, children, href, ...restProps }: HTMLLiAttributes & { href: string } = $props();
</script>

<li {...restProps}>
	<NavigationMenu.Link {href}>
		<div class="text-sm font-medium leading-none">{title}</div>
		<p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
			{@render children?.()}
		</p>
	</NavigationMenu.Link>
</li>
