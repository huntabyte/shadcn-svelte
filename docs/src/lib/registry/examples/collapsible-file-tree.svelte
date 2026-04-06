<script lang="ts">
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import FileIcon from "@lucide/svelte/icons/file";
	import FolderIcon from "@lucide/svelte/icons/folder";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { Button, buttonVariants } from "$lib/registry/ui/button/index.js";

	type FileTreeItem = { name: string } | { name: string; items: FileTreeItem[] };

	const fileTree: FileTreeItem[] = [
		{
			name: "components",
			items: [
				{
					name: "ui",
					items: [
						{ name: "button.svelte" },
						{ name: "card.svelte" },
						{ name: "dialog.svelte" },
						{ name: "input.svelte" },
						{ name: "select.svelte" },
						{ name: "table.svelte" },
					],
				},
				{ name: "login-form.svelte" },
				{ name: "register-form.svelte" },
			],
		},
		{
			name: "lib",
			items: [{ name: "utils.ts" }, { name: "cn.ts" }, { name: "api.ts" }],
		},
		{
			name: "hooks",
			items: [
				{ name: "use-media-query.svelte.ts" },
				{ name: "use-debounce.ts" },
				{ name: "use-local-storage.svelte.ts" },
			],
		},
		{
			name: "types",
			items: [{ name: "index.d.ts" }, { name: "api.d.ts" }],
		},
		{
			name: "public",
			items: [{ name: "favicon.ico" }, { name: "logo.svg" }, { name: "images" }],
		},
		{ name: "+page.svelte" },
		{ name: "+layout.svelte" },
		{ name: "app.css" },
		{ name: "package.json" },
		{ name: "tsconfig.json" },
		{ name: "README.md" },
		{ name: ".gitignore" },
	];
</script>

{#snippet renderItem(item: FileTreeItem)}
	{#if "items" in item}
		<Collapsible.Root>
			<Collapsible.Trigger
				class={buttonVariants({
					variant: "ghost",
					size: "sm",
					class: "group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground",
				})}
			>
				<ChevronRightIcon class="transition-transform group-data-[state=open]:rotate-90" />
				<FolderIcon />
				{item.name}
			</Collapsible.Trigger>
			<Collapsible.Content class="mt-1 ml-5">
				<div class="flex flex-col gap-1">
					{#each item.items as child (child.name)}
						{@render renderItem(child)}
					{/each}
				</div>
			</Collapsible.Content>
		</Collapsible.Root>
	{:else}
		<Button
			variant="link"
			size="sm"
			class="w-full justify-start gap-2 text-foreground"
		>
			<FileIcon />
			<span>{item.name}</span>
		</Button>
	{/if}
{/snippet}

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
				{@render renderItem(item)}
			{/each}
		</div>
	</Card.Content>
</Card.Root>
