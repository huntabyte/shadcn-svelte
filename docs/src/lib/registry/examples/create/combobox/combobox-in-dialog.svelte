<script lang="ts">
	import { tick } from "svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { toast } from "svelte-sonner";
	import { cn } from "$lib/utils.js";

	const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;

	let dialogOpen = $state(false);
	let comboboxOpen = $state(false);
	let value = $state("");
	let triggerRef = $state<HTMLButtonElement>(null!);

	const selectedValue = $derived(value || null);

	function closeAndFocusTrigger() {
		comboboxOpen = false;
		tick().then(() => {
			triggerRef?.focus();
		});
	}
</script>

<Example title="Combobox in Dialog">
	<Dialog.Root bind:open={dialogOpen}>
		<Dialog.Trigger>
			{#snippet child({ props })}
				<Button variant="outline" {...props}>Open Dialog</Button>
			{/snippet}
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Select Framework</Dialog.Title>
				<Dialog.Description>
					Choose your preferred framework from the list below.
				</Dialog.Description>
			</Dialog.Header>
			<Field.Field>
				<Field.Label for="framework-dialog" class="sr-only">Framework</Field.Label>
				<Popover.Root bind:open={comboboxOpen}>
					<Popover.Trigger bind:ref={triggerRef}>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="outline"
								class="w-full justify-between font-normal"
								role="combobox"
								aria-expanded={comboboxOpen}
								type="button"
								id="framework-dialog"
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
					<Popover.Content class="w-(--bits-popover-anchor-width) p-0" align="start">
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
												class={cn(
													value !== framework && "text-transparent"
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
			</Field.Field>
			<Dialog.Footer>
				<Dialog.Close>
					{#snippet child({ props })}
						<Button variant="outline" {...props}>Cancel</Button>
					{/snippet}
				</Dialog.Close>
				<Button
					type="button"
					onclick={() => {
						toast("Framework selected.");
						dialogOpen = false;
					}}
				>
					Confirm
				</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</Example>
