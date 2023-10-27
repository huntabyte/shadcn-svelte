<script lang="ts">
	import { Check, ChevronsUpDown } from "lucide-svelte";
	import * as Command from "@/registry/default/ui/command";
	import * as Popover from "@/registry/default/ui/popover";
	import { Button } from "@/registry/default/ui/button";
	import { cn } from "$lib/utils";

	const frameworks = [
		{
			value: "sveltekit",
			label: "SvelteKit"
		},
		{
			value: "next.js",
			label: "Next.js"
		},
		{
			value: "nuxt.js",
			label: "Nuxt.js"
		},
		{
			value: "remix",
			label: "Remix"
		},
		{
			value: "astro",
			label: "Astro"
		}
	];

	let open = false;
	let value = "";

	$: selectedValue =
		frameworks.find((f) => f.value === value)?.label ??
		"Select a framework...";
</script>

<Popover.Root bind:open focusTriggerOnClose={true}>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			role="combobox"
			aria-expanded={open}
			class="w-[200px] justify-between"
		>
			{selectedValue}
			<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search framework..." />
			<Command.Empty>No framework found.</Command.Empty>
			<Command.Group>
				{#each frameworks as framework}
					<Command.Item
						value={framework.value}
						onSelect={(currentValue) => {
							value = currentValue;
							open = false;
						}}
					>
						<Check
							class={cn(
								"mr-2 h-4 w-4",
								value !== framework.value && "text-transparent"
							)}
						/>
						{framework.label}
					</Command.Item>
				{/each}
			</Command.Group>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
