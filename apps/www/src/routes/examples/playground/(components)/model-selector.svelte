<script lang="ts">
	import * as HoverCard from "@/registry/new-york/ui/hover-card/index.js";
	import { Label } from "@/registry/new-york/ui/label/index.js";
	import type { ModelType, Model } from "../(data)/models.js";
	import { Button } from "@/registry/new-york/ui/button/index.js";
	import * as Command from "@/registry/new-york/ui/command/index.js";
	import CaretSort from "svelte-radix/CaretSort.svelte";
	import * as Popover from "@/registry/new-york/ui/popover/index.js";
	import { tick } from "svelte";
	import ModelItem from "./model-item.svelte";

	export let types: ModelType[];
	export let models: Model[];

	let selectedModel = models[0];
	let peekedModel: Model | undefined = undefined;
	let open = false;

	let value = "";

	$: selectedValue = models.find((f) => f.id === value)?.name ?? "Select a model...";

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}

	function onPopoverOpenChange(open: boolean) {
		if (open) {
			peekedModel = selectedModel;
		} else {
			peekedModel = undefined;
		}
	}

	$: hoverCardIsOpen = open && peekedModel !== undefined;

	function handlePeek(model: Model) {
		console.log("current model", peekedModel?.name);
		console.log("incoming model", model.name);
		console.log("popover open", open);
		console.log("hovercard open ", hoverCardIsOpen);
		if (peekedModel === undefined) {
			if (!open) return;
			peekedModel = model;
			return;
		}
		peekedModel = model;
	}

	function onPopoverOutsideClick() {
		peekedModel = undefined;
	}
</script>

<div class="grid gap-2">
	<HoverCard.Root openDelay={200}>
		<HoverCard.Trigger asChild let:builder>
			<div use:builder.action {...builder}>
				<Label for="model">Model</Label>
			</div>
		</HoverCard.Trigger>
		<HoverCard.Content class="w-[260px] text-sm" align="start" side="left">
			The model which will generate the completion. Some models are suitable for natural
			language tasks, others specialize in code. Learn more.
		</HoverCard.Content>
	</HoverCard.Root>

	<Popover.Root
		bind:open
		let:ids
		onOutsideClick={onPopoverOutsideClick}
		onOpenChange={onPopoverOpenChange}
	>
		<Popover.Trigger asChild let:builder>
			<Button
				builders={[builder]}
				variant="outline"
				role="combobox"
				aria-expanded={open}
				class="w-[200px] justify-between "
			>
				{selectedValue}
				<CaretSort class="ml-2 h-4 w-4 shrink-0 opacity-50" />
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-[250px] p-0">
			<HoverCard.Root
				closeOnOutsideClick={false}
				open={hoverCardIsOpen}
				openDelay={0}
				portal={null}
			>
				<HoverCard.Content class="-ml-2 min-h-[280px]" side="left" align="start">
					{#if peekedModel && hoverCardIsOpen}
						<div class="grid gap-2">
							<h4 class="font-medium leading-none">
								{peekedModel.name}
							</h4>
							<div class="text-sm text-muted-foreground">
								{peekedModel.description}
							</div>
							{#if peekedModel.strengths}
								<div class="mt-4 grid gap-2">
									<h5 class="text-sm font-medium leading-none">Strengths</h5>
									<ul class="text-sm text-muted-foreground">
										{peekedModel.strengths}
									</ul>
								</div>
							{/if}
						</div>
					{/if}
				</HoverCard.Content>
				<Command.Root loop>
					<Command.Input placeholder="Search Models...." />
					<Command.List class="h-[var(--cmdk-list-height)] max-h-[400px]">
						<Command.Empty>No models found.</Command.Empty>
						{#each types as type}
							<Command.Group heading={type}>
								{#each models.filter((model) => model.type === type) as model}
									<HoverCard.Trigger asChild let:builder>
										<div
											use:builder.action
											{...builder}
											role="button"
											tabindex={0}
										>
											<ModelItem
												{model}
												onSelect={() => {
													value = model.id;
													closeAndFocusTrigger(ids.trigger);
												}}
												onPeek={() => {
													handlePeek(model);
												}}
												isSelected={value === model.id}
											/>
										</div>
									</HoverCard.Trigger>
								{/each}
							</Command.Group>
						{/each}
					</Command.List>
				</Command.Root>
			</HoverCard.Root>
		</Popover.Content>
	</Popover.Root>
</div>
