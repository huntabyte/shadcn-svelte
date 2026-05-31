<script lang="ts">
	import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
	import { tick } from "svelte";
	import { useId } from "bits-ui";
	import type { Model, ModelType } from "../(data)/models.js";
	import ModelItem from "./model-item.svelte";
	import * as HoverCard from "$lib/registry/ui/hover-card/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";

	let { types, models }: { types: ModelType[]; models: Model[] } = $props();

	let selectedModel = $derived(models[0]);
	let peekedModel = $state<Model | undefined>();
	let open = $state(false);

	let value = $state("");

	const selectedValue = $derived(models.find((f) => f.id === value)?.name ?? "Select a model...");

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

	const hoverCardIsOpen = $derived(open && peekedModel !== undefined);
	let triggerId = useId();

	function handlePeek(model: Model) {
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
		<HoverCard.Trigger>
			{#snippet child({ props })}
				<div {...props}>
					<Label for="model">Model</Label>
				</div>
			{/snippet}
		</HoverCard.Trigger>
		<HoverCard.Content class="w-[260px] text-sm" align="start" side="left">
			The model which will generate the completion. Some models are suitable for natural
			language tasks, others specialize in code. Learn more.
		</HoverCard.Content>
	</HoverCard.Root>

	<Popover.Root bind:open onOpenChange={onPopoverOpenChange}>
		<Popover.Trigger
			class={buttonVariants({ variant: "outline", class: "w-[200px] justify-between" })}
			role="combobox"
			aria-expanded={open}
			id={triggerId}
		>
			{selectedValue}
			<ChevronsUpDownIcon class="opacity-50" />
		</Popover.Trigger>
		<Popover.Content class="w-[250px] p-0" onInteractOutside={onPopoverOutsideClick}>
			<HoverCard.Root open={hoverCardIsOpen} openDelay={0}>
				<HoverCard.Content
					interactOutsideBehavior="ignore"
					class="-ms-2 min-h-[280px]"
					side="left"
					align="start"
				>
					{#if peekedModel && hoverCardIsOpen}
						<div class="grid gap-2">
							<h4 class="leading-none font-medium">
								{peekedModel.name}
							</h4>
							<div class="text-muted-foreground text-sm">
								{peekedModel.description}
							</div>
							{#if peekedModel.strengths}
								<div class="mt-4 grid gap-2">
									<h5 class="text-sm leading-none font-medium">Strengths</h5>
									<ul class="text-muted-foreground text-sm">
										{peekedModel.strengths}
									</ul>
								</div>
							{/if}
						</div>
					{/if}
				</HoverCard.Content>
				<Command.Root loop>
					<Command.Input placeholder="Search Models...." />
					<Command.List class="h-(--bits-command-list-height) max-h-[400px]">
						<Command.Empty>No models found.</Command.Empty>
						{#each types as type (type)}
							<Command.Group heading={type}>
								{#each models.filter((model) => model.type === type) as model (model.id)}
									<HoverCard.Trigger>
										{#snippet child({ props })}
											<div {...props} role="button" tabindex={0}>
												<ModelItem
													{model}
													onSelect={() => {
														value = model.id;
														closeAndFocusTrigger(triggerId);
													}}
													onPeek={() => {
														handlePeek(model);
													}}
													isSelected={value === model.id}
												/>
											</div>
										{/snippet}
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
