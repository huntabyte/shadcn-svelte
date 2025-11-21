<script lang="ts" module>
	function useActiveItem(getItemIds: () => string[]) {
		let activeId = $state<string | null>(null);
		const itemIds = $derived(getItemIds().map((id) => id.replace("#", "")));

		$effect(() => {
			const observer = new IntersectionObserver((entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						activeId = entry.target.id;
					}
				}
			});

			for (const id of itemIds ?? []) {
				const element = document.getElementById(id);
				if (element) {
					observer.observe(element);
				}
			}

			return () => {
				for (const id of itemIds ?? []) {
					const element = document.getElementById(id);
					if (element) {
						observer.unobserve(element);
					}
				}
			};
		});

		return {
			get current() {
				return activeId;
			},
		};
	}

	export type TocItem = {
		title: string;
		url: string;
		items?: TocItem[];
	};

	export type TableOfContents = {
		items?: TocItem[];
	};

	function flattenToc(
		items: TocItem[],
		depth = 0
	): Array<{ title: string; url: string; depth: number }> {
		const result: Array<{ title: string; url: string; depth: number }> = [];

		for (const item of items) {
			result.push({
				title: item.title,
				url: item.url,
				depth,
			});

			if (item.items && item.items.length > 0) {
				result.push(...flattenToc(item.items, depth + 1));
			}
		}

		return result;
	}
</script>

<script lang="ts">
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import Menu3Icon from "@tabler/icons-svelte/icons/menu-3";

	let {
		toc,
		variant = "list",
		class: className,
	}: { toc: TableOfContents; variant?: "dropdown" | "list"; class?: string } = $props();

	const flattenedToc = $derived(flattenToc(toc.items ?? []));
	const itemIds = $derived(flattenedToc.map((item) => item.url));
	const activeHeading = useActiveItem(() => itemIds);
	let open = $state(false);
</script>

{#if flattenedToc.length}
	{#if variant === "dropdown"}
		<DropdownMenu.Root bind:open>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						variant="outline"
						size="sm"
						class={cn("h-8 md:h-7", className)}
					>
						<Menu3Icon /> On This Page
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="start" class="no-scrollbar max-h-[70svh]">
				{#each flattenedToc as item (item.url)}
					<DropdownMenu.Item
						onSelect={() => (open = false)}
						data-depth={item.depth}
						class="data-[depth=1]:ps-6 data-[depth=2]:ps-8"
					>
						{#snippet child({ props })}
							<a href={item.url} {...props}>{item.title}</a>
						{/snippet}
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{:else}
		<div class={cn("flex flex-col gap-2 p-4 pt-0 text-sm", className)}>
			<p class="text-muted-foreground bg-background sticky top-0 h-6 text-xs">On This Page</p>
			{#each flattenedToc as item (item.url)}
				<a
					href={item.url}
					class="text-muted-foreground hover:text-foreground data-[active=true]:text-foreground text-[0.8rem] no-underline transition-colors data-[depth=1]:ps-4 data-[depth=2]:ps-6"
					data-active={item.url === `#${activeHeading.current}`}
					data-depth={item.depth}
				>
					{item.title}
				</a>
			{/each}
		</div>
	{/if}
{/if}
