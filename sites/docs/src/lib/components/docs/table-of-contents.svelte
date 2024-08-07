<script lang="ts">
	import { onMount } from "svelte";
	import { writable } from "svelte/store";
	import type { TableOfContents, TableOfContentsItem } from "$lib/types/docs.js";
	import { Tree } from "$lib/components/docs/index.js";

	let filteredHeadingsList: TableOfContents;

	function getHeadingsWithHierarchy(divId: string) {
		const div = document.getElementById(divId);

		if (!div) {
			return { items: [] };
		}

		const headings: HTMLHeadingElement[] = Array.from(div.querySelectorAll("h2, h3"));
		const hierarchy: TableOfContents = { items: [] };
		let currentLevel: TableOfContentsItem | undefined = undefined;

		const newIdSet: Set<string> = new Set();
		let count = 1;
		headings.forEach((heading: HTMLHeadingElement) => {
			const level = Number.parseInt(heading.tagName.charAt(1));
			if (!heading.id) {
				let newId = heading.innerText
					.replaceAll(/[^a-z0-9 ]/gi, "")
					.replaceAll(" ", "-")
					.toLowerCase();
				if (newIdSet.has(newId)) {
					newId = `${newId}-${count}`;
					count++;
				}
				newIdSet.add(newId);
				heading.id = `${newId}`;
			}

			const item: TableOfContentsItem = {
				title: heading.textContent || "",
				url: `#${heading.id}`,
				items: [],
			};

			if (level === 2) {
				hierarchy.items.push(item);
				currentLevel = item;
			} else if (level === 3 && currentLevel?.items) {
				currentLevel.items.push(item);
			}
		});

		filteredHeadingsList = hierarchy;
	}

	const activeItem = writable<string | undefined>(undefined);

	function useActiveItem(itemIds: string[]) {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						$activeItem = entry.target.id;
					}
				});
			},
			{ rootMargin: `0% 0% -10% 0%` }
		);

		const observeElement = (id: string) => {
			const element = document.getElementById(id);
			if (element) {
				observer.observe(element);
			}
		};

		itemIds?.forEach(observeElement);

		return () => {
			const unobserveElement = (id: string) => {
				const element = document.getElementById(id);
				if (element) {
					observer.unobserve(element);
				}
			};

			itemIds?.forEach(unobserveElement);
		};
	}

	// Lifecycle
	onMount(() => {
		getHeadingsWithHierarchy("markdown");
		const allItemIds: string[] = [];
		filteredHeadingsList.items.forEach((item) => {
			allItemIds.push(item.url.replace("#", ""));
			if (!item.items) return;
			item.items.forEach((subItem) => {
				allItemIds.push(subItem.url.replace("#", ""));
			});
		});
		return useActiveItem(allItemIds);
	});
</script>

<div class="space-y-2">
	<p class="font-medium">On This Page</p>
	<Tree tree={filteredHeadingsList} activeItem={$activeItem} />
</div>
