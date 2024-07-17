<script lang="ts">
	import PlusCircled from "svelte-radix/PlusCircled.svelte";
	import Check from "svelte-radix/Check.svelte";
	import type { statuses } from "../(data)/data.js";
	import * as Command from "$lib/registry/new-york/ui/command/index.js";
	import * as Popover from "$lib/registry/new-york/ui/popover/index.js";
	import { buttonVariants } from "$lib/registry/new-york/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import { Separator } from "$lib/registry/default/ui/separator/index.js";
	import { Badge } from "$lib/registry/new-york/ui/badge/index.js";

	type Props = {
		filterValues: string[];
		title: string;
		options: typeof statuses;
		counts: { [index: string]: number };
	};

	let { filterValues = $bindable([]), title, options, counts }: Props = $props();

	let open = $state(false);

	function handleSelect(currentValue: string) {
		if (Array.isArray(filterValues) && filterValues.includes(currentValue)) {
			filterValues = filterValues.filter((v) => v !== currentValue);
		} else {
			filterValues = [...(Array.isArray(filterValues) ? filterValues : []), currentValue];
		}
	}
</script>

<Popover.Root bind:open>
	<Popover.Trigger
		class={buttonVariants({
			variant: "outline",
			size: "sm",
			class: "h-8 border-dashed",
		})}
	>
		<PlusCircled class="mr-2 size-4" />
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
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0" align="start" side="bottom">
		<Command.Root>
			<Command.Input placeholder={title} />
			<Command.List>
				<Command.Empty>No results found.</Command.Empty>
				<Command.Group>
					{#each options as option}
						{@const Icon = option.icon}
						<Command.Item
							value={option.value}
							onSelect={(currentValue) => {
								handleSelect(currentValue);
							}}
						>
							<div
								class={cn(
									"mr-2 flex size-4 items-center justify-center rounded-sm border border-primary",
									filterValues.includes(option.value)
										? "bg-primary text-primary-foreground"
										: "opacity-50 [&_svg]:invisible"
								)}
							>
								<Check className={cn("size-4")} />
							</div>
							<Icon class="mr-2 size-4 text-muted-foreground" />
							<span>
								{option.label}
							</span>
							{#if counts[option.value]}
								<span
									class="ml-auto flex size-4 items-center justify-center font-mono text-xs"
								>
									{counts[option.value]}
								</span>
							{/if}
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
