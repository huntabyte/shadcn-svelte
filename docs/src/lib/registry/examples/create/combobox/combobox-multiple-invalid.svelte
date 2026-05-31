<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";

	const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;

	let open = $state(false);
	let openInvalid = $state(false);
	let values = $state<string[]>([frameworks[0], frameworks[1]]);
	let valuesInvalid = $state<string[]>([frameworks[0], frameworks[1], frameworks[2]]);

	function toggleValue(framework: (typeof frameworks)[number], target: "default" | "invalid") {
		const current = target === "default" ? values : valuesInvalid;
		const setter =
			target === "default"
				? (v: string[]) => (values = v)
				: (v: string[]) => (valuesInvalid = v);
		setter(
			current.includes(framework)
				? current.filter((v) => v !== framework)
				: [...current, framework]
		);
	}

	function removeValue(e: MouseEvent, framework: string, target: "default" | "invalid") {
		e.stopPropagation();
		if (target === "default") {
			values = values.filter((v) => v !== framework);
		} else {
			valuesInvalid = valuesInvalid.filter((v) => v !== framework);
		}
	}
</script>

<Example title="Combobox Multiple Invalid">
	<div class="flex flex-col gap-4">
		<Popover.Root bind:open>
			<Popover.Trigger>
				{#snippet child({ props })}
					<div
						{...props}
						role="combobox"
						aria-expanded={open}
						aria-invalid={true}
						class="border-input bg-background aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex min-h-9 w-64 cursor-pointer flex-wrap items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm shadow-xs transition-colors focus-within:ring-[3px] focus-within:ring-offset-2 aria-invalid:ring-[3px]"
					>
						{#each values as framework (framework)}
							<Badge
								variant="secondary"
								class="gap-1 pr-0.5"
								onclick={(e) => removeValue(e, framework, "default")}
							>
								{framework}
								<IconPlaceholder
									lucide="XIcon"
									tabler="IconX"
									hugeicons="Cancel01Icon"
									phosphor="XIcon"
									remixicon="RiCloseLine"
									class="size-3"
								/>
							</Badge>
						{/each}
					</div>
				{/snippet}
			</Popover.Trigger>
			<Popover.Content class="w-64 p-0" align="start">
				<Command.Root>
					<Command.Input placeholder="Search framework..." />
					<Command.List>
						<Command.Empty>No items found.</Command.Empty>
						<Command.Group value="frameworks">
							{#each frameworks as framework (framework)}
								<Command.Item
									value={framework}
									onSelect={() => toggleValue(framework, "default")}
								>
									<IconPlaceholder
										lucide="CheckIcon"
										tabler="IconCheck"
										hugeicons="Tick02Icon"
										phosphor="CheckIcon"
										remixicon="RiCheckLine"
										class={cn(
											!values.includes(framework) && "text-transparent"
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
		<Field.Field data-invalid>
			<Field.Label for="combobox-multiple-invalid">Frameworks</Field.Label>
			<Popover.Root bind:open={openInvalid}>
				<Popover.Trigger>
					{#snippet child({ props })}
						<div
							{...props}
							role="combobox"
							aria-expanded={openInvalid}
							aria-invalid={true}
							id="combobox-multiple-invalid"
							class="border-input bg-background aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 flex min-h-9 w-64 cursor-pointer flex-wrap items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm shadow-xs transition-colors focus-within:ring-[3px] focus-within:ring-offset-2 aria-invalid:ring-[3px]"
						>
							{#each valuesInvalid as framework (framework)}
								<Badge
									variant="secondary"
									class="gap-1 pr-0.5"
									onclick={(e) => removeValue(e, framework, "invalid")}
								>
									{framework}
									<IconPlaceholder
										lucide="XIcon"
										tabler="IconX"
										hugeicons="Cancel01Icon"
										phosphor="XIcon"
										remixicon="RiCloseLine"
										class="size-3"
									/>
								</Badge>
							{/each}
						</div>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content class="w-64 p-0" align="start">
					<Command.Root>
						<Command.Input placeholder="Search framework..." />
						<Command.List>
							<Command.Empty>No items found.</Command.Empty>
							<Command.Group value="frameworks">
								{#each frameworks as framework (framework)}
									<Command.Item
										value={framework}
										onSelect={() => toggleValue(framework, "invalid")}
									>
										<IconPlaceholder
											lucide="CheckIcon"
											tabler="IconCheck"
											hugeicons="Tick02Icon"
											phosphor="CheckIcon"
											remixicon="RiCheckLine"
											class={cn(
												!valuesInvalid.includes(framework) &&
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
			<Field.Description>Please select at least one framework.</Field.Description>
			<Field.Error errors={[{ message: "This field is required." }]} />
		</Field.Field>
	</div>
</Example>
