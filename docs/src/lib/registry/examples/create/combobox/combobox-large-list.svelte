<script lang="ts">
	import { tick } from "svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";

	const largeListItems = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);

	let open = $state(false);
	let value = $state("");
	let triggerRef = $state<HTMLButtonElement>(null!);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef?.focus();
		});
	}
</script>

<Example title="Large List (100 items)">
	<Popover.Root bind:open>
		<Popover.Trigger bind:ref={triggerRef}>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="outline"
					class="w-[200px] justify-between font-normal"
					role="combobox"
					aria-expanded={open}
				>
					{value || "Search from 100 items"}
					<IconPlaceholder
						lucide="ChevronDownIcon"
						tabler="IconChevronDown"
						hugeicons="ArrowDown01Icon"
						phosphor="CaretDownIcon"
						remixicon="RiArrowDownSLine"
						class="text-muted-foreground size-4 opacity-50"
					/>
				</Button>
			{/snippet}
		</Popover.Trigger>
		<Popover.Content class="max-h-72 w-[200px] p-0" align="start">
			<Command.Root>
				<Command.Input placeholder="Search..." />
				<Command.List>
					<Command.Empty>No items found.</Command.Empty>
					<Command.Group value="items">
						{#each largeListItems as item (item)}
							<Command.Item
								value={item}
								onSelect={() => {
									value = item;
									closeAndFocusTrigger();
								}}
							>
								<IconPlaceholder
									lucide="CheckIcon"
									tabler="IconCheck"
									hugeicons="Tick02Icon"
									phosphor="CheckIcon"
									remixicon="RiCheckLine"
									class={cn(value !== item && "text-transparent")}
								/>
								{item}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</Example>
