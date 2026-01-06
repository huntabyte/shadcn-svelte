<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import * as Button from "$lib/registry/ui/button/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] };

	const fileTree: FileTreeItem[] = [
		{
			name: "src",
			items: [
				{
					name: "lib",
					items: [
						{
							name: "components",
							items: [
								{ name: "Header.svelte" },
								{ name: "Footer.svelte" },
								{ name: "Navigation.svelte" },
								{ name: "Card.svelte" },
							],
						},
						{ name: "utils.ts" },
						{ name: "stores.ts" },
						{ name: "types.ts" },
					],
				},
				{
					name: "routes",
					items: [
						{
							name: "(app)",
							items: [
								{ name: "+layout.svelte" },
								{ name: "+page.svelte" },
								{ name: "about", items: [] },
								{ name: "contact", items: [] },
							],
						},
						{ name: "+layout.svelte" },
						{ name: "+page.svelte" },
						{ name: "+error.svelte" },
					],
				},
				{ name: "app.html" },
				{ name: "app.css" },
				{ name: "app.d.ts" },
				{ name: "hooks.server.ts" },
			],
		},
		{
			name: "static",
			items: [{ name: "favicon.png" }, { name: "robots.txt" }, { name: "images", items: [] }],
		},
		{ name: "package.json" },
		{ name: "svelte.config.js" },
		{ name: "vite.config.ts" },
		{ name: "tsconfig.json" },
		{ name: "README.md" },
		{ name: ".gitignore" },
	];
</script>

<Example title="File Tree" class="items-center">
	<Card.Root class="mx-auto w-full max-w-[16rem] gap-2" size="sm">
		<Card.Header>
			<Tabs.Root value="explorer">
				<Tabs.List class="w-full">
					<Tabs.Trigger value="explorer">Explorer</Tabs.Trigger>
					<Tabs.Trigger value="settings">Outline</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>
		</Card.Header>
		<Card.Content>
			<div class="flex flex-col gap-1">
				{#each fileTree as item (item.name)}
					{@render FileTreeItem({ item })}
				{/each}
			</div>
		</Card.Content>
	</Card.Root>
</Example>

{#snippet FileTreeItem({ item }: { item: FileTreeItem })}
	{#if "items" in item}
		<Collapsible.Root>
			<Collapsible.Trigger>
				{#snippet child({ props })}
					<Button.Root
						variant="ghost"
						size="sm"
						class="group hover:bg-accent hover:text-accent-foreground w-full justify-start transition-none"
						{...props}
					>
						<IconPlaceholder
							lucide="ChevronRightIcon"
							tabler="IconChevronRight"
							hugeicons="ArrowRight01Icon"
							phosphor="CaretRightIcon"
							class="transition-transform group-data-[state=open]:rotate-90"
						/>
						<IconPlaceholder
							lucide="FolderIcon"
							tabler="IconFolder"
							hugeicons="Folder01Icon"
							phosphor="FolderIcon"
						/>
						{item.name}
					</Button.Root>
				{/snippet}
			</Collapsible.Trigger>
			<Collapsible.Content class="style-lyra:ml-4 mt-1 ml-5">
				<div class="flex flex-col gap-1">
					{#each item.items as subItem (subItem.name)}
						{@render FileTreeItem({ item: subItem })}
					{/each}
				</div>
			</Collapsible.Content>
		</Collapsible.Root>
	{:else}
		<Button.Root variant="link" size="sm" class="text-foreground w-full justify-start gap-2">
			<IconPlaceholder
				lucide="FileIcon"
				tabler="IconFile"
				hugeicons="File01Icon"
				phosphor="FileIcon"
			/>
			<span>{item.name}</span>
		</Button.Root>
	{/if}
{/snippet}
