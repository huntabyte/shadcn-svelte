<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import { tick } from "svelte";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	const timezones = [
		{
			label: "Americas",
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
			label: "Europe",
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
			label: "Asia/Pacific",
			items: [
				"(GMT+9) Tokyo",
				"(GMT+8) Shanghai",
				"(GMT+8) Singapore",
				"(GMT+4) Dubai",
				"(GMT+11) Sydney",
				"(GMT+9) Seoul",
			],
		},
	];

	let open = $state(false);
	let value = $state("");
	let triggerRef = $state<HTMLButtonElement>(null!);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<Popover.Root bind:open>
	<InputGroup.Root class="w-60">
		<InputGroup.Addon>
			<GlobeIcon />
		</InputGroup.Addon>
		<Popover.Trigger bind:ref={triggerRef} class="flex-1">
			{#snippet child({ props })}
				<Button
					{...props}
					variant="outline"
					class="w-full justify-between rounded-s-none border-s-0 font-normal"
					role="combobox"
					aria-expanded={open}
				>
					{value || "Select a timezone"}
					<ChevronsUpDownIcon class="opacity-50" />
				</Button>
			{/snippet}
		</Popover.Trigger>
	</InputGroup.Root>
	<Popover.Content class="w-60 p-0">
		<Command.Root>
			<Command.Input placeholder="Search timezone..." />
			<Command.List>
				<Command.Empty>No timezones found.</Command.Empty>
				{#each timezones as group, i (group.label)}
					<Command.Group heading={group.label}>
						{#each group.items as item (item)}
							<Command.Item
								value={item}
								onSelect={() => {
									value = item;
									closeAndFocusTrigger();
								}}
							>
								<CheckIcon class={cn(value !== item && "text-transparent")} />
								{item}
							</Command.Item>
						{/each}
					</Command.Group>
					{#if i < timezones.length - 1}
						<Command.Separator />
					{/if}
				{/each}
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
