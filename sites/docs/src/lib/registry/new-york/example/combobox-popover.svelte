<script lang="ts">
	import { tick } from "svelte";
	import * as Command from "$lib/registry/new-york/ui/command/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";

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
	];

	let open = false;
	let value = "";

	$: selectedStatus = statuses.find((s) => s.value === value) ?? null;

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<div class="flex items-center space-x-4">
	<p class="text-muted-foreground text-sm">Status</p>
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button builders={[builder]} variant="outline" class="w-[150px] justify-start">
				{selectedStatus ? selectedStatus.label : "+ Set status"}
			</Button>
		</Popover.Trigger>
		<Popover.Content class="p-0" align="start" side="right">
			<Command.Root>
				<Command.Input placeholder="Change status..." />
				<Command.List>
					<Command.Empty>No results found.</Command.Empty>
					<Command.Group>
						{#each statuses as status}
							<Command.Item
								value={status.value}
								onSelect={(currentValue) => {
									value = currentValue;
									closeAndFocusTrigger(ids.trigger);
								}}
							>
								{status.label}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</div>
