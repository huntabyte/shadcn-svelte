<script lang="ts">
	import { createMenu } from "@grail-ui/svelte";
	import { ChevronDown } from "lucide-svelte";
	import { fade } from "svelte/transition";

	type SelectItem = {
		value: string;
		label: string;
	};

	const selectItems: SelectItem[] = [
		{
			value: "apple",
			label: "Apple"
		},
		{
			value: "banana",
			label: "Banana"
		},
		{
			value: "orange",
			label: "Orange"
		},
		{
			value: "strawberry",
			label: "Strawberry"
		},
		{
			value: "pineapple",
			label: "Pineapple"
		},
		{
			value: "coconut",
			label: "Coconut"
		},
		{
			value: "lemon",
			label: "Lemon"
		},
		{
			value: "lime",
			label: "Lime"
		}
	];

	let selected: string | null = null;
	let placeholder = "Choose an option";

	const { useTrigger, triggerAttrs, useMenu, menuAttrs, itemAttrs, open } =
		createMenu({
			onSelect(id) {
				$open = false;
				selected = id;
			}
		});

	function getSelectedValue(value: string) {
		const selectedItem = selectItems.find((item) => item.value === value);
		if (selectedItem) {
			return selectedItem.label;
		}
		return null;
	}
	let selectedLabel: string | null = null;

	$: if (selected) {
		selectedLabel = getSelectedValue(selected);
	}
</script>

<div class="relative">
	<button
		type="button"
		use:useTrigger
		{...$triggerAttrs}
		class="flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
	>
		<span>
			{selectedLabel ?? placeholder}
		</span>
		<span>
			<ChevronDown class="h-4 w-4 opacity-50" />
		</span>
	</button>

	{#if $open}
		<ul
			use:useMenu
			{...$menuAttrs}
			class="relative z-50 min-w-[8rem] rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 w-full overflow-auto translate-y-1"
		>
			<li
				class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
			>
				<span class="">Options</span>
			</li>
			{#each selectItems as item, index (index)}
				<li>
					<button
						class="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
						{...$itemAttrs({
							id: item.value,
							label: item.label
						})}
					>
						{item.label}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
