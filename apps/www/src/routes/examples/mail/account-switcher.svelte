<script lang="ts">
	import * as Select from "@/registry/default/ui/select";
	import { cn } from "@/utils";
	import type { Account } from "./data";

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
				"flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
		)}
		aria-label="Select account"
	>
		<svelte:component
			this={accounts.find((account) => account.email === selectedAccount.email)?.icon}
			aria-hidden="true"
			class={cn("size-4 shrink-0", "hidden" && isCollapsed)}
		/>
		<Select.Value
			placeholder="Select an Account"
			class={cn("ml-2 line-clamp-1 flex w-full items-center gap-1 truncate", {
				"hidden w-auto": isCollapsed,
			})}
		/>
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each accounts as account}
				<Select.Item value={account.email} label={account.label}>
					<div
						class="flex items-center gap-3 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:text-foreground"
					>
						<svelte:component this={account.icon} aria-hidden="true" />
						{account.email}
					</div>
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="account" />
</Select.Root>
