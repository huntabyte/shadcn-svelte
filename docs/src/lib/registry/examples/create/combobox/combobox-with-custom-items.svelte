<script lang="ts">
	import { tick } from "svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";

	const countries = [
		{ code: "us", value: "united-states", label: "United States", continent: "North America" },
		{ code: "gb", value: "united-kingdom", label: "United Kingdom", continent: "Europe" },
		{ code: "ca", value: "canada", label: "Canada", continent: "North America" },
		{ code: "au", value: "australia", label: "Australia", continent: "Oceania" },
		{ code: "de", value: "germany", label: "Germany", continent: "Europe" },
		{ code: "fr", value: "france", label: "France", continent: "Europe" },
		{ code: "jp", value: "japan", label: "Japan", continent: "Asia" },
		{ code: "cn", value: "china", label: "China", continent: "Asia" },
		{ code: "br", value: "brazil", label: "Brazil", continent: "South America" },
		{ code: "in", value: "india", label: "India", continent: "Asia" },
	];

	let open = $state(false);
	let value = $state<(typeof countries)[0] | null>(null);
	let triggerRef = $state<HTMLButtonElement>(null!);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef?.focus();
		});
	}
</script>

<Example title="With Custom Item Rendering">
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
					{value?.label ?? "Search countries..."}
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
		<Popover.Content class="w-[280px] p-0" align="start">
			<Command.Root>
				<Command.Input placeholder="Search countries..." />
				<Command.List>
					<Command.Empty>No countries found.</Command.Empty>
					<Command.Group value="countries">
						{#each countries as country (country.code)}
							<Command.Item
								value={country.label}
								onSelect={() => {
									value = country;
									closeAndFocusTrigger();
								}}
							>
								<IconPlaceholder
									lucide="CheckIcon"
									tabler="IconCheck"
									hugeicons="Tick02Icon"
									phosphor="CheckIcon"
									remixicon="RiCheckLine"
									class={cn(value?.code !== country.code && "text-transparent")}
								/>
								<Item.Root size="xs" class="p-0">
									<Item.Content>
										<Item.Title class="whitespace-nowrap"
											>{country.label}</Item.Title
										>
										<Item.Description>
											{country.continent} ({country.code})
										</Item.Description>
									</Item.Content>
								</Item.Root>
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</Example>
