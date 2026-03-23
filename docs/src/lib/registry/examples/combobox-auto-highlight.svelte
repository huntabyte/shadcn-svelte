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
	let inputValue = $state("");
	let triggerRef = $state<HTMLButtonElement>(null!);

	const filtered = $derived(
		frameworks.filter((f) =>
			f.toLowerCase().includes(inputValue.toLowerCase())
		)
	);

	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<Popover.Root
	bind:open
	onOpenChange={(o) => {
		if (o) inputValue = "";
	}}
>
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
		<Command.Root shouldFilter={false} value={filtered[0] ?? ""}>
			<Command.Input
				placeholder="Search framework..."
				bind:value={inputValue}
			/>
			<Command.List>
				<Command.Empty>No items found.</Command.Empty>
				<Command.Group>
					{#each filtered as framework (framework)}
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
