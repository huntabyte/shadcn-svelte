<script lang="ts">
	import RotateCCWIcon from "@lucide/svelte/icons/rotate-ccw";
	import {
		CodeViewer,
		MaxLengthSelector,
		ModelSelector,
		PresetActions,
		PresetSave,
		PresetSelector,
		PresetShare,
		TemperatureSelector,
		TopPSelector,
	} from "./(components)/index.js";
	import { models, types } from "./(data)/models.js";
	import { presets } from "./(data)/presets.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	import * as HoverCard from "$lib/registry/ui/hover-card/index.js";
	import Metadata from "$lib/components/metadata.svelte";

	const title = "Playground";
	const description = "The OpenAI Playground build using the components.";
</script>

<Metadata
	{title}
	{description}
	ogImage={{
		url: `/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`,
	}}
/>

<div class="md:hidden">
	<img src="/img/examples/playground-light.png" alt="Playground" class="block dark:hidden" />
	<img src="/img/examples/playground-dark.png" alt="Playground" class="hidden dark:block" />
</div>
<div class="hidden h-full flex-col md:flex">
	<div
		class="container flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16"
	>
		<h2 class="text-lg font-semibold">Playground</h2>
		<div class="ms-auto flex w-full space-x-2 sm:justify-end">
			<PresetSelector {presets} />
			<PresetSave />
			<div class="hidden space-x-2 md:flex">
				<CodeViewer />
				<PresetShare />
			</div>
			<PresetActions />
		</div>
	</div>
	<Separator />
	<Tabs.Root value="complete" class="flex-1">
		<div class="container h-full py-6">
			<div class="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
				<div class="hidden flex-col space-y-4 sm:flex md:order-2">
					<div class="grid gap-2">
						<HoverCard.Root openDelay={200}>
							<HoverCard.Trigger>
								{#snippet child({ props })}
									<span
										class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
										{...props}
									>
										Mode
									</span>
								{/snippet}
							</HoverCard.Trigger>
							<HoverCard.Content class="w-[320px] text-sm" side="left">
								Choose the interface that best suits your task. You can provide: a
								simple prompt to complete, starting and ending text to insert a
								completion within, or some text with instructions to edit it.
							</HoverCard.Content>
						</HoverCard.Root>
						<Tabs.List class="grid grid-cols-3">
							<Tabs.Trigger value="complete">
								<span class="sr-only">Complete</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="none"
									class="size-5"
								>
									<rect
										x="4"
										y="3"
										width="12"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="4"
										y="7"
										width="12"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="4"
										y="11"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="4"
										y="15"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="8.5"
										y="11"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="8.5"
										y="15"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="13"
										y="11"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
								</svg>
							</Tabs.Trigger>
							<Tabs.Trigger value="insert">
								<span class="sr-only">Insert</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="none"
									class="size-5"
								>
									<path
										fill-rule="evenodd"
										clip-rule="evenodd"
										d="M14.491 7.769a.888.888 0 0 1 .287.648.888.888 0 0 1-.287.648l-3.916 3.667a1.013 1.013 0 0 1-.692.268c-.26 0-.509-.097-.692-.268L5.275 9.065A.886.886 0 0 1 5 8.42a.889.889 0 0 1 .287-.64c.181-.17.427-.267.683-.269.257-.002.504.09.69.258L8.903 9.87V3.917c0-.243.103-.477.287-.649.183-.171.432-.268.692-.268.26 0 .509.097.692.268a.888.888 0 0 1 .287.649V9.87l2.245-2.102c.183-.172.432-.269.692-.269.26 0 .508.097.692.269Z"
										fill="currentColor"
									/>
									<rect
										x="4"
										y="15"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="8.5"
										y="15"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="13"
										y="15"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
								</svg>
							</Tabs.Trigger>
							<Tabs.Trigger value="edit">
								<span class="sr-only">Edit</span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="none"
									class="size-5"
								>
									<rect
										x="4"
										y="3"
										width="12"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="4"
										y="7"
										width="12"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="4"
										y="11"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="4"
										y="15"
										width="4"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<rect
										x="8.5"
										y="11"
										width="3"
										height="2"
										rx="1"
										fill="currentColor"
									/>
									<path
										d="M17.154 11.346a1.182 1.182 0 0 0-1.671 0L11 15.829V17.5h1.671l4.483-4.483a1.182 1.182 0 0 0 0-1.671Z"
										fill="currentColor"
									/>
								</svg>
							</Tabs.Trigger>
						</Tabs.List>
					</div>
					<ModelSelector {types} {models} />
					<TemperatureSelector type="single" value={0.56} />
					<MaxLengthSelector type="single" value={256} />
					<TopPSelector type="single" value={0.9} />
				</div>
				<div class="md:order-1">
					<Tabs.Content value="complete" class="mt-0 border-0 p-0">
						<div class="flex h-full flex-col space-y-4">
							<Textarea
								placeholder="Write a tagline for an ice cream shop"
								class="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
							/>
							<div class="flex items-center space-x-2">
								<Button>Submit</Button>
								<Button variant="secondary">
									<span class="sr-only">Show history</span>
									<RotateCCWIcon class="size-4" />
								</Button>
							</div>
						</div>
					</Tabs.Content>
					<Tabs.Content value="insert" class="mt-0 border-0 p-0">
						<div class="flex flex-col space-y-4">
							<div
								class="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1"
							>
								<Textarea
									placeholder="We're writing to [inset]. Congrats from OpenAI!"
									class="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
								/>
								<div class="bg-muted rounded-md border"></div>
							</div>
							<div class="flex items-center space-x-2">
								<Button>Submit</Button>
								<Button variant="secondary">
									<span class="sr-only">Show history</span>
									<RotateCCWIcon class="size-4" />
								</Button>
							</div>
						</div>
					</Tabs.Content>
					<Tabs.Content value="edit" class="mt-0 border-0 p-0">
						<div class="flex flex-col space-y-4">
							<div class="grid h-full gap-6 lg:grid-cols-2">
								<div class="flex flex-col space-y-4">
									<div class="flex flex-1 flex-col space-y-2">
										<Label for="input">Input</Label>
										<Textarea
											id="input"
											placeholder="We is going to the market."
											class="flex-1 lg:min-h-[580px]"
										/>
									</div>
									<div class="flex flex-col space-y-2">
										<Label for="instructions">Instructions</Label>
										<Textarea
											id="instructions"
											placeholder="Fix the grammar."
										/>
									</div>
								</div>
								<div
									class="bg-muted mt-[21px] min-h-[400px] rounded-md border lg:min-h-[700px]"
								></div>
							</div>
							<div class="flex items-center space-x-2">
								<Button>Submit</Button>
								<Button variant="secondary">
									<span class="sr-only">Show history</span>
									<RotateCCWIcon class="size-4" />
								</Button>
							</div>
						</div>
					</Tabs.Content>
				</div>
			</div>
		</div>
	</Tabs.Root>
</div>
