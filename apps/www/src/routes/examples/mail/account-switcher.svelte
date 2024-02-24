<script lang="ts">
	import * as Select from "@/registry/new-york/ui/select";
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
		class={cn("flex w-full items-center gap-2", {
			"size-9 shrink-0 items-center [&>div>svg]:hidden": isCollapsed,
		})}
		aria-label="Select account"
	>
		<svelte:component
			this={accounts.find((account) => account.email === selectedAccount.email)?.icon}
			aria-hidden="true"
			class={cn("size-4 shrink-0")}
		/>
		<Select.Value
			placeholder="Select an Account"
			class={cn("ml-2 line-clamp-1 flex w-full items-center gap-1 truncate text-left", {
				"hidden w-auto": isCollapsed,
			})}
		/>
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			{#each accounts as account}
				<Select.Item
					value={account.email}
					label={account.label}
					class={cn("flex items-center gap-3", { "[&>span]:hidden": isCollapsed })}
				>
					<svelte:component
						this={account.icon}
						aria-hidden="true"
						class="size-4 shrink-0 text-foreground"
					/>
					{account.email}
				</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input hidden name="account" />
</Select.Root>
