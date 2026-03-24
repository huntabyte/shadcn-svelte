<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import { tick } from "svelte";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Item from "$lib/registry/ui/item/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	type Country = {
		code: string;
		value: string;
		label: string;
		continent: string;
	};

	const countries: Country[] = [
		{ code: "ar", value: "argentina", label: "Argentina", continent: "South America" },
		{ code: "au", value: "australia", label: "Australia", continent: "Oceania" },
		{ code: "br", value: "brazil", label: "Brazil", continent: "South America" },
		{ code: "ca", value: "canada", label: "Canada", continent: "North America" },
		{ code: "cn", value: "china", label: "China", continent: "Asia" },
		{ code: "co", value: "colombia", label: "Colombia", continent: "South America" },
		{ code: "eg", value: "egypt", label: "Egypt", continent: "Africa" },
		{ code: "fr", value: "france", label: "France", continent: "Europe" },
		{ code: "de", value: "germany", label: "Germany", continent: "Europe" },
		{ code: "it", value: "italy", label: "Italy", continent: "Europe" },
		{ code: "jp", value: "japan", label: "Japan", continent: "Asia" },
		{ code: "ke", value: "kenya", label: "Kenya", continent: "Africa" },
		{ code: "mx", value: "mexico", label: "Mexico", continent: "North America" },
		{ code: "nz", value: "new-zealand", label: "New Zealand", continent: "Oceania" },
		{ code: "ng", value: "nigeria", label: "Nigeria", continent: "Africa" },
		{ code: "za", value: "south-africa", label: "South Africa", continent: "Africa" },
		{ code: "kr", value: "south-korea", label: "South Korea", continent: "Asia" },
		{ code: "gb", value: "united-kingdom", label: "United Kingdom", continent: "Europe" },
		{ code: "us", value: "united-states", label: "United States", continent: "North America" },
	];

	let open = $state(false);
	let selectedCountry = $state<Country | null>(null);
	let triggerRef = $state<HTMLButtonElement>(null!);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				class="w-[220px] justify-between font-normal"
				role="combobox"
				aria-expanded={open}
			>
				{selectedCountry ? selectedCountry.label : "Search countries..."}
				<ChevronsUpDownIcon class="opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[220px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search countries..." />
			<Command.List>
				<Command.Empty>No countries found.</Command.Empty>
				<Command.Group>
					{#each countries as country (country.code)}
						<Command.Item
							value={country.label}
							onSelect={() => {
								selectedCountry = country;
								closeAndFocusTrigger();
							}}
						>
							<CheckIcon
								class={cn(
									selectedCountry?.code !== country.code && "text-transparent"
								)}
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
