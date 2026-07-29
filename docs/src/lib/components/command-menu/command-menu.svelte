<script lang="ts">
	import { goto } from "$app/navigation";
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import CornerDownLeftIcon from "@lucide/svelte/icons/corner-down-left";
	import SquareDashedIcon from "@lucide/svelte/icons/square-dashed";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
	import type { Color, ColorPalette } from "$lib/colors.js";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { mainNavItems, sidebarNavItems } from "$lib/navigation.js";
	import { getCommand } from "$lib/package-manager.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import { UserConfigContext } from "$lib/user-config.svelte.js";
	import { cn } from "$lib/utils.js";
	import CommandMenuItem from "./command-menu-item.svelte";

	let {
		colors,
		blocks,
		closeMobileMenu,
	}: {
		colors: ColorPalette[];
		blocks?: { name: string; description: string; categories: string[] }[];
		closeMobileMenu?: () => void;
	} = $props();

	let open = $state(false);
	let selectedType = $state<"color" | "page" | "component" | "block" | null>(null);
	let copyPayload = $state("");

	const userConfig = UserConfigContext.get();
	const clipboard = new UseClipboard();

	const COMMAND_MENU_GROUP_ORDER = [
		"Components",
		"Get Started",
		"Installation",
		"Dark Mode",
		"Registry",
		"Forms",
		"Migration",
	] as const;

	const orderedSidebarGroups = $derived(
		COMMAND_MENU_GROUP_ORDER.map((title) =>
			sidebarNavItems.find((group) => group.title === title)
		).filter((group): group is (typeof sidebarNavItems)[number] => group !== undefined)
	);

	function handlePageHighlight(isComponent: boolean, item: { href: string; title?: string }) {
		if (isComponent) {
			const componentName = item.href.split("/").pop();
			selectedType = "component";
			const cmd = getCommand(
				userConfig.current.packageManager,
				"execute",
				`shadcn-svelte add ${componentName}`
			);
			copyPayload = `${cmd.command} ${cmd.args.join(" ")}`.trim();
		} else {
			selectedType = "page";
			copyPayload = "";
		}
	}

	function handleBlockHighlight(block: {
		name: string;
		description: string;
		categories: string[];
	}) {
		selectedType = "block";
		const cmd = getCommand(
			userConfig.current.packageManager,
			"execute",
			`shadcn-svelte add ${block.name}`
		);
		copyPayload = `${cmd.command} ${cmd.args.join(" ")}`.trim();
	}

	function handleColorHighlight(color: Color) {
		selectedType = "color";
		copyPayload = color.class;
	}

	function runCommand(command: () => unknown) {
		open = false;
		command();
	}

	function openCommandMenu() {
		// Close mobile menu first if callback is provided
		if (closeMobileMenu) {
			closeMobileMenu();
			// Wait for the mobile menu animation to start closing (100ms matches the transition duration)
			setTimeout(() => {
				open = true;
			}, 0);
		} else {
			open = true;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
			if (
				(e.target instanceof HTMLElement && e.target.isContentEditable) ||
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement ||
				e.target instanceof HTMLSelectElement
			) {
				return;
			}

			e.preventDefault();
			if (open) {
				open = false;
			} else {
				openCommandMenu();
			}
		}

		if (open && e.key === "c" && (e.metaKey || e.ctrlKey)) {
			runCommand(() => {
				if (selectedType === "color") {
					clipboard.copy(copyPayload);
				}

				if (selectedType === "block") {
					clipboard.copy(copyPayload);
				}

				if (selectedType === "page" || selectedType === "component") {
					clipboard.copy(copyPayload);
				}
			});
		}
	}
</script>

<svelte:document onkeydown={handleKeydown} />

