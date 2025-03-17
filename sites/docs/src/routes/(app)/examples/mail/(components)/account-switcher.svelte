<script lang="ts">
	import type { Account } from "../data.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";
	import { cn } from "$lib/utils.js";

	let {
		isCollapsed,
		accounts,
	}: {
		isCollapsed: boolean;
		accounts: Account[];
	} = $props();

	let selectedAccountEmail = $state(accounts[0].email);
	const selectedAccount = $derived(
		accounts.find((account) => account.email === selectedAccountEmail)
	);
	const SelectedIcon = $derived(selectedAccount?.icon);
</script>

<Select.Root type="single" value={accounts[0].email}>
	<Select.Trigger
		class={cn(
			"flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
			isCollapsed &&
				"flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
		)}
		aria-label="Select account"
	>
		<span class="pointer-events-none">
			<SelectedIcon class={cn(isCollapsed ? "" : "")} />
			<span class={cn("ml-2", isCollapsed && "hidden")}>
				{selectedAccount?.label}
			</span>
		</span>
	</Select.Trigger>
	<Select.Content>
		{#each accounts as account (account)}
			<Select.Item value={account.email} label={account.label}>
				<div
					class="[&_svg]:text-foreground flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
				>
					<account.icon aria-hidden="true" class="text-foreground size-4 shrink-0" />
					{account.email}
				</div>
			</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>
