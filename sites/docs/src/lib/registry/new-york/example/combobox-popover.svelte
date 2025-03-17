<script lang="ts">
	import { tick } from "svelte";
	import { useId } from "bits-ui";
	import * as Command from "$lib/registry/new-york/ui/command/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";

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

	let open = $state(false);
	let value = $state("");

	const selectedStatus = $derived(statuses.find((s) => s.value === value) ?? null);

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	const triggerId = useId();
</script>

<div class="flex items-center space-x-4">
	<p class="text-muted-foreground text-sm">Status</p>
	<Popover.Root bind:open>
		<Popover.Trigger
			class={buttonVariants({ variant: "outline", class: "w-[150px] justify-start" })}
			id={triggerId}
		>
			{selectedStatus ? selectedStatus.label : "+ Set status"}
		</Popover.Trigger>
		<Popover.Content class="p-0" align="start" side="right">
			<Command.Root>
				<Command.Input placeholder="Change status..." />
				<Command.List>
					<Command.Empty>No results found.</Command.Empty>
					<Command.Group>
						{#each statuses as status (status.value)}
							<Command.Item
								value={status.value}
								onSelect={() => {
									value = status.value;
									closeAndFocusTrigger(triggerId);
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
