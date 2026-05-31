<script lang="ts">
	import { tick } from "svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";

	const timezones = [
		{
			value: "Americas",
			items: [
				"(GMT-5) New York",
				"(GMT-8) Los Angeles",
				"(GMT-6) Chicago",
				"(GMT-5) Toronto",
				"(GMT-8) Vancouver",
				"(GMT-3) São Paulo",
			],
		},
		{
			value: "Europe",
			items: [
				"(GMT+0) London",
				"(GMT+1) Paris",
				"(GMT+1) Berlin",
				"(GMT+1) Rome",
				"(GMT+1) Madrid",
				"(GMT+1) Amsterdam",
			],
		},
		{
			value: "Asia/Pacific",
			items: [
				"(GMT+9) Tokyo",
				"(GMT+8) Shanghai",
				"(GMT+8) Singapore",
				"(GMT+4) Dubai",
				"(GMT+11) Sydney",
				"(GMT+9) Seoul",
			],
		},
	] as const;

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

<Example title="With Groups">
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
					{value || "Select a timezone"}
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
		<Popover.Content class="w-[200px] p-0" align="start">
			<Command.Root>
				<Command.Input placeholder="Search timezone..." />
				<Command.List>
					<Command.Empty>No timezones found.</Command.Empty>
					{#each timezones as group (group.value)}
						<Command.Group heading={group.value} value={group.value}>
							{#each group.items as item (item)}
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
					{/each}
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</Example>
