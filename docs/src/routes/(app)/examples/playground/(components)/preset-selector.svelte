<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import { tick } from "svelte";
	import { useId } from "bits-ui";
	import type { Preset } from "../(data)/presets.js";
	import { cn } from "$lib/utils.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";

	let { presets }: { presets: Preset[] } = $props();

	let open = $state(false);

	let value = $state("");

	const selectedValue = $derived(
		presets.find((f) => f.name === value)?.name ?? "Load a preset..."
	);

	let triggerId = useId();

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

<Popover.Root bind:open>
	<Popover.Trigger
		class={buttonVariants({
			variant: "outline",
			class: "flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]",
		})}
		role="combobox"
		aria-expanded={open}
		id={triggerId}
	>
		{selectedValue}
		<ChevronsUpDownIcon class="opacity-50" />
	</Popover.Trigger>
	<Popover.Content class="w-full p-0 md:w-[200px] lg:w-[300px]">
		<Command.Root>
			<Command.Input placeholder="Search presets..." />
			<Command.List>
				<Command.Empty>No presets found.</Command.Empty>
				<Command.Group heading="Examples">
					{#each presets as preset (preset)}
						<Command.Item
							value={preset.name}
							class="aria-selected:bg-primary aria-selected:text-primary-foreground"
							onSelect={() => {
								value = preset.name;
								closeAndFocusTrigger(triggerId);
							}}
						>
							{preset.name}
							<CheckIcon
								class={cn(value === preset.name ? "opacity-100" : "opacity-0")}
							/>
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
