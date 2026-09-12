<script lang="ts">
	import { goto } from "$app/navigation";
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import CornerDownLeftIcon from "@lucide/svelte/icons/corner-down-left";
	import SquareDashedIcon from "@lucide/svelte/icons/square-dashed";
	import { cn } from "cn";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
	import type { ColorPalette } from "$lib/colors.js";
	import { UseClipboard } from "$lib/hooks/use-clipboard.svelte.js";
	import { mainNavItems, sidebarNavItems } from "$lib/navigation.js";
	import { getCommand } from "$lib/package-manager.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import { UserConfigContext, type PackageManager } from "$lib/user-config.svelte.js";
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
	// The currently highlighted item's value (bound to the command). Everything the footer
	// shows is derived from it, which is far cheaper than observing every item for changes.
	let value = $state("");

	const userConfig = UserConfigContext.get();
	const clipboard = new UseClipboard();

	const COMMAND_MENU_GROUP_ORDER = [
		"Components",
		"Get Started",
		"Utilities",
		"Installation",
		"Dark Mode",
		"Registry",
		"Forms",
		"Migration",
	] as const;

	const orderedSidebarGroups = COMMAND_MENU_GROUP_ORDER.map((title) =>
		sidebarNavItems.find((group) => group.title === title)
	).filter((group): group is (typeof sidebarNavItems)[number] => group !== undefined);

	type SelectedType = "color" | "page" | "component" | "block";

	function pageValue(groupTitle: string, title: string | undefined) {
		return title?.toString() ? `${groupTitle} ${title}` : "";
	}

	function addCommandPayload(pm: PackageManager, name: string) {
		const cmd = getCommand(pm, "execute", `shadcn-svelte add ${name}`);
		return `${cmd.command} ${cmd.args.join(" ")}`.trim();
	}

	// Maps each item's command value to what the footer should show when it is highlighted.
	const selections = $derived.by(() => {
		const pm = userConfig.current.packageManager;
		const map: Record<string, { type: SelectedType; payload: string }> = {};
		for (const item of mainNavItems) {
			map[pageValue("Pages", item.title)] = { type: "page", payload: "" };
		}
		for (const group of orderedSidebarGroups) {
			for (const item of group.items) {
				const isComponent = item.href?.includes("/components/") ?? false;
				map[pageValue(group.title, item.title)] = isComponent
					? { type: "component", payload: addCommandPayload(pm, item.href?.split("/").pop() ?? "") }
					: { type: "page", payload: "" };
			}
		}
		for (const block of blocks ?? []) {
			map[block.name] = { type: "block", payload: addCommandPayload(pm, block.name) };
		}
		for (const palette of colors) {
			for (const color of palette.colors) {
				map[color.class] = { type: "color", payload: color.class };
			}
		}
		return map;
	});

	const selected = $derived(selections[value]);
	const selectedType = $derived(selected?.type ?? null);
	const copyPayload = $derived(selected?.payload ?? "");
	// Only the small "Pages" group is rendered in the frame the dialog opens (like shadcn/ui);
	// the docs groups mount right after that frame paints so opening the menu is instant.
	let renderDelayedGroups = $state(false);
	// Bound to the input. Reset on open rather than close so the dialog never remounts items
	// it is about to tear down.
	let search = $state("");

	$effect(() => {
		if (!open) {
			renderDelayedGroups = false;
			return;
		}
		let timeout: ReturnType<typeof setTimeout> | undefined;
		const frame = requestAnimationFrame(() => {
			timeout = setTimeout(() => {
				renderDelayedGroups = true;
			});
		});
		return () => {
			cancelAnimationFrame(frame);
			clearTimeout(timeout);
		};
	});

	// Filtering is done here instead of by the command primitive so that only matching items
	// are ever mounted. The primitive would mount all ~340 items (250 of them colors) and
	// re-filter/re-sort every one of them on each keystroke, which is what made the menu lag.
	// Matching is the same plain substring check shadcn/ui uses.
	const normalizedSearch = $derived(search.trim().toLowerCase());

	function matches(haystack: string) {
		return normalizedSearch === "" || haystack.includes(normalizedSearch);
	}

	const pageResults = $derived(
		mainNavItems.filter((item) => matches(`pages ${item.title} page`.toLowerCase()))
	);

	const groupResults = $derived(
		orderedSidebarGroups
			.map((group) => ({
				...group,
				items: group.items.filter((item) => {
					const isComponent = item.href?.includes("/components/") ?? false;
					return matches(
						`${group.title} ${item.title}${isComponent ? " component" : ""}`.toLowerCase()
					);
				}),
			}))
			.filter((group) => group.items.length > 0)
	);

	const blockResults = $derived(
		(blocks ?? []).filter((block) =>
			matches(
				`${block.name} block ${block.description} ${block.categories.join(" ")}`.toLowerCase()
			)
		)
	);

	// Colors are only shown while searching, and only the ones whose class name matches, so a
	// query like "c" does not mount every color in the palette.
	const colorResults = $derived(
		normalizedSearch === ""
			? []
			: colors
					.map((palette) => ({
						...palette,
						colors: palette.colors.filter((color) => color.class.includes(normalizedSearch)),
					}))
					.filter((palette) => palette.colors.length > 0)
	);

	const hasResults = $derived(
		pageResults.length > 0 ||
			groupResults.length > 0 ||
			blockResults.length > 0 ||
			colorResults.length > 0
	);

	function runCommand(command: () => unknown) {
		open = false;
		command();
	}

	function openCommandMenu() {
		search = "";
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
		<Command.Root class="rounded-none bg-transparent" bind:value shouldFilter={false}>
			<Command.Input bind:value={search} placeholder="Search documentation..." />
			<Command.List tabindex={-1} class="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
				{#if !hasResults}
					<div class="py-12 text-center text-sm text-muted-foreground">No results found.</div>
				{/if}
				{#if pageResults.length}
					<Command.Group
						heading="Pages"
						class="!p-0 [&_[data-command-group-heading]]:scroll-mt-16 [&_[data-command-group-heading]]:!p-3 [&_[data-command-group-heading]]:!pb-1"
					>
						{#each pageResults as item (item.href)}
							<CommandMenuItem
								value={pageValue("Pages", item.title)}
								keywords={["page", item.title.toLowerCase()]}
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
				{/if}
				{#if renderDelayedGroups}
					{#each groupResults as group (group.title)}
						<Command.Group
							heading={group.title}
							class="!p-0 [&_[data-command-group-heading]]:scroll-mt-16 [&_[data-command-group-heading]]:!p-3 [&_[data-command-group-heading]]:!pb-1"
						>
							{#each group.items as item (item.href ?? item.title)}
								{@const isComponent = item.href?.includes("/components/") ?? false}

								<CommandMenuItem
									value={pageValue(group.title, item.title)}
									keywords={isComponent ? ["component"] : undefined}
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
					{#if blockResults.length}
						<Command.Group heading="Blocks" class="!p-0 [&_[data-command-group-heading]]:!p-3">
							{#each blockResults as block (block.name)}
								<CommandMenuItem
									value={block.name}
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
				{/if}
				{#each colorResults as colorPalette (colorPalette.name)}
					<Command.Group
						heading={colorPalette.name.charAt(0).toUpperCase() + colorPalette.name.slice(1)}
						class="!p-0 [&_[data-command-group-heading]]:!p-3"
					>
						{#each colorPalette.colors as color (color.hex)}
							<CommandMenuItem
								value={color.class}
								keywords={["color", color.name, color.class]}
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
				<Separator
					orientation="vertical"
					class="!h-4 !self-center bg-neutral-200 dark:bg-neutral-700"
				/>
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
