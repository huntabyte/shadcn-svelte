<script lang="ts">
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import CheckIcon from "@lucide/svelte/icons/check";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils";

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

	let open = $state(false);
	let value = $state("");
</script>

<Popover.Root bind:open>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class="w-full justify-between md:max-w-[200px]"
			>
				{value
					? frameworks.find((framework) => framework.value === value)?.label
					: "Select framework..."}
				<ChevronsUpDownIcon class="text-muted-foreground" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-(--radix-popover-trigger-width) p-0">
		<Command.Root>
			<Command.Input placeholder="Search framework..." />
			<Command.List>
				<Command.Empty>No framework found.</Command.Empty>
				<Command.Group>
					{#each frameworks as framework (framework.value)}
						<Command.Item
							value={framework.value}
							onSelect={() => {
								value = value === framework.value ? "" : framework.value;
								open = false;
							}}
						>
							{framework.label}
							<CheckIcon
								class={cn(
									"ml-auto",
									value === framework.value ? "opacity-100" : "opacity-0"
								)}
							/>
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
