<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { DateFormatter, getLocalTimeZone, type DateValue } from "@internationalized/date";
	import { SvelteSet } from "svelte/reactivity";

	const environments = [
		"All Environments",
		"Production",
		"Preview",
		"Development",
		"Staging",
		"Test",
		"Other",
	];

	const statuses = [
		{ name: "Ready", color: "oklch(0.72 0.19 150)" },
		{ name: "Error", color: "oklch(0.64 0.21 25)" },
		{ name: "Building", color: "oklch(0.77 0.16 70)" },
		{ name: "Queued", color: "oklch(0.72 0.00 0)" },
		{ name: "Provisioning", color: "oklch(0.72 0.00 0)" },
		{ name: "Canceled", color: "oklch(0.72 0.00 0)" },
	];

	const dateFormatter = new DateFormatter("en-US", {
		month: "short",
		day: "2-digit",
		year: "numeric",
	});

	let selectedEnvironment = $state(environments[0]);
	let selectedStatuses = $state<Set<string>>(new Set(statuses.slice(0, 5).map((s) => s.name)));
	let dateRange = $state<DateValue[] | undefined>(undefined);

	function toggleStatus(statusName: string) {
		const next = new SvelteSet(selectedStatuses);
		if (next.has(statusName)) {
			next.delete(statusName);
		} else {
			next.add(statusName);
		}
		selectedStatuses = next;
	}
</script>

<Example title="Deployment Filter" containerClass="col-span-full">
	<div class="flex w-full flex-wrap items-center gap-2 *:w-full lg:*:w-auto">
		<Popover.Root>
			<Popover.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" class="justify-start" {...props}>
						<IconPlaceholder
							lucide="CalendarIcon"
							tabler="IconCalendar"
							hugeicons="Calendar01Icon"
							phosphor="CalendarIcon"
							remixicon="RiCalendarLine"
							data-icon="inline-start"
							class="text-muted-foreground"
						/>
						{#if dateRange?.[0]}
							{#if dateRange[1]}
								{dateFormatter.format(dateRange[0].toDate(getLocalTimeZone()))}
								-
								{dateFormatter.format(dateRange[1].toDate(getLocalTimeZone()))}
							{:else}
								{dateFormatter.format(dateRange[0].toDate(getLocalTimeZone()))}
							{/if}
						{:else}
							Select Date Range
						{/if}
					</Button>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-auto p-0" align="start">
				<Calendar type="multiple" bind:value={dateRange} numberOfMonths={2} />
			</Popover.Content>
		</Popover.Root>
		<InputGroup.Root class="lg:ml-auto lg:max-w-72">
			<InputGroup.Addon>
				<IconPlaceholder
					lucide="Search"
					tabler="IconSearch"
					hugeicons="Search01Icon"
					phosphor="MagnifyingGlassIcon"
					remixicon="RiSearchLine"
				/>
			</InputGroup.Addon>
			<InputGroup.Input placeholder="All Authors..." />
			<InputGroup.Addon align="inline-end">
				<IconPlaceholder
					lucide="ChevronDownIcon"
					tabler="IconChevronDown"
					hugeicons="ArrowDown01Icon"
					phosphor="CaretDownIcon"
					remixicon="RiArrowDownSLine"
					class="text-muted-foreground"
				/>
			</InputGroup.Addon>
		</InputGroup.Root>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" class="justify-between" {...props}>
						{selectedEnvironment}
						<IconPlaceholder
							lucide="ChevronDownIcon"
							tabler="IconChevronDown"
							hugeicons="ArrowDown01Icon"
							phosphor="CaretDownIcon"
							remixicon="RiArrowDownSLine"
							data-icon="inline-end"
							class="text-muted-foreground"
						/>
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56" align="end">
				{#each environments as environment (environment)}
					<DropdownMenu.Item
						onSelect={() => (selectedEnvironment = environment)}
						data-active={selectedEnvironment === environment}
					>
						{environment}
						<IconPlaceholder
							lucide="CheckIcon"
							tabler="IconCheck"
							hugeicons="Tick02Icon"
							phosphor="CheckIcon"
							remixicon="RiCheckLine"
							class="ml-auto opacity-0 group-data-[active=true]/dropdown-menu-item:opacity-100"
						/>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button variant="outline" class="justify-between" {...props}>
						<div class="flex items-center -space-x-0.5">
							{#each statuses as status (status.name)}
								<div
									style="--color: {status.color};"
									class="size-2.5 shrink-0 rounded-full border grayscale transition-all data-[active=true]:border-(--color) data-[active=true]:bg-(--color) data-[active=true]:grayscale-0"
									data-active={selectedStatuses.has(status.name)}
								></div>
							{/each}
						</div>
						Status {selectedStatuses.size}/{statuses.length}
						<IconPlaceholder
							lucide="ChevronDownIcon"
							tabler="IconChevronDown"
							hugeicons="ArrowDown01Icon"
							phosphor="CaretDownIcon"
							remixicon="RiArrowDownSLine"
							data-icon="inline-end"
							class="text-muted-foreground ml-auto"
						/>
					</Button>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content class="w-56" align="end">
				{#each statuses as status (status.name)}
					{@const isSelected = selectedStatuses.has(status.name)}
					<DropdownMenu.Item
						onSelect={() => toggleStatus(status.name)}
						data-active={isSelected}
						style="--color: {status.color};"
					>
						<div class="flex items-center gap-2">
							<div class="size-2 rounded-full bg-(--color)"></div>
							{status.name}
						</div>
						<IconPlaceholder
							lucide="CheckIcon"
							tabler="IconCheck"
							hugeicons="Tick02Icon"
							phosphor="CheckIcon"
							remixicon="RiCheckLine"
							class="ml-auto opacity-0 group-data-[active=true]/dropdown-menu-item:opacity-100"
						/>
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</Example>
