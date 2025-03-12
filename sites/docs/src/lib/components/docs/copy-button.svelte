<script lang="ts">
	import Check from "@lucide/svelte/icons/check";
	import Copy from "@lucide/svelte/icons/copy";
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import { tick } from "svelte";
	import { cn } from "$lib/utils.js";
	import { getPackageManager } from "$lib/stores/package-manager.js";
	import { Button, type ButtonProps } from "$lib/registry/new-york/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";
	import type { Agent } from "package-manager-detector";

	type Props = Omit<ButtonProps, "children"> & {
		isPackageManagerBlock?: boolean;
		copied?: boolean;
		copyCode?: () => void;
	};

	let {
		class: className,
		isPackageManagerBlock = false,
		copied = $bindable(false),
		copyCode = () => {},
		...restProps
	}: Props = $props();

	const selectedPackageManager = getPackageManager();
</script>

{#if isPackageManagerBlock}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button
					{...props}
					size="icon"
					variant="ghost"
					class={cn(
						"bg-background/10 text-background/70 hover:bg-background/20 hover:text-background/80 dark:bg-foreground/5 dark:text-foreground/70 dark:hover:bg-foreground/10 dark:hover:text-foreground/80 relative !right-12 h-6 w-fit items-center justify-center rounded-md p-1",
						"hidden sm:inline-flex",
						className
					)}
					{...restProps}
				>
					<span class="sr-only">select package manager</span>

					<span class="flex items-center pl-1">
						{$selectedPackageManager}
						<ChevronsUpDown class="size-5" />
					</span>
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>

		<DropdownMenu.Content align="end" preventScroll={false}>
			{#each ["pnpm", "bun", "yarn", "npm"] satisfies Agent[] as pm (pm)}
				<DropdownMenu.Item
					onclick={() => {
						selectedPackageManager.set(pm);
						tick().then(() => {
							copyCode();
						});
					}}
				>
					{pm}
				</DropdownMenu.Item>
			{/each}
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
<button
	class={cn(
		"focus-visible:ring-ring absolute right-4 top-4 z-10 inline-flex h-6 w-6 items-center justify-center rounded-md text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-700 hover:text-zinc-50 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50",
		className
	)}
	onclick={copyCode}
	{...restProps}
>
	<span class="sr-only">Copy</span>
	{#if copied}
		<Check class="h-3 w-3" tabindex={-1} />
	{:else}
		<Copy class="h-3 w-3" tabindex={-1} />
	{/if}
</button>
