<script lang="ts">
	import { cn } from "@/utils";
	import * as HoverCard from "@/registry/new-york/ui/hover-card";
	import * as Select from "@/registry/new-york/ui/select";
	import { Label } from "@/registry/new-york/ui/label";
	import type { ModelType, Model } from "../(data)/models";
	import { buttonVariants } from "@/registry/default/ui/button";
	export let types: ModelType[];
	export let models: Model[];

	let selectedModel = models[0];
	let peekedModel = models[0];
	let open = false;

	function handlePeek(model: Model) {
		if (peekedModel.id === model.id) return;
		peekedModel = model;
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
	<Select.Root
		bind:open
		selected={{ value: selectedModel.id, label: selectedModel.name }}
		positioning={{ placement: "bottom-end", sameWidth: false }}
		loop
	>
		<Select.Trigger
			class={cn(
				buttonVariants({ variant: "outline" }),
				"w-full justify-between"
			)}
		>
			<Select.Value placeholder="Select a model..." />
		</Select.Trigger>

		<Select.Content class="w-[250px] p-0">
			<HoverCard.Root
				positioning={{
					placement: "left"
				}}
				closeOnOutsideClick={false}
				{open}
			>
				<HoverCard.Trigger asChild let:builder>
					<HoverCard.Content class="min-h-[280px]">
						<div class="grid gap-2">
							<h4 class="font-medium leading-none">
								{peekedModel.name}
							</h4>
							<div class="text-sm text-muted-foreground">
								{peekedModel.description}
							</div>
							{#if peekedModel.strengths}
								<div class="mt-4 grid gap-2">
									<h5
										class="text-sm font-medium leading-none"
									>
										Strengths
									</h5>
									<ul class="text-sm text-muted-foreground">
										{peekedModel.strengths}
									</ul>
								</div>
							{/if}
						</div>
					</HoverCard.Content>

					{#each types as type}
						<Select.Group>
							<Select.Label>{type}</Select.Label>
							{#each models.filter((model) => model.type === type) as model}
								<Select.Item
									value={model.id}
									label={model.name}
									on:focusin={() => handlePeek(model)}
								>
									{model.name}
								</Select.Item>
							{/each}
							<span use:builder.action {...builder} />
						</Select.Group>
					{/each}
				</HoverCard.Trigger>
			</HoverCard.Root>
		</Select.Content>
	</Select.Root>
</div>
