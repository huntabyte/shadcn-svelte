<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Combobox from "$lib/registry/ui/combobox/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	type Status = {
		value: string;
		label: string;
	};

	const statuses: Status[] = [
		{
			value: "backlog",
			label: "Backlog",
		},
		{
			value: "todo",
			label: "Todo",
		},
		{
			value: "in progress",
			label: "In Progress",
		},
		{
			value: "done",
			label: "Done",
		},
		{
			value: "canceled",
			label: "Canceled",
		},
	] as const;

	let value = $state("");
	let open = $state(false);
	let triggerRef = $state<HTMLElement | null>(null);
	const selectedStatus = $derived(statuses.find((status) => status.value === value) ?? null);

	function handleValueChange(nextValue: string) {
		value = nextValue;
		open = false;
	}
</script>

<Example title="Popup">
	<div class="flex items-center space-x-4">
		<p class="text-muted-foreground text-sm">Status</p>
		<Combobox.Root bind:value bind:open onValueChange={handleValueChange}>
			<Combobox.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						bind:ref={triggerRef}
						variant="outline"
						class="w-[150px] justify-start"
					>
						{selectedStatus ? selectedStatus.label : "+ Set status"}
					</Button>
				{/snippet}
			</Combobox.Trigger>
			<Combobox.Content
				customAnchor={triggerRef}
				side="right"
				align="start"
				class="w-auto! min-w-0! p-0"
			>
				<Combobox.Input showTrigger={false} placeholder="Change status..." />
				<Combobox.Empty>No items found.</Combobox.Empty>
				<Combobox.List>
					{#each statuses as status (status.value)}
						<Combobox.Item value={status.value} label={status.label}>
							{status.label}
						</Combobox.Item>
					{/each}
				</Combobox.List>
			</Combobox.Content>
		</Combobox.Root>
	</div>
</Example>
