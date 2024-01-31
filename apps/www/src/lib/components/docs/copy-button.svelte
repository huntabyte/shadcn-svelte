<script lang="ts">
	import { clickToCopyAction } from "svelte-legos";
	import { cn } from "$lib/utils";
	import { Check, Copy } from "radix-icons-svelte";
	import { Button } from "@/registry/default/ui/button";
	import * as DropdownMenu from "@/registry/default/ui/dropdown-menu";

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
				bun: value.replace(/^npm/, "bun --bun"),
			};
		}

		// npx
		else if (value.startsWith("npx")) {
			commands = {
				npm: value,
				yarn: value.replace(/^npx/, "yarn dlx"),
				pnpm: value.replace(/^npx/, "pnpx"),
				bun: value.replace(/^npx/, "bunx --bun"),
			};
		}
	}

	function handleCopyDone() {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
	}

	function handleCopyError() {
		console.log("Error copying");
	}
</script>

{#if Object.values(commands).filter(Boolean).length > 1}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				size="icon"
				variant="ghost"
				class={cn(
					"relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50",
					className
				)}
				{...$$restProps}
			>
				<span class="sr-only">Copy</span>
				{#if copied}
					<Check class="h-3 w-3" />
				{:else}
					<Copy class="h-3 w-3" />
				{/if}
			</Button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content align="end">
			{#each Object.entries(commands) as [key, command]}
				{#if command}
					<DropdownMenu.Item
						on:click={() =>
							navigator.clipboard
								.writeText(command)
								.then(handleCopyDone)
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
			"inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 absolute right-4 top-4",
			className
		)}
		use:clickToCopyAction={value}
		on:copy-done={handleCopyDone}
		on:copy-error={handleCopyError}
		{...$$restProps}
	>
		<span class="sr-only">Copy</span>
		{#if copied}
			<Check class="h-3 w-3" />
		{:else}
			<Copy class="h-3 w-3" />
		{/if}
	</button>
{/if}
