<script lang="ts">
	import { Icons } from "./icons/index.js";
	import type { NavItem, NavItemWithChildren } from "$lib/types/nav.js";
	import { page } from "$app/stores";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import { docsConfig } from "$lib/config/docs.js";

	let pager: ReturnType<typeof getPagerForDoc>;

	function getPagerForDoc(slug: string) {
		const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null];
		let activeIndex: number;
		if (!slug) {
			activeIndex = 1;
		} else {
			activeIndex = flattenedLinks.findIndex((link) => `/docs/${slug}` === link?.href);
		}

		const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
		const next =
			activeIndex !== flattenedLinks.length - 1 ? flattenedLinks[activeIndex + 1] : null;
		return {
			prev,
			next,
		};
	}

	function flatten(links: NavItemWithChildren[]): NavItem[] {
		return links
			.reduce<NavItem[]>((flat, link) => {
				return flat.concat(link.items?.length ? flatten(link.items) : link);
			}, [])
			.filter((link) => !link?.disabled);
	}

	$: pager = getPagerForDoc($page.params.slug);
</script>

<div class="flex flex-row items-center justify-between">
	{#if pager?.prev?.href}
		<Button href={pager.prev.href} variant="outline">
			<Icons.chevronLeft class="mr-2 h-4 w-4" />
			{pager.prev.title}
		</Button>
	{/if}
	{#if pager?.next?.href}
		<Button href={pager.next.href} variant="outline" class="ml-auto">
			{pager.next.title}
			<Icons.chevronRight class="ml-2 h-4 w-4" />
		</Button>
	{/if}
</div>
