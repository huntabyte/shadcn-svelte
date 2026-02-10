<script lang="ts">
	import { tick } from "svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";

	const frameworks = [
		{ value: "Next.js", disabled: false },
		{ value: "SvelteKit", disabled: false },
		{ value: "Nuxt.js", disabled: true },
		{ value: "Remix", disabled: true },
		{ value: "Astro", disabled: false },
	];

	let open = $state(false);
	let value = $state("");
	let triggerRef = $state<HTMLButtonElement>(null!);

	const selectedValue = $derived(value || null);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef?.focus();
		});
	}
</script>

<Example title="Disabled Items">
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
					{selectedValue ?? "Select a framework"}
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
				<Command.Input placeholder="Search framework..." />
				<Command.List>
					<Command.Empty>No items found.</Command.Empty>
					<Command.Group value="frameworks">
						{#each frameworks as framework (framework.value)}
							<Command.Item
								value={framework.value}
								disabled={framework.disabled}
								onSelect={() => {
									if (!framework.disabled) {
										value = framework.value;
										closeAndFocusTrigger();
									}
								}}
								class="aria-disabled:text-muted-foreground"
							>
								<IconPlaceholder
									lucide="CheckIcon"
									tabler="IconCheck"
									hugeicons="Tick02Icon"
									phosphor="CheckIcon"
									remixicon="RiCheckLine"
									class={cn(value !== framework.value && "text-transparent")}
								/>
								{framework.value}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</Example>
