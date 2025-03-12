<script lang="ts">
	import Rabbit from "@lucide/svelte/icons/rabbit";
	import Bird from "@lucide/svelte/icons/bird";
	import Turtle from "@lucide/svelte/icons/turtle";

	import { Input } from "$lib/registry/new-york/ui/input/index.js";
	import { Textarea } from "$lib/registry/new-york/ui/textarea/index.js";
	import { Label } from "$lib/registry/new-york/ui/label/index.js";
	import * as Select from "$lib/registry/new-york/ui/select/index.js";

	type Model = {
		value: string;
		label: string;
		description: string;
		// this should be `Component` but lucide needs to update types
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		Icon: any;
	};

	const models = [
		{
			value: "genesis",
			label: "Neural Genesis",
			description: "Our fastest model for general use cases.",
			Icon: Rabbit,
		},
		{
			value: "explorer",
			label: "Neural Explorer",
			description: "Performance and speed for efficiency.",
			Icon: Bird,
		},
		{
			value: "quantum",
			label: "Neural Quantum",
			description: "The most powerful model for complex computations.",
			Icon: Turtle,
		},
	];

	let model = $state("");
	const selectedModel = $derived(models.find((m) => m.value === model));

	let role = $state("system");
</script>

{#snippet ModelItemContent({ label, Icon, description }: Model)}
	<div class="text-muted-foreground flex items-start gap-3">
		<Icon class="size-5" />
		<div class="grid gap-0.5">
			<p>
				Neural
				<span class="text-foreground font-medium"> {label} </span>
			</p>
			<p class="text-xs" data-description>
				{description}
			</p>
		</div>
	</div>
{/snippet}

<div
	class="relative hidden flex-col items-start gap-8 md:flex"
	data-x-chunk-name="dashboard-03-chunk-0"
	data-x-chunk-description="A settings form a configuring an AI model and messages."
>
	<form class="grid w-full items-start gap-6">
		<fieldset class="grid gap-6 rounded-lg border p-4">
			<legend class="-ml-1 px-1 text-sm font-medium"> Settings </legend>
			<div class="grid gap-3">
				<Label for="model">Model</Label>
				<Select.Root type="single" bind:value={model}>
					<Select.Trigger id="model" class="items-start [&_[data-description]]:hidden">
						{#if selectedModel}
							{@render ModelItemContent(selectedModel)}
						{:else}
							Select a model
						{/if}
					</Select.Trigger>
					<Select.Content>
						{#each models as model}
							<Select.Item value={model.value} label={model.label}>
								{@render ModelItemContent(model)}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-3">
				<Label for="temperature">Temperature</Label>
				<Input id="temperature" type="number" placeholder="0.4" />
			</div>
			<div class="grid grid-cols-2 gap-4">
				<div class="grid gap-3">
					<Label for="top-p">Top P</Label>
					<Input id="top-p" type="number" placeholder="0.7" />
				</div>
				<div class="grid gap-3">
					<Label for="top-k">Top K</Label>
					<Input id="top-k" type="number" placeholder="0.0" />
				</div>
			</div>
		</fieldset>
		<fieldset class="grid gap-6 rounded-lg border p-4">
			<legend class="-ml-1 px-1 text-sm font-medium"> Messages </legend>
			<div class="grid gap-3">
				<Label for="role">Role</Label>
				<Select.Root bind:value={role} type="single">
					<Select.Trigger class="capitalize">
						{role ?? "Select a role"}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="system" label="System" />
						<Select.Item value="user" label="User" />
						<Select.Item value="assistant" label="Assistant" />
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-3">
				<Label for="content">Content</Label>
				<Textarea id="content" placeholder="You are a..." class="min-h-[9.5rem]" />
			</div>
		</fieldset>
	</form>
</div>
