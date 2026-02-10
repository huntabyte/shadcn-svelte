<script lang="ts">
	import { tick } from "svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { toast } from "svelte-sonner";
	import { cn } from "$lib/utils.js";

	const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;

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

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const framework = formData.get("framework") as string;
		toast(`You selected ${framework} as your framework.`);
	}
</script>

<Example title="Form with Combobox">
	<Card.Root class="w-full max-w-sm" size="sm">
		<Card.Content>
			<form id="form-with-combobox" class="w-full" onsubmit={handleSubmit}>
				<Field.Group>
					<Field.Field>
						<Field.Label for="framework">Framework</Field.Label>
						<div class="relative">
							<input type="hidden" name="framework" {value} />
							<Popover.Root bind:open>
								<Popover.Trigger bind:ref={triggerRef}>
									{#snippet child({ props })}
										<Button
											{...props}
											variant="outline"
											class="w-full justify-between font-normal"
											role="combobox"
											aria-expanded={open}
											type="button"
											aria-describedby={undefined}
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
															class={cn(
																value !== framework &&
																	"text-transparent"
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
						</div>
					</Field.Field>
				</Field.Group>
			</form>
		</Card.Content>
		<Card.Footer>
			<Button type="submit" form="form-with-combobox">Submit</Button>
		</Card.Footer>
	</Card.Root>
</Example>
