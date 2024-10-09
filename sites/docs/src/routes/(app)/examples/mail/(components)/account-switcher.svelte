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

	let selectedAccount = $state(accounts[0]);
	const SelectedIcon = $derived(selectedAccount.icon);
</script>

<Select.Root value={accounts[0].email}>
	<Select.Trigger
		class={cn(
			"flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
			isCollapsed &&
				"flex size-9 shrink-0 items-center justify-center p-0 [&>div>svg]:hidden [&>span]:w-auto"
		)}
		aria-label="Select account"
	>
		<span class="pointer-events-none">
			<SelectedIcon class={cn(isCollapsed ? "ml-2" : "")} />
			<span class={cn(isCollapsed ? "!ml-0 !hidden" : "ml-2")}>
				{selectedAccount.label}
			</span>
		</span>
	</Select.Trigger>
	<Select.Content align={isCollapsed ? "start" : undefined} class="w-fit">
		<Select.Group>
			{#each accounts as account}
				{@const Icon = account.icon}
				<Select.Item value={account.email} textValue={account.label}>
					<div
						class="[&_svg]:text-foreground flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
					>
						<Icon aria-hidden="true" class="text-foreground size-4 shrink-0" />
						{account.email}
					</div>
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
</Select.Root>
