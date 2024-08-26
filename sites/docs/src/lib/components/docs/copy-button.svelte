<script lang="ts">
	import Check from "svelte-radix/Check.svelte";
	import Copy from "svelte-radix/Copy.svelte";
	import { CaretSort } from "svelte-radix";
	import { clickToCopyAction } from "svelte-legos";
	import { cn, selectedCommand } from "$lib/utils.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";

	let copied = false;
	let commands: Record<"npm" | "yarn" | "pnpm" | "bun", string> = {
		npm: "",
		yarn: "",
		pnpm: "",
		bun: "",
	};
	let className: string | undefined | null = undefined;
	export let value = "";
	export { className as class };

	$: if (value) {
		// npm install
		if (value.startsWith("npm install")) {
			commands = {
				npm: value,
				yarn: value.replace("npm install", "yarn add"),
				pnpm: value.replace(/^npm/, "pnpm"),
				bun: value.replace(/^npm/, "bun"),
			};
		}

		// npm create
		else if (value.startsWith("npm create")) {
			commands = {
				npm: value,
				yarn: value.replace(/^npm/, "yarn"),
				pnpm: value.replace(/^npm/, "pnpm"),
				bun: value.replace(/^npm/, "bun"),
			};
		}

		// npx
		else if (value.startsWith("npx")) {
			commands = {
				npm: value,
				yarn: value.replace(/^npx/, "yarn dlx"),
				pnpm: value.replace(/^npx/, "pnpm dlx"),
				bun: value.replace(/^npx/, "bunx"),
			};
		}
	}

	function handleCopyDone(key: string): void {
		if (typeof key === "string") {
			selectedCommand.set(key);
		}

		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
	}

	function handleCopyError() {
		console.error("Error copying");
	}

	function copyCommand() {
		let command = $selectedCommand as "npm" | "yarn" | "pnpm" | "bun";

		const commandValue = commands[command];
		if (!commandValue) return;

		navigator.clipboard
			.writeText(commandValue)
			.then(() => handleCopyDone($selectedCommand))
			.catch(handleCopyError);
	}
</script>

{#if Object.values(commands).filter(Boolean).length > 1}
	{#if $selectedCommand}
		<Button
			size="icon"
			variant="ghost"
			on:click={() => copyCommand()}
			class={cn(
				"pre-copy-btn absolute right-4 top-4 z-10 h-6 w-6  bg-transparent text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50"
			)}
			{...$$restProps}
		>
			<span class="sr-only">Copy</span>
			{#if copied}
				<Check class="h-3 w-3" tabindex="-1" />
			{:else}
				<span class=""><Copy class="h-3 w-3" tabindex="-1" /></span>
			{/if}
		</Button>
	{/if}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				size="icon"
				variant="ghost"
				class={cn(
					"relative !right-12 h-6 w-fit items-center justify-center rounded-md border border-zinc-600 p-1 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 dark:border-zinc-700",
					className
				)}
				{...$$restProps}
			>
				<span class="sr-only">select package manager</span>

				<span class="flex items-center pl-1"
					>{$selectedCommand} <CaretSort size="20" />
				</span>
			</Button>
		</DropdownMenu.Trigger>

		<DropdownMenu.Content align="end">
			{#each Object.entries(commands) as [key, command]}
				{#if command}
					<DropdownMenu.Item
						on:click={() =>
							navigator.clipboard
								.writeText(command)
								.then(() => handleCopyDone(key))
								.catch(handleCopyError)}
					>
						{key}
					</DropdownMenu.Item>
				{/if}
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{:else}
	<button
		class={cn(
			"focus-visible:ring-ring absolute right-4 top-4 z-10 inline-flex h-6 w-6 items-center justify-center rounded-md text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-700 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
			className
		)}
		use:clickToCopyAction={value}
		on:copy-done={handleCopyDone}
		on:copy-error={handleCopyError}
		{...$$restProps}
	>
		<span class="sr-only">Copy</span>
		{#if copied}
			<Check class="h-3 w-3" tabindex="-1" />
		{:else}
			<Copy class="h-3 w-3" tabindex="-1" />
		{/if}
	</button>
{/if}
