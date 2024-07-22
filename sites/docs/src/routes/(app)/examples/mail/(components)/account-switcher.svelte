<script lang="ts">
	import type { Account } from "../data.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";
	import { cn } from "$lib/utils.js";

	export let isCollapsed: boolean;
	export let accounts: Account[];

	let selectedAccount = accounts[0];
</script>

<Select.Root
	portal={null}
	selected={{ value: selectedAccount.email, label: selectedAccount.label }}
	onSelectedChange={(e) => {
		selectedAccount = accounts.find((account) => account.email === e?.value) || accounts[0];
	}}
>
	<Select.Trigger
		class={cn(
			"flex items-center gap-2 [&>span]:line-clamp-1 [&>span]:flex [&>span]:w-full [&>span]:items-center [&>span]:gap-1 [&>span]:truncate [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0",
			isCollapsed &&
				"flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>div>svg]:hidden [&>span]:w-auto"
		)}
		aria-label="Select account"
	>
		<span class="pointer-events-none">
			<svelte:component this={selectedAccount.icon} class={cn(isCollapsed ? "ml-2" : "")} />
			<span class={cn(isCollapsed ? "!ml-0 !hidden" : "ml-2")}>
				{selectedAccount.label}
			</span>
		</span>
	</Select.Trigger>
	<Select.Content sameWidth={!isCollapsed} align={isCollapsed ? "start" : undefined}>
		<Select.Group>
			{#each accounts as account}
				<Select.Item value={account.email} label={account.label}>
					<div
						class="[&_svg]:text-foreground flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0"
					>
						<svelte:component
							this={account.icon}
							aria-hidden="true"
							class="text-foreground size-4 shrink-0"
						/>
						{account.email}
					</div>
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input hidden name="account" />
</Select.Root>
