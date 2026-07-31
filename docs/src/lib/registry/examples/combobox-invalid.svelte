<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import { tick } from "svelte";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

	let open = $state(false);
	let value = $state("");
	let triggerRef = $state<HTMLButtonElement>(null!);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				class="w-[200px] justify-between border-destructive text-destructive hover:border-destructive hover:text-destructive aria-expanded:border-destructive aria-expanded:text-destructive"
				role="combobox"
				aria-expanded={open}
				aria-invalid="true"
			>
				{value || "Select a framework"}
				<ChevronsUpDownIcon class="opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder="Search framework..." />
			<Command.List>
				<Command.Empty>No items found.</Command.Empty>
				<Command.Group>
					{#each frameworks as framework (framework)}
						<Command.Item
							value={framework}
							onSelect={() => {
								value = framework;
								closeAndFocusTrigger();
							}}
						>
							<CheckIcon class={cn(value !== framework && "text-transparent")} />
							{framework}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
