<script lang="ts">
	import Check from "svelte-radix/Check.svelte";
	import Copy from "svelte-radix/Copy.svelte";
	import { CaretSort } from "svelte-radix";
	import { tick } from "svelte";
	import { cn } from "$lib/utils.js";
	import { getPackageManager, packageManagers } from "$lib/stores/package-manager.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/new-york/ui/dropdown-menu/index.js";

	export let copied = false;
	export let copyCode = () => {};
	let className: string | undefined | null = undefined;
	export { className as class };
	export let isPackageManagerBlock = false;

	const selectedPackageManager = getPackageManager();
</script>

{#if isPackageManagerBlock}
	<DropdownMenu.Root preventScroll={false}>
		<DropdownMenu.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				size="icon"
				variant="ghost"
				class={cn(
					"bg-background/10 text-background/70 hover:bg-background/20 hover:text-background/80 dark:bg-foreground/5 dark:text-foreground/70 dark:hover:bg-foreground/10 dark:hover:text-foreground/80 relative !right-12 h-6 w-fit items-center justify-center rounded-md p-1",
					className
				)}
				{...$$restProps}
			>
				<span class="sr-only">select package manager</span>

				<span class="flex items-center pl-1">
					{$selectedPackageManager}
					<CaretSort size="20" />
				</span>
			</Button>
		</DropdownMenu.Trigger>

		<DropdownMenu.Content align="end">
			{#each packageManagers as pm (pm)}
				<DropdownMenu.Item
					on:click={() => {
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
	on:click={copyCode}
	{...$$restProps}
>
	<span class="sr-only">Copy</span>
	{#if copied}
		<Check class="h-3 w-3" tabindex="-1" />
	{:else}
		<Copy class="h-3 w-3" tabindex="-1" />
	{/if}
</button>
