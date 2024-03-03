<script lang="ts">
	import PlusCircled from "svelte-radix/PlusCircled.svelte";
	import Check from "svelte-radix/Check.svelte";
	import * as Command from "@/registry/new-york/ui/command/index.js";
	import * as Popover from "@/registry/new-york/ui/popover/index.js";
	import { Button } from "@/registry/new-york/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { Separator } from "@/registry/default/ui/separator/index.js";
	import { Badge } from "@/registry/new-york/ui/badge/index.js";
	import type { statuses } from "../(data)/data.js";

	export let filterValues: string[] = [];
	export let title: string;
	export let options = [] as typeof statuses;

	let open = false;

	const handleSelect = (currentValue: string) => {
		if (Array.isArray(filterValues) && filterValues.includes(currentValue)) {
			filterValues = filterValues.filter((v) => v !== currentValue);
		} else {
			filterValues = [...(Array.isArray(filterValues) ? filterValues : []), currentValue];
		}
	};
</script>

<Popover.Root bind:open>
	<Popover.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="sm" class="h-8 border-dashed">
			<PlusCircled class="mr-2 h-4 w-4" />
			{title}

			{#if filterValues.length > 0}
				<Separator orientation="vertical" class="mx-2 h-4" />
				<Badge variant="secondary" class="rounded-sm px-1 font-normal lg:hidden">
					{filterValues.length}
				</Badge>
				<div class="hidden space-x-1 lg:flex">
					{#if filterValues.length > 2}
						<Badge variant="secondary" class="rounded-sm px-1 font-normal">
							{filterValues.length} Selected
						</Badge>
					{:else}
						{#each filterValues as option}
							<Badge variant="secondary" class="rounded-sm px-1 font-normal">
								{option}
							</Badge>
						{/each}
					{/if}
				</div>
			{/if}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0" align="start" side="bottom">
		<Command.Root>
			<Command.Input placeholder={title} />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group>
					{#each options as option}
						<Command.Item
							value={option.value}
							onSelect={(currentValue) => {
								handleSelect(currentValue);
							}}
						>
							<div
								class={cn(
									"border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
									filterValues.includes(option.value)
										? "bg-primary text-primary-foreground"
										: "opacity-50 [&_svg]:invisible"
								)}
							>
								<Check className={cn("h-4 w-4")} />
							</div>
							<span>
								{option.label}
							</span>
						</Command.Item>
					{/each}
				</Command.Group>
				{#if filterValues.length > 0}
					<Command.Separator />
					<Command.Item
						class="justify-center text-center"
						onSelect={() => {
							filterValues = [];
						}}
					>
						Clear filters
					</Command.Item>
				{/if}
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
