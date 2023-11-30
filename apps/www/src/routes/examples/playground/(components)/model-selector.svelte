<script lang="ts">
	import { cn } from "@/utils";
	import * as HoverCard from "@/registry/new-york/ui/hover-card";
	import { Label } from "@/registry/new-york/ui/label";
	import type { ModelType, Model } from "../(data)/models";
	import { Button } from "@/registry/new-york/ui/button";
	import * as Command from "@/registry/new-york/ui/command";
	import { Check, CaretSort } from "radix-icons-svelte";
	import * as Popover from "@/registry/new-york/ui/popover";
	import { tick } from "svelte";

	export let types: ModelType[];
	export let models: Model[];

	let selectedModel = models[0];
	let peekedModel = models[0];
	let open = false;

	function handlePeek(model: Model) {
		if (peekedModel.id === model.id) return;
		peekedModel = model;
	}

	let value = "";

	$: selectedValue =
		models.find((f) => f.id === value)?.name ?? "Select a model...";

	// We want to refocus the trigger button when the user selects
	// an item from the list so users can continue navigating the
	// rest of the form with the keyboard.
	function closeAndFocusTrigger(triggerId: string) {
		open = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

<div class="grid gap-2">
	<HoverCard.Root openDelay={200} positioning={{ placement: "left-start" }}>
		<HoverCard.Trigger asChild let:builder>
			<div use:builder.action {...builder}>
				<Label for="model">Model</Label>
			</div>
		</HoverCard.Trigger>
		<HoverCard.Content class="w-[260px] text-sm">
			The model which will generate the completion. Some models are
			suitable for natural language tasks, others specialize in code.
			Learn more.
		</HoverCard.Content>
	</HoverCard.Root>

	<Popover.Root bind:open let:names>
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
				positioning={{
					placement: "left-start"
				}}
				closeOnOutsideClick={false}
				open={peekedModel.id !== selectedModel.id}
				openDelay={0}
			>
				<HoverCard.Content class="min-h-[280px] -ml-2 ">
					<div class="grid gap-2">
						<h4 class="font-medium leading-none">
							{peekedModel.name}
						</h4>
						<div class="text-sm text-muted-foreground">
							{peekedModel.description}
						</div>
						{#if peekedModel.strengths}
							<div class="mt-4 grid gap-2">
								<h5 class="text-sm font-medium leading-none">
									Strengths
								</h5>
								<ul class="text-sm text-muted-foreground">
									{peekedModel.strengths}
								</ul>
							</div>
						{/if}
					</div>
				</HoverCard.Content>
				<Command.Root loop>
					<Command.Input placeholder="Search Models...." />
					<Command.List
						class="h-[var(--cmdk-list-height)] max-h-[400px]"
					>
						<Command.Empty>No models found.</Command.Empty>
						{#each types as type}
							<Command.Group heading={type}>
								{#each models.filter((model) => model.type === type) as model}
									<HoverCard.Trigger asChild let:builder>
										<div
											use:builder.action
											{...builder}
											role="button"
											tabindex="0"
											on:mouseover={() => {
												handlePeek(model);
											}}
											on:focus={() => {
												handlePeek(model);
											}}
										>
											<Command.Item
												value={model.name}
												class="aria-selected:bg-primary aria-selected:text-primary-foreground"
												onSelect={(currentValue) => {
													value = currentValue;
													closeAndFocusTrigger(
														names.trigger
													);
												}}
											>
												{model.name}
												<Check
													class={cn(
														"ml-auto h-4 w-4",
														value === model.id
															? "opacity-100"
															: "opacity-0"
													)}
												/>
											</Command.Item>
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
