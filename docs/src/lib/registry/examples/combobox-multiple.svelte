<script lang="ts">
	import CheckIcon from "@lucide/svelte/icons/check";
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import XIcon from "@lucide/svelte/icons/x";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";

	const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"];

	let open = $state(false);
	let selected = $state<string[]>(["Next.js"]);
	let triggerRef = $state<HTMLButtonElement>(null!);

	function toggleFramework(framework: string) {
		if (selected.includes(framework)) {
			selected = selected.filter((f) => f !== framework);
		} else {
			selected = [...selected, framework];
		}
	}

	function removeFramework(framework: string, e: MouseEvent) {
		e.stopPropagation();
		selected = selected.filter((f) => f !== framework);
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger bind:ref={triggerRef}>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				class="h-auto min-h-9 w-full max-w-xs flex-wrap justify-between gap-1"
				role="combobox"
				aria-expanded={open}
			>
				{#if selected.length > 0}
					<div class="flex flex-wrap gap-1">
						{#each selected as framework (framework)}
							<span
								class="bg-secondary text-secondary-foreground inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-xs font-medium"
							>
								{framework}
								<button
									type="button"
									onclick={(e) => removeFramework(framework, e)}
									class="hover:text-foreground text-muted-foreground"
									aria-label="Remove {framework}"
								>
									<XIcon class="size-3" />
								</button>
							</span>
						{/each}
					</div>
				{:else}
					<span class="text-muted-foreground font-normal">Add framework</span>
				{/if}
				<ChevronsUpDownIcon class="ms-auto shrink-0 opacity-50" />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-[--radix-popover-trigger-width] p-0">
		<Command.Root>
			<Command.Input placeholder="Search framework..." />
			<Command.List>
				<Command.Empty>No items found.</Command.Empty>
				<Command.Group>
					{#each frameworks as framework (framework)}
						<Command.Item
							value={framework}
							onSelect={() => {
								toggleFramework(framework);
							}}
						>
							<CheckIcon
								class={cn(!selected.includes(framework) && "text-transparent")}
							/>
							{framework}
						</Command.Item>
					{/each}
				</Command.Group>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
