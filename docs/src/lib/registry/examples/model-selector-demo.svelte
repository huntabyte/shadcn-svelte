<script lang="ts">
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";

	const providers = [
		{
			name: "OpenAI",
			models: [
				{ id: "gpt-5", name: "GPT-5" },
				{ id: "gpt-5-mini", name: "GPT-5 mini" },
			],
		},
		{
			name: "Anthropic",
			models: [
				{ id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5" },
				{ id: "claude-haiku-4-5", name: "Claude Haiku 4.5" },
			],
		},
	];

	const models = providers.flatMap((provider) => provider.models);

	const efforts = [
		{ id: "low", name: "Low" },
		{ id: "medium", name: "Medium" },
		{ id: "high", name: "High" },
	];

	let text = $state("");
	let model = $state(models[0].id);
	let effort = $state(efforts[1].id);
	let form = $state<HTMLFormElement | null>(null);
	const currentModel = $derived(models.find((item) => item.id === model) ?? models[0]);
	const currentEffort = $derived(efforts.find((item) => item.id === effort) ?? efforts[1]);
	const canSend = $derived(text.trim().length > 0);

	function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!canSend) {
			return;
		}

		text = "";
	}
</script>

<div class="mx-auto w-full max-w-lg py-6">
	<form bind:this={form} {onsubmit}>
		<InputGroup.Root>
			<InputGroup.Textarea
				bind:value={text}
				placeholder="Ask the agent to change your code..."
				onkeydown={(event) => {
					if (event.key === "Enter" && !event.shiftKey) {
						event.preventDefault();
						form?.requestSubmit();
					}
				}}
				class="p-3"
			/>
			<InputGroup.Addon align="block-end">
				<InputGroup.Button
					type="submit"
					size="icon-sm"
					variant="outline"
					class="rounded-full"
					disabled={canSend}
					aria-label="Attach"
				>
					<PlusIcon />
				</InputGroup.Button>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<InputGroup.Button
								{...props}
								size="sm"
								variant="outline"
								aria-label="Model: {currentModel.name}"
								class="ml-auto"
							>
								{currentModel.name}
								<ChevronDownIcon />
							</InputGroup.Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="start" class="w-48">
						<DropdownMenu.RadioGroup bind:value={model}>
							{#each providers as provider, index (provider.name)}
								{#if index > 0}
									<DropdownMenu.Separator />
								{/if}
								<DropdownMenu.Group>
									<DropdownMenu.Label>{provider.name}</DropdownMenu.Label>
									{#each provider.models as item (item.id)}
										<DropdownMenu.RadioItem value={item.id} closeOnSelect>
											{item.name}
										</DropdownMenu.RadioItem>
									{/each}
								</DropdownMenu.Group>
							{/each}
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<InputGroup.Button
								{...props}
								size="sm"
								variant="outline"
								aria-label="Effort: {currentEffort.name}"
							>
								<span class="text-muted-foreground">Effort</span>
								{currentEffort.name}
								<ChevronDownIcon />
							</InputGroup.Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="start" class="w-36">
						<DropdownMenu.Group>
							<DropdownMenu.Label>Effort</DropdownMenu.Label>
							<DropdownMenu.RadioGroup bind:value={effort}>
								{#each efforts as item (item.id)}
									<DropdownMenu.RadioItem value={item.id} closeOnSelect>
										{item.name}
									</DropdownMenu.RadioItem>
								{/each}
							</DropdownMenu.RadioGroup>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<InputGroup.Button
					type="submit"
					size="icon-sm"
					variant="default"
					class="rounded-full"
					disabled={!canSend}
					aria-label="Send"
				>
					<ArrowUpIcon />
				</InputGroup.Button>
			</InputGroup.Addon>
		</InputGroup.Root>
	</form>
</div>
