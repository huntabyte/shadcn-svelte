<script lang="ts">
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { cn } from "$lib/utils.js";

	const frameworks = ["Next.js", "SvelteKit", "Nuxt.js", "Remix", "Astro"] as const;

	let open = $state(false);
	let values = $state<string[]>([frameworks[0]]);

	function toggleValue(framework: (typeof frameworks)[number]) {
		values = values.includes(framework)
			? values.filter((v) => v !== framework)
			: [...values, framework];
	}

	function removeValue(e: MouseEvent, framework: string) {
		e.stopPropagation();
		values = values.filter((v) => v !== framework);
	}
</script>

<Example title="Combobox Multiple">
	<Popover.Root bind:open>
		<Popover.Trigger>
			{#snippet child({ props })}
				<div
					{...props}
					role="combobox"
					aria-expanded={open}
					class="border-input bg-background focus-within:ring-ring flex min-h-9 w-64 cursor-pointer flex-wrap items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-sm shadow-xs transition-colors focus-within:ring-2 focus-within:ring-offset-2"
				>
					{#each values as framework (framework)}
						<Badge
							variant="secondary"
							class="gap-1 pr-0.5"
							onclick={(e) => removeValue(e, framework)}
							onkeydown={(e) =>
								e.key === "Enter" &&
								removeValue(e as unknown as MouseEvent, framework)}
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
					<span class="text-muted-foreground flex-1 py-1 text-sm"
						>Select frameworks...</span
					>
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
							<Command.Item value={framework} onSelect={() => toggleValue(framework)}>
								<IconPlaceholder
									lucide="CheckIcon"
									tabler="IconCheck"
									hugeicons="Tick02Icon"
									phosphor="CheckIcon"
									remixicon="RiCheckLine"
									class={cn(!values.includes(framework) && "text-transparent")}
								/>
								{framework}
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</Popover.Content>
	</Popover.Root>
</Example>
