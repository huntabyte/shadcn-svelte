<script lang="ts">
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import CheckIcon from "@lucide/svelte/icons/check";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const frameworks = [
		{
			value: "next.js",
			label: "Next.js",
		},
		{
			value: "sveltekit",
			label: "SvelteKit",
		},
		{
			value: "nuxt.js",
			label: "Nuxt.js",
		},
		{
			value: "remix",
			label: "Remix",
		},
		{
			value: "astro",
			label: "Astro",
		},
	];

	type Framework = (typeof frameworks)[number];

	let open = $state(false);
	let selectedFrameworks = $state<Framework[]>([]);
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class="w-fit min-w-[280px] justify-between"
			>
				{selectedFrameworks.length > 0
					? selectedFrameworks.map((framework) => framework.label).join(", ")
					: "Select frameworks (multi-select)..."}
				<ChevronsUpDownIcon class="text-muted-foreground" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[300px] p-0" align="start">
		<Command.Root>
			<Command.Input placeholder="Search framework..." />
			<Command.List>
				<Command.Empty>No framework found.</Command.Empty>
				<Command.Group>
					{#each frameworks as framework (framework.value)}
						<Command.Item
							value={framework.value}
							onSelect={() => {
								selectedFrameworks = selectedFrameworks.some(
									(f) => f.value === framework.value
								)
									? selectedFrameworks.filter((f) => f.value !== framework.value)
									: [...selectedFrameworks, framework];
							}}
						>
							<div
								class="border-input data-[selected=true]:border-primary data-[selected=true]:bg-primary data-[selected=true]:text-primary-foreground *:[svg]:opacity-0 data-[selected=true]:*:[svg]:opacity-100 pointer-events-none size-4 shrink-0 select-none rounded-[4px] border transition-all"
								data-selected={selectedFrameworks.some(
									(f) => f.value === framework.value
								)}
							>
								<CheckIcon className="size-3.5 text-current" />
							</div>
							{framework.label}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
