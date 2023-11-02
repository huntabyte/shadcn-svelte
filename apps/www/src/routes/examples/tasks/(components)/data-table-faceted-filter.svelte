<script lang="ts">
	import { PlusCircled, Check } from "radix-icons-svelte";
	import * as Command from "@/registry/new-york/ui/command";
	import * as Popover from "@/registry/new-york/ui/popover";
	import { Button } from "@/registry/new-york/ui/button";
	import { cn } from "$lib/utils";
	import Separator from "@/registry/default/ui/separator/separator.svelte";
	import Badge from "@/registry/new-york/ui/badge/badge.svelte";
	import type { statuses } from "../(data)/data";

	export let filterValues: string[];
	export let title: string;
	export let options = [] as typeof statuses;

	let open = false;
	let values: string[] = [];

	$: filterValues = values;

	const handleSelect = (currentValue: string) => {
		if (Array.isArray(values) && values.includes(currentValue)) {
			values = values.filter((v) => v !== currentValue);
		} else {
			values = [...(Array.isArray(values) ? values : []), currentValue];
		}
	};
</script>

<Popover.Root bind:open positioning={{ placement: "bottom-start" }}>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="outline"
			size="sm"
			class="h-8 border-dashed"
		>
			<PlusCircled class="mr-2 h-4 w-4" />
			{title}

			{#if values.length > 0}
				<Separator orientation="vertical" class="mx-2 h-4" />
				<Badge
					variant="secondary"
					class="rounded-sm px-1 font-normal lg:hidden"
				>
					{values.length}
				</Badge>
				<div class="hidden space-x-1 lg:flex">
					{#if values.length > 2}
						<Badge
							variant="secondary"
							class="rounded-sm px-1 font-normal"
						>
							{values.length} Selected
						</Badge>
					{:else}
						{#each values as option}
							<Badge
								variant="secondary"
								className="rounded-sm px-1 font-normal"
							>
								{option}
							</Badge>
						{/each}
					{/if}
				</div>
			{/if}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-[200px] p-0">
		<Command.Root>
			<Command.Input placeholder="Status" />
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
									"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
									values.includes(option.value)
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
				{#if values.length > 0}
					<Command.Separator />
					<Command.Item
						class="justify-center text-center"
						onSelect={() => {
							values = [];
						}}
					>
						Clear filters
					</Command.Item>
				{/if}
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