<Dialog.Root bind:open>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				class={cn(
					"relative h-8 w-full justify-start rounded-lg border-none bg-muted pl-3 text-foreground shadow-none transition-colors hover:bg-muted/50 md:w-48 lg:w-40 xl:w-64 dark:bg-card"
				)}
				onclick={() => openCommandMenu()}
			>
				<span class="hidden xl:inline-flex">Search documentation...</span>
				<span class="inline-flex xl:hidden">Search...</span>
			</Button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content
		showCloseButton={false}
		class="rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800"
	>
		<Dialog.Header class="sr-only">
			<Dialog.Title>Search documentation...</Dialog.Title>
			<Dialog.Description>Search for a command to run...</Dialog.Description>
		</Dialog.Header>
		<Command.Root class="rounded-none bg-transparent">
			<Command.Input placeholder="Search documentation..." />
			<Command.List tabindex={-1} class="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
				<Command.Empty class="py-12 text-center text-sm text-muted-foreground">
					No results found.
				</Command.Empty>
				<Command.Group
					heading="Pages"
					class="!p-0 [&_[data-command-group-heading]]:scroll-mt-16 [&_[data-command-group-heading]]:!p-3 [&_[data-command-group-heading]]:!pb-1"
				>
					{#each mainNavItems as item (item.href)}
						<CommandMenuItem
							value={`Pages ${item.title}`}
							keywords={["page", item.title.toLowerCase()]}
							onHighlight={() =>
								handlePageHighlight(false, {
									href: item.href ?? "",
									title: item.title,
								})}
							onSelect={() => {
								runCommand(() => {
									if (item.href) {
										goto(item.href);
									}
								});
							}}
						>
							<ArrowRightIcon />
							{item.title}
						</CommandMenuItem>
					{/each}
				</Command.Group>
				{#each orderedSidebarGroups as group (group.title)}
					<Command.Group
						heading={group.title}
						class="!p-0 [&_[data-command-group-heading]]:scroll-mt-16 [&_[data-command-group-heading]]:!p-3 [&_[data-command-group-heading]]:!pb-1"
					>
						{#each group.items as item, i (i)}
							{@const isComponent = item.href?.includes("/components/") ?? false}

							<CommandMenuItem
								value={item.title?.toString() ? `${group.title} ${item.title}` : ""}
								keywords={isComponent ? ["component"] : undefined}
								onHighlight={() =>
									handlePageHighlight(isComponent, {
										href: item.href ?? "",
										title: item.title,
									})}
								onSelect={() => {
									runCommand(() => {
										if (item.href) {
											goto(item.href);
										}
									});
								}}
							>
								{#if isComponent}
									<div
										class="aspect-square size-4 rounded-full border border-dashed border-muted-foreground"
									></div>
								{:else}
									<ArrowRightIcon />
								{/if}
								{item.title}
							</CommandMenuItem>
						{/each}
					</Command.Group>
				{/each}
				{#if blocks?.length}
					<Command.Group heading="Blocks" class="!p-0 [&_[data-command-group-heading]]:!p-3">
						{#each blocks as block (block.name)}
							<CommandMenuItem
								value={block.name}
								onHighlight={() => handleBlockHighlight(block)}
								keywords={["block", block.name, block.description, ...block.categories]}
								onSelect={() => {
									runCommand(() => {
										goto(`/blocks/${block.categories[0]}#${block.name}`);
									});
								}}
							>
								<SquareDashedIcon />
								{block.description}
								<span
									class="ms-auto font-mono text-xs font-normal text-muted-foreground tabular-nums"
								>
									{block.name}
								</span>
							</CommandMenuItem>
						{/each}
					</Command.Group>
				{/if}
				{#each colors as colorPalette (colorPalette.name)}
					<Command.Group
						heading={colorPalette.name.charAt(0).toUpperCase() + colorPalette.name.slice(1)}
						class="!p-0 [&_[data-command-group-heading]]:!p-3"
					>
						{#each colorPalette.colors as color (color.hex)}
							<CommandMenuItem
								value={color.class}
								keywords={["color", color.name, color.class]}
								onHighlight={() => handleColorHighlight(color)}
								onSelect={() => {
									runCommand(() => clipboard.copy(color.oklch));
								}}
							>
								<div
									class="border-ghost aspect-square size-4 rounded-sm bg-(--color) after:rounded-sm"
									style="--color: {color.oklch};"
								></div>
								{color.class}
								<span
									class="ms-auto font-mono text-xs font-normal text-muted-foreground tabular-nums"
								>
									{color.oklch}
								</span>
							</CommandMenuItem>
						{/each}
					</Command.Group>
				{/each}
			</Command.List>
		</Command.Root>
		<div
			class="absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium text-muted-foreground dark:border-t-neutral-700 dark:bg-neutral-800"
		>
			<div class="flex items-center gap-2">
				<Kbd.Root class="border bg-background"><CornerDownLeftIcon /></Kbd.Root>
				{#if selectedType === "page" || selectedType === "component"}
					Go to Page
				{/if}
				{#if selectedType === "color"}
					Copy OKLCH
				{/if}
			</div>
			{#if copyPayload}
				<Separator orientation="vertical" class="!h-4" />
				<div class="flex items-center gap-1">
					<Kbd.Group
						><Kbd.Root class="border bg-background">⌘</Kbd.Root>
						<Kbd.Root class="border bg-background">C</Kbd.Root>
					</Kbd.Group>
					{copyPayload}
				</div>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>
