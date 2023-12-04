<script lang="ts">
	import {
		ArrowUpCircle,
		CheckCircle2,
		Circle,
		HelpCircle,
		XCircle
	} from "lucide-svelte";
	import * as Command from "@/registry/default/ui/command";
	import * as Popover from "@/registry/default/ui/popover";
	import { Button } from "@/registry/default/ui/button";
	import { cn } from "$lib/utils";
	import { tick, type ComponentType } from "svelte";

	type Status = {
		value: string;
		label: string;
		icon: ComponentType;
	};

	const statuses: Status[] = [
		{
			value: "backlog",
			label: "Backlog",
			icon: HelpCircle
		},
		{
			value: "todo",
			label: "Todo",
			icon: Circle
		},
		{
			value: "in progress",
			label: "In Progress",
			icon: ArrowUpCircle
		},
		{
			value: "done",
			label: "Done",
			icon: CheckCircle2
		},
		{
			value: "canceled",
			label: "Canceled",
			icon: XCircle
		}
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
	<p class="text-sm text-muted-foreground">Status</p>
	<Popover.Root bind:open let:ids>
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				size="sm"
				class="w-[150px] justify-start"
			>
				{#if selectedStatus}
					<svelte:component
						this={selectedStatus.icon}
						class="mr-2 h-4 w-4 shrink-0"
					/>
					{selectedStatus.label}
				{:else}
					+ Set status
				{/if}
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-[200px] p-0" side="right" align="start">
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
								<svelte:component
									this={status.icon}
									class={cn(
										"mr-2 h-4 w-4",
										status.value !==
											selectedStatus?.value &&
											"text-foreground/40"
									)}
								/>

								<span>
									{status.label}
								</span>
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</div>
