<script lang="ts">
	import type { TableOfContents, TableOfContentsItem } from "$lib/types/docs";
	import { onMount } from "svelte";
	import { Tree } from "$components/docs";

	let filteredHeadingsList: TableOfContents;

	function getHeadingsWithHierarchy(divId: string) {
		const div = document.getElementById(divId);

		if (!div) {
			return { items: [] };
		}

		const headings: HTMLHeadingElement[] = Array.from(
			div.querySelectorAll("h2, h3")
		);
		const hierarchy: TableOfContents = { items: [] };
		let currentLevel: TableOfContentsItem | undefined = undefined;

		headings.forEach((heading: HTMLHeadingElement) => {
			const level = parseInt(heading.tagName.charAt(1));
			if (!heading.id) {
				let newId = heading.innerText
					.replaceAll(/[^a-zA-Z0-9 ]/g, "")
					.replaceAll(" ", "-")
					.toLowerCase();
				heading.id = `${newId}`;
			}

			const item: TableOfContentsItem = {
				title: heading.textContent || "",
				url: `#${heading.id}`,
				items: []
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

	// Lifecycle
	onMount(() => {
		getHeadingsWithHierarchy("mdsvex");
	});
</script>

<div class="space-y-2">
	<p class="font-medium">On This Page</p>
	<Tree tree={filteredHeadingsList} />
</div>
