<script lang="ts">
	import Circle from "@lucide/svelte/icons/circle";
	import File from "@lucide/svelte/icons/file";
	import Laptop from "@lucide/svelte/icons/laptop";
	import Moon from "@lucide/svelte/icons/moon";
	import Sun from "@lucide/svelte/icons/sun";
	import { type ComponentProps } from "svelte";
	import { resetMode, setMode } from "mode-watcher";
	import * as Command from "$lib/registry/new-york/ui/command/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { docsConfig } from "$lib/config/docs.js";

	let restProps: ComponentProps<typeof Button> = $props();

	let open = $state(false);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			open = true;
		}
	}

	function runCommand(cmd: () => void) {
		open = false;
		cmd();
	}

	const mainNav = docsConfig.mainNav.filter((item) => !item.external);
	const sidebarNav = docsConfig.sidebarNav;
</script>

<svelte:document onkeydown={handleKeydown} />

<Button
	variant="outline"
	class={cn(
		"text-muted-foreground relative w-full justify-start text-sm sm:pr-12 md:w-40 lg:w-64"
	)}
	onclick={() => (open = true)}
	{...restProps}
>
	<span class="hidden lg:inline-flex"> Search documentation... </span>
	<span class="inline-flex lg:hidden">Search...</span>
	<kbd
		class="bg-muted pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex"
	>
		<span class="text-xs">⌘</span>K
	</kbd>
</Button>
<Command.Dialog bind:open>
	<Command.Input placeholder="Type a command or search" />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Links">
			{#each mainNav as navItem}
				<Command.LinkItem
					value={navItem.title}
					href={navItem.href}
					onSelect={() => (open = false)}
				>
					<File class="mr-2 size-4" />
					{navItem.title}
				</Command.LinkItem>
			{/each}
		</Command.Group>
		{#each sidebarNav as group}
			<Command.Group heading={group.title}>
				{#each group.items as navItem}
					<Command.LinkItem
						value={navItem.title}
						href={navItem.href}
						onSelect={() => (open = false)}
					>
						<div class="mr-2 flex size-4 items-center justify-center">
							<Circle class="size-3" />
						</div>
						{navItem.title}
					</Command.LinkItem>
				{/each}
			</Command.Group>
		{/each}
		<Command.Separator />
		<Command.Group heading="Theme">
			<Command.Item value="light" onSelect={() => runCommand(() => setMode("light"))}>
				<Sun class="mr-2 size-4" />
				Light
			</Command.Item>
			<Command.Item value="dark" onSelect={() => runCommand(() => setMode("dark"))}>
				<Moon class="mr-2 size-4" />
				Dark
			</Command.Item>
			<Command.Item value="system" onSelect={() => runCommand(() => resetMode())}>
				<Laptop class="mr-2 size-4" />
				System
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>
