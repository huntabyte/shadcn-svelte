<script lang="ts">
	import Triangle from "@lucide/svelte/icons/triangle";
	import Bot from "@lucide/svelte/icons/bot";
	import SquareTerminal from "@lucide/svelte/icons/square-terminal";
	import CodeXML from "@lucide/svelte/icons/code-xml";
	import Settings2 from "@lucide/svelte/icons/settings-2";
	import LifeBuoy from "@lucide/svelte/icons/life-buoy";
	import Book from "@lucide/svelte/icons/book";
	import SquareUser from "@lucide/svelte/icons/square-user";
	import Settings from "@lucide/svelte/icons/settings";
	import Rabbit from "@lucide/svelte/icons/rabbit";
	import Bird from "@lucide/svelte/icons/bird";
	import Turtle from "@lucide/svelte/icons/turtle";
	import Share from "@lucide/svelte/icons/share";
	import Paperclip from "@lucide/svelte/icons/paperclip";
	import Mic from "@lucide/svelte/icons/mic";
	import CornerDownLeft from "@lucide/svelte/icons/corner-down-left";
	import { Badge } from "$lib/registry/new-york/ui/badge/index.js";
	import { Button } from "$lib/registry/new-york/ui/button/index.js";
	import * as Tooltip from "$lib/registry/new-york/ui/tooltip/index.js";
	import * as Drawer from "$lib/registry/new-york/ui/drawer/index.js";
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

<div class="grid h-screen w-full pl-[53px]">
	<aside class="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
		<div class="border-b p-2">
			<Button variant="outline" size="icon" aria-label="Home">
				<Triangle class="fill-foreground size-5" />
			</Button>
		</div>
		<nav class="grid gap-1 p-2">
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="ghost"
								size="icon"
								class="bg-muted rounded-lg"
								aria-label="Playground"
							>
								<SquareTerminal class="size-5" />
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right" sideOffset={5}>Playground</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="ghost"
								size="icon"
								class="rounded-lg"
								aria-label="Models"
							>
								<Bot class="size-5" />
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right" sideOffset={5}>Models</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="ghost"
								size="icon"
								class="rounded-lg"
								aria-label="API"
							>
								<CodeXML class="size-5" />
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right" sideOffset={5}>API</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="ghost"
								size="icon"
								class="rounded-lg"
								aria-label="Documentation"
							>
								<Book class="size-5" />
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right" sideOffset={5}>Documentation</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="ghost"
								size="icon"
								class="rounded-lg"
								aria-label="Settings"
							>
								<Settings2 class="size-5" />
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right" sideOffset={5}>Settings</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</nav>
		<nav class="mt-auto grid gap-1 p-2">
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="ghost"
								size="icon"
								class="mt-auto rounded-lg"
								aria-label="Help"
							>
								<LifeBuoy class="size-5" />
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right" sideOffset={5}>Help</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="ghost"
								size="icon"
								class="mt-auto rounded-lg"
								aria-label="Account"
							>
								<SquareUser class="size-5" />
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content side="right" sideOffset={5}>Account</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</nav>
	</aside>
	<div class="flex flex-col">
		<header
			class="bg-background sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b px-4"
		>
			<h1 class="text-xl font-semibold">Playground</h1>
			<Drawer.Root>
				<Drawer.Trigger>
					{#snippet child({ props })}
						<Button {...props} variant="ghost" size="icon" class="md:hidden">
							<Settings class="size-4" />
							<span class="sr-only">Settings</span>
						</Button>
					{/snippet}
				</Drawer.Trigger>
				<Drawer.Content class="max-h-[80vh]">
					<Drawer.Header>
						<Drawer.Title>Configuration</Drawer.Title>
						<Drawer.Description>
							Configure the settings for the model and messages.
						</Drawer.Description>
					</Drawer.Header>
					<form class="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
						<fieldset class="grid gap-6 rounded-lg border p-4">
							<legend class="-ml-1 px-1 text-sm font-medium"> Settings </legend>
							<div class="grid gap-3">
								<Label for="model">Model</Label>
								<Select.Root type="single" bind:value={model}>
									<Select.Trigger
										id="model"
										class="items-start [&_[data-description]]:hidden"
									>
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
							<div class="grid gap-3">
								<Label for="top-p">Top P</Label>
								<Input id="top-p" type="number" placeholder="0.7" />
							</div>
							<div class="grid gap-3">
								<Label for="top-k">Top K</Label>
								<Input id="top-k" type="number" placeholder="0.0" />
							</div>
						</fieldset>
						<fieldset class="grid gap-6 rounded-lg border p-4">
							<legend class="-ml-1 px-1 text-sm font-medium"> Messages </legend>
							<div class="grid gap-3">
								<Label for="role">Role</Label>
								<Select.Root type="single" bind:value={role}>
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
								<Textarea id="content" placeholder="You are a..." />
							</div>
						</fieldset>
					</form>
				</Drawer.Content>
			</Drawer.Root>
			<Button variant="outline" size="sm" class="ml-auto gap-1.5 text-sm">
				<Share class="size-3.5" />
				Share
			</Button>
		</header>
		<main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
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
								<Select.Trigger
									id="model"
									class="items-start [&_[data-description]]:hidden"
								>
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
							<Textarea
								id="content"
								placeholder="You are a..."
								class="min-h-[9.5rem]"
							/>
						</div>
					</fieldset>
				</form>
			</div>
			<div
				class="bg-muted/50 relative flex h-full min-h-[50vh] flex-col rounded-xl p-4 lg:col-span-2"
			>
				<Badge variant="outline" class="absolute right-3 top-3">Output</Badge>
				<div class="flex-1"></div>
				<form
					class="bg-background focus-within:ring-ring relative overflow-hidden rounded-lg border focus-within:ring-1"
					data-x-chunk-name="dashboard-03-chunk-1"
					data-x-chunk-description="A form for sending a message to an AI chatbot. The form has a textarea and buttons to upload files and record audio."
				>
					<Label for="message" class="sr-only">Message</Label>
					<Textarea
						id="message"
						placeholder="Type your message here..."
						class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
					/>
					<div class="flex items-center p-3 pt-0">
						<Tooltip.Provider>
							<Tooltip.Root>
								<Tooltip.Trigger>
									{#snippet child({ props })}
										<Button {...props} size="icon" variant="ghost">
											<Paperclip class="size-4" />
											<span class="sr-only">Attach file</span>
										</Button>
									{/snippet}
								</Tooltip.Trigger>
								<Tooltip.Content side="top">Attach File</Tooltip.Content>
							</Tooltip.Root>
							<Tooltip.Root>
								<Tooltip.Trigger>
									{#snippet child({ props })}
										<Button {...props} size="icon" variant="ghost">
											<Mic class="size-4" />
											<span class="sr-only">Use Microphone</span>
										</Button>
									{/snippet}
								</Tooltip.Trigger>
								<Tooltip.Content side="top">Use Microphone</Tooltip.Content>
							</Tooltip.Root>
						</Tooltip.Provider>
						<Button type="submit" size="sm" class="ml-auto gap-1.5">
							Send Message
							<CornerDownLeft class="size-3.5" />
						</Button>
					</div>
				</form>
			</div>
		</main>
	</div>
</div>
