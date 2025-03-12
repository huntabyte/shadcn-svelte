<script lang="ts">
	import Calendar from "@lucide/svelte/icons/calendar";
	import Ellipsis from "@lucide/svelte/icons/ellipsis";
	import Tags from "@lucide/svelte/icons/tags";
	import Trash from "@lucide/svelte/icons/trash";
	import User from "@lucide/svelte/icons/user";
	import { tick } from "svelte";
	import * as DropdownMenu from "$lib/registry/default/ui/dropdown-menu/index.js";
	import * as Command from "$lib/registry/default/ui/command/index.js";
	import { Button } from "$lib/registry/default/ui/button/index.js";

	const labels = [
		"feature",
		"bug",
		"enhancement",
		"documentation",
		"design",
		"question",
		"maintenance",
	];

	let open = $state(false);
	let selectedLabel = $state("feature");
	let triggerRef = $state<HTMLButtonElement>(null!);

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger() {
		open = false;
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<div
	class="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center"
>
	<p class="text-sm font-medium leading-none">
		<span class="bg-primary text-primary-foreground mr-2 rounded-lg px-2 py-1 text-xs">
			{selectedLabel}
		</span>
		<span class="text-muted-foreground">Create a new project</span>
	</p>
	<DropdownMenu.Root bind:open>
		<DropdownMenu.Trigger bind:ref={triggerRef}>
			{#snippet child({ props })}
				<Button variant="ghost" size="sm" {...props} aria-label="Open menu">
					<Ellipsis />
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-[200px]" align="end">
			<DropdownMenu.Group>
				<DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
				<DropdownMenu.Item>
					<User class="mr-2 size-4" />
					Assign to...
				</DropdownMenu.Item>
				<DropdownMenu.Item>
					<Calendar class="mr-2 size-4" />
					Set due date...
				</DropdownMenu.Item>
				<DropdownMenu.Separator />
				<DropdownMenu.Sub>
					<DropdownMenu.SubTrigger>
						<Tags class="mr-2 size-4" />
						Apply label
					</DropdownMenu.SubTrigger>
					<DropdownMenu.SubContent class="p-0">
						<Command.Root value={selectedLabel}>
							<Command.Input autofocus placeholder="Filter label..." />
							<Command.List>
								<Command.Empty>No label found.</Command.Empty>
								<Command.Group>
									{#each labels as label}
										<Command.Item
											value={label}
											onSelect={() => {
												selectedLabel = label;
												closeAndFocusTrigger();
											}}
										>
											{label}
										</Command.Item>
									{/each}
								</Command.Group>
							</Command.List>
						</Command.Root>
					</DropdownMenu.SubContent>
				</DropdownMenu.Sub>
				<DropdownMenu.Separator />
				<DropdownMenu.Item class="text-red-600">
					<Trash class="mr-2 size-4" />
					Delete
					<DropdownMenu.Shortcut>⌘⌫</DropdownMenu.Shortcut>
				</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
