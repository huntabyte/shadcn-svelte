<script lang="ts">
	import SearchIcon from "@lucide/svelte/icons/search";
	import { cn } from "$lib/utils.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Pagination from "$lib/registry/ui/pagination/index.js";
	import { Progress } from "$lib/registry/ui/progress/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";

	const ARTICLE_ROWS = [
		{
			title: "The Future of Sustainable Architecture",
			wordProgress: "1.4k / 2.6k words",
			author: "Elena Rostova",
			issue: "Summer 2024",
			status: "in-revision",
			statusLabel: "In revision",
			progress: 45,
		},
		{
			title: "Brutalism's Second Act",
			wordProgress: "2.1k / 2.5k words",
			author: "Marcus Chen",
			issue: "Summer 2024",
			status: "final-edit",
			statusLabel: "Final edit",
			progress: 90,
		},
		{
			title: "The Typography of Public Spaces",
			wordProgress: "0.5k / 1.5k words",
			author: "Sarah Jenkins",
			issue: "Autumn 2024",
			status: "drafting",
			statusLabel: "Drafting",
			progress: 20,
		},
		{
			title: "Rethinking Urban Canopies",
			wordProgress: "1.8k / 1.8k words",
			author: "David O'Connor",
			issue: "Summer 2024",
			status: "published",
			statusLabel: "Published",
			progress: 100,
		},
		{
			title: "Light, Glass, and the Modern Museum",
			wordProgress: "1.2k / 2.0k words",
			author: "Amara Osei",
			issue: "Autumn 2024",
			status: "in-revision",
			statusLabel: "In revision",
			progress: 55,
		},
		{
			title: "Concrete Utopias: Housing in the 21st Century",
			wordProgress: "3.0k / 3.0k words",
			author: "Tomás Herrera",
			issue: "Summer 2024",
			status: "published",
			statusLabel: "Published",
			progress: 100,
		},
		{
			title: "Designing for Silence",
			wordProgress: "0.8k / 2.2k words",
			author: "Ingrid Solberg",
			issue: "Winter 2024",
			status: "drafting",
			statusLabel: "Drafting",
			progress: 30,
		},
		{
			title: "The Invisible Infrastructure of Cities",
			wordProgress: "2.4k / 2.8k words",
			author: "James Whitfield",
			issue: "Autumn 2024",
			status: "final-edit",
			statusLabel: "Final edit",
			progress: 85,
		},
	] as const;

	type ArticleStatus = (typeof ARTICLE_ROWS)[number]["status"];

	const STATUS_BADGE_VARIANT: Record<
		ArticleStatus,
		"outline" | "default" | "ghost" | "secondary"
	> = {
		"in-revision": "outline",
		"final-edit": "default",
		drafting: "ghost",
		published: "secondary",
	};

	const STATUS_DOT_CLASSNAME: Record<ArticleStatus, string> = {
		"in-revision": "bg-amber-600/80",
		"final-edit": "bg-foreground/90",
		drafting: "bg-muted-foreground/60",
		published: "bg-emerald-600/80",
	};
</script>

<Card.Root>
	<Card.Header>
		<InputGroup.Root>
			<InputGroup.Addon>
				<SearchIcon />
			</InputGroup.Addon>
			<InputGroup.Input type="search" placeholder="Search articles..." />
		</InputGroup.Root>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row class="hover:bg-transparent">
					<Table.Head>Title</Table.Head>
					<Table.Head class="w-[170px]">Author</Table.Head>
					<Table.Head class="w-[150px]">Issue</Table.Head>
					<Table.Head class="w-[180px]">Status</Table.Head>
					<Table.Head class="w-[140px]">Progress</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each ARTICLE_ROWS as row (row.title)}
					<Table.Row>
						<Table.Cell>
							<div class="flex flex-col gap-1">
								<p class="font-heading text-foreground text-xl tracking-tight">
									{row.title}
								</p>
								<p class="text-muted-foreground text-xs">{row.wordProgress}</p>
							</div>
						</Table.Cell>
						<Table.Cell>{row.author}</Table.Cell>
						<Table.Cell>{row.issue}</Table.Cell>
						<Table.Cell>
							<Badge variant={STATUS_BADGE_VARIANT[row.status]}>
								<span
									class={cn(
										"size-1.5 rounded-full",
										STATUS_DOT_CLASSNAME[row.status]
									)}
								></span>
								{row.statusLabel}
							</Badge>
						</Table.Cell>
						<Table.Cell>
							<div class="flex items-center gap-2">
								<span class="text-muted-foreground text-xs">{row.progress}%</span>
								<Progress
									value={row.progress}
									aria-label={`${row.progress}% complete`}
									class="w-16"
								/>
							</div>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
	<Card.Footer>
		<Pagination.Root count={30}>
			{#snippet children({ pages, currentPage })}
				<Pagination.Content>
					<Pagination.Item>
						<Pagination.PrevButton />
					</Pagination.Item>
					{#each pages as page (page.key)}
						{#if page.type === "ellipsis"}
							<Pagination.Item>
								<Pagination.Ellipsis />
							</Pagination.Item>
						{:else}
							<Pagination.Item>
								<Pagination.Link {page} isActive={currentPage === page.value}>
									{page.value}
								</Pagination.Link>
							</Pagination.Item>
						{/if}
					{/each}
					<Pagination.Item>
						<Pagination.NextButton />
					</Pagination.Item>
				</Pagination.Content>
			{/snippet}
		</Pagination.Root>
	</Card.Footer>
</Card.Root>
