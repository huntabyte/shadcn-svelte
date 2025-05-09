<script lang="ts">
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import CheckIcon from "@lucide/svelte/icons/check";
	import PlusCircleIcon from "@lucide/svelte/icons/plus-circle";

	const timezones = [
		{
			label: "Americas",
			timezones: [
				{ value: "America/New_York", label: "(GMT-5) New York" },
				{ value: "America/Los_Angeles", label: "(GMT-8) Los Angeles" },
				{ value: "America/Chicago", label: "(GMT-6) Chicago" },
				{ value: "America/Toronto", label: "(GMT-5) Toronto" },
				{ value: "America/Vancouver", label: "(GMT-8) Vancouver" },
				{ value: "America/Sao_Paulo", label: "(GMT-3) São Paulo" },
			],
		},
		{
			label: "Europe",
			timezones: [
				{ value: "Europe/London", label: "(GMT+0) London" },
				{ value: "Europe/Paris", label: "(GMT+1) Paris" },
				{ value: "Europe/Berlin", label: "(GMT+1) Berlin" },
				{ value: "Europe/Rome", label: "(GMT+1) Rome" },
				{ value: "Europe/Madrid", label: "(GMT+1) Madrid" },
				{ value: "Europe/Amsterdam", label: "(GMT+1) Amsterdam" },
			],
		},
		{
			label: "Asia/Pacific",
			timezones: [
				{ value: "Asia/Tokyo", label: "(GMT+9) Tokyo" },
				{ value: "Asia/Shanghai", label: "(GMT+8) Shanghai" },
				{ value: "Asia/Singapore", label: "(GMT+8) Singapore" },
				{ value: "Asia/Dubai", label: "(GMT+4) Dubai" },
				{ value: "Australia/Sydney", label: "(GMT+11) Sydney" },
				{ value: "Asia/Seoul", label: "(GMT+9) Seoul" },
			],
		},
	] as const;

	let open = $state(false);
	let value = $state(timezones[0].timezones[0].value);

	const selectedGroup = $derived(
		timezones.find((group) => group.timezones.some((tz) => tz.value === value))
	);

	const selectedTimezoneLabel = $derived(
		selectedGroup?.timezones.find((tz) => tz.value === value)?.label
	);
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				class="h-12 w-full justify-between px-2.5 md:max-w-[200px]"
			>
				{#if value}
					<div class="flex flex-col items-start gap-0.5">
						<span class="text-muted-foreground text-xs font-normal">
							{selectedGroup?.label}
						</span>
						<span>{selectedTimezoneLabel}</span>
					</div>
				{:else}
					Select timezone
				{/if}
				<ChevronDownIcon class="text-muted-foreground" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="p-0" align="start">
		<Command.Root>
			<Command.Input placeholder="Search timezone..." />
			<Command.List class="scroll-pb-12">
				<Command.Empty>No timezone found.</Command.Empty>
				{#each timezones as region (region.label)}
					<Command.Group heading={region.label}>
						{#each region.timezones as timezone (timezone.value)}
							<Command.Item
								value={timezone.value}
								onSelect={() => {
									value = timezone.value as typeof value;
									open = false;
								}}
							>
								{timezone.label}
								<CheckIcon
									class="ml-auto opacity-0 data-[selected=true]:opacity-100"
									data-selected={value === timezone.value}
								/>
							</Command.Item>
						{/each}
					</Command.Group>
				{/each}
				<Command.Separator class="sticky bottom-10" />
				<Command.Group class="bg-popover sticky bottom-0">
					<Command.Item>
						<PlusCircleIcon />
						Create timezone
					</Command.Item>
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
