<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import { tick } from "svelte";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const countries = [
		{ code: "", value: "", continent: "", label: "Select country" },
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
	let value = $state(countries[0].label);
	let triggerRef = $state<HTMLButtonElement>(null!);

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
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
				class="w-64 justify-between font-normal"
				role="combobox"
				aria-expanded={open}
			>
				{value}
				<ChevronDownIcon class="text-muted-foreground" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-64 p-0">
		<Command.Root>
			<Command.Input placeholder="Search" />
			<Command.List>
				<Command.Empty>No items found.</Command.Empty>
				<Command.Group>
					{#each countries as country (country.code)}
						<Command.Item
							value={country.label}
							data-checked={value === country.label}
							onSelect={() => {
								value = country.label;
								closeAndFocusTrigger();
							}}
						>
							{country.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
