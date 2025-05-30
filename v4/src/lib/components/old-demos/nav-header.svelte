<script lang="ts">
	import { page } from "$app/state";
	import * as NavigationMenu from "$lib/registry/ui/navigation-menu/index.js";
</script>

<NavigationMenu.Root class="hidden sm:flex">
	<NavigationMenu.List
		class="**:data-[slot=navigation-menu-link]:py-1 **:data-[slot=navigation-menu-link]:font-medium gap-2 *:data-[slot=navigation-menu-item]:h-7"
	>
		<NavigationMenu.Item>
			<NavigationMenu.Link href="/" data-active={page.url.pathname === "/"}>
				Home
			</NavigationMenu.Link>
		</NavigationMenu.Item>
		<NavigationMenu.Item>
			<NavigationMenu.Link href="/charts" data-active={page.url.pathname === "/charts"}>
				Charts
			</NavigationMenu.Link>
		</NavigationMenu.Item>
		<NavigationMenu.Item>
			<NavigationMenu.Link href="/forms" data-active={page.url.pathname === "/forms"}>
				Forms
			</NavigationMenu.Link>
		</NavigationMenu.Item>
	</NavigationMenu.List>
</NavigationMenu.Root>
