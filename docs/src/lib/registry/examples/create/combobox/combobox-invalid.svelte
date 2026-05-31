<script lang="ts">
	import { tick } from "svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";

	const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;

	let open = $state(false);
	let value = $state("");
	let openInvalid = $state(false);
	let valueInvalid = $state("");
	let triggerRef = $state<HTMLButtonElement>(null!);
	let triggerRefInvalid = $state<HTMLButtonElement>(null!);

	const selectedValue = $derived(value || null);
	const selectedValueInvalid = $derived(valueInvalid || null);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef?.focus();
		});
	}

	function closeAndFocusTriggerInvalid() {
		openInvalid = false;
		tick().then(() => {
			triggerRefInvalid?.focus();
		});
	}
</script>

<Example title="Invalid">
	<div class="flex flex-col gap-4">
		<Popover.Root bind:open>
			<Popover.Trigger bind:ref={triggerRef}>
				{#snippet child({ props })}
					<Button
						{...props}
						variant="outline"
						class="w-[200px] justify-between font-normal"
						role="combobox"
						aria-expanded={open}
						aria-invalid="true"
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
							{#each frameworks as framework (framework)}
								<Command.Item
									value={framework}
									onSelect={() => {
										value = framework;
										closeAndFocusTrigger();
									}}
								>
									<IconPlaceholder
										lucide="CheckIcon"
										tabler="IconCheck"
										hugeicons="Tick02Icon"
										phosphor="CheckIcon"
										remixicon="RiCheckLine"
										class={cn(value !== framework && "text-transparent")}
									/>
									{framework}
								</Command.Item>
							{/each}
						</Command.Group>
					</Command.List>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
		<Field.Field data-invalid>
			<Field.Label for="combobox-framework-invalid">Framework</Field.Label>
			<Popover.Root bind:open={openInvalid}>
				<Popover.Trigger bind:ref={triggerRefInvalid}>
					{#snippet child({ props })}
						<Button
							{...props}
							variant="outline"
							class="w-[200px] justify-between font-normal"
							role="combobox"
							aria-expanded={openInvalid}
							aria-invalid
							id="combobox-framework-invalid"
						>
							{selectedValueInvalid ?? "Select a framework"}
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
								{#each frameworks as framework (framework)}
									<Command.Item
										value={framework}
										onSelect={() => {
											valueInvalid = framework;
											closeAndFocusTriggerInvalid();
										}}
									>
										<IconPlaceholder
											lucide="CheckIcon"
											tabler="IconCheck"
											hugeicons="Tick02Icon"
											phosphor="CheckIcon"
											remixicon="RiCheckLine"
											class={cn(
												valueInvalid !== framework && "text-transparent"
											)}
										/>
										{framework}
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.List>
					</Command.Root>
				</Popover.Content>
			</Popover.Root>
			<Field.Description>Please select a valid framework.</Field.Description>
			<Field.Error errors={[{ message: "This field is required." }]} />
		</Field.Field>
	</div>
</Example>
