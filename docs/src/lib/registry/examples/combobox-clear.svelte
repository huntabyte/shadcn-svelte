<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import XIcon from "@lucide/svelte/icons/x";
	import { tick } from "svelte";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

	let open = $state(false);
	let value = $state("Next.js");
	let triggerRef = $state<HTMLButtonElement>(null!);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<div class="flex items-center gap-2">
	<Popover.Root bind:open>
		<Popover.Trigger bind:ref={triggerRef}>
			{#snippet child({ props })}
				<Button
					{...props}
					variant="outline"
					class="w-[200px] justify-between"
					role="combobox"
					aria-expanded={open}
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
	{#if value}
		<Button
			variant="ghost"
			size="icon"
			onclick={() => (value = "")}
			aria-label="Clear selection"
		>
			<XIcon class="size-4" />
		</Button>
	{/if}
</div>
