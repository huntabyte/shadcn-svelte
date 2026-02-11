<script lang="ts">
	import AtIcon from "@lucide/svelte/icons/at-sign";
	import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
	import AppsIcon from "@lucide/svelte/icons/grid-3x3";
	import BookIcon from "@lucide/svelte/icons/book";
	import CirclePlusIcon from "@lucide/svelte/icons/circle-plus";
	import PaperclipIcon from "@lucide/svelte/icons/paperclip";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import XIcon from "@lucide/svelte/icons/x";
	import { Avatar, AvatarFallback, AvatarImage } from "$lib/registry/ui/avatar/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import * as Command from "$lib/registry/ui/command/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as InputGroup from "$lib/registry/ui/input-group/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	const SAMPLE_DATA = {
		mentionable: [
			{
				type: "page",
				title: "Meeting Notes",
				image: "📝",
			},
			{
				type: "page",
				title: "Project Dashboard",
				image: "📊",
			},
			{
				type: "page",
				title: "Ideas & Brainstorming",
				image: "💡",
			},
			{
				type: "page",
				title: "Calendar & Events",
				image: "📅",
			},
			{
				type: "page",
				title: "Documentation",
				image: "📚",
			},
			{
				type: "page",
				title: "Goals & Objectives",
				image: "🎯",
			},
			{
				type: "page",
				title: "Budget Planning",
				image: "💰",
			},
			{
				type: "page",
				title: "Team Directory",
				image: "👥",
			},
			{
				type: "page",
				title: "Technical Specs",
				image: "🔧",
			},
			{
				type: "page",
				title: "Analytics Report",
				image: "📈",
			},
			{
				type: "user",
				title: "shadcn",
				image: "https://github.com/shadcn.png",
				workspace: "Workspace",
			},
			{
				type: "user",
				title: "maxleiter",
				image: "https://github.com/maxleiter.png",
				workspace: "Workspace",
			},
			{
				type: "user",
				title: "evilrabbit",
				image: "https://github.com/evilrabbit.png",
				workspace: "Workspace",
			},
		],
		models: [
			{
				name: "Auto",
			},
			{
				name: "Agent Mode",
				badge: "Beta",
			},
			{
				name: "Plan Mode",
			},
		],
	};

	let mentions = $state<string[]>([]);
	let mentionPopoverOpen = $state(false);
	let modelPopoverOpen = $state(false);
	let selectedModel = $state(SAMPLE_DATA.models[0]);
	let scopeMenuOpen = $state(false);

	const grouped = $derived.by(() => {
		return SAMPLE_DATA.mentionable.reduce(
			(acc, item) => {
				const isAvailable = !mentions.includes(item.title);

				if (isAvailable) {
					if (!acc[item.type]) {
						acc[item.type] = [];
					}
					acc[item.type].push(item);
				}
				return acc;
			},
			{} as Record<string, typeof SAMPLE_DATA.mentionable>
		);
	});

	const hasMentions = $derived(mentions.length > 0);
</script>

{#snippet MentionableIcon({ item }: { item: (typeof SAMPLE_DATA.mentionable)[0] })}
	{#if item.type === "page"}
		<span class="flex size-4 items-center justify-center">
			{item.image}
		</span>
	{:else}
		<Avatar class="size-4">
			<AvatarImage src={item.image} />
			<AvatarFallback>{item.title[0]}</AvatarFallback>
		</Avatar>
	{/if}
{/snippet}

<form class="[--radius:1.2rem]">
	<Field.Group>
		<Field.Label for="notion-prompt" class="sr-only">Prompt</Field.Label>
		<InputGroup.Root>
			<InputGroup.Textarea
				id="notion-prompt"
				placeholder="Ask, search, or make anything..."
			/>
			<InputGroup.Addon align="block-start">
				<Popover.Root bind:open={mentionPopoverOpen}>
					<Tooltip.Root ignoreNonKeyboardFocus>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<Popover.Trigger {...props}>
									{#snippet child({ props })}
										<InputGroup.Button
											{...props}
											variant="outline"
											size={!hasMentions ? "sm" : "icon-sm"}
											class="rounded-full transition-transform"
										>
											<AtIcon />
											{#if !hasMentions}
												Add context
											{/if}
										</InputGroup.Button>
									{/snippet}
								</Popover.Trigger>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>Mention a person, page, or date</Tooltip.Content>
					</Tooltip.Root>
					<Popover.Content class="p-0 [--radius:1.2rem]" align="start">
						<Command.Root>
							<Command.Input placeholder="Search pages..." />
							<Command.List>
								<Command.Empty>No pages found</Command.Empty>
								{#each Object.entries(grouped) as [type, items] (type)}
									<Command.Group heading={type === "page" ? "Pages" : "Users"}>
										{#each items as item (item.title)}
											<Command.Item
												value={item.title}
												onSelect={() => {
													mentions = [...mentions, item.title];
													mentionPopoverOpen = false;
												}}
											>
												{@render MentionableIcon({ item })}
												{item.title}
											</Command.Item>
										{/each}
									</Command.Group>
								{/each}
							</Command.List>
						</Command.Root>
					</Popover.Content>
				</Popover.Root>
				<div class="no-scrollbar -m-1.5 flex gap-1 overflow-y-auto p-1.5">
					{#each mentions as mention (mention)}
						{@const item = SAMPLE_DATA.mentionable.find(
							(item) => item.title === mention
						)}
						{#if item}
							<InputGroup.Button
								size="sm"
								variant="secondary"
								class="rounded-full !ps-2"
								onclick={() => {
									mentions = mentions.filter((m) => m !== mention);
								}}
							>
								{@render MentionableIcon({ item })}
								{item.title}
								<XIcon />
							</InputGroup.Button>
						{/if}
					{/each}
				</div>
			</InputGroup.Addon>
			<InputGroup.Addon align="block-end" class="gap-1">
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<InputGroup.Button
								{...props}
								size="icon-sm"
								class="rounded-full"
								aria-label="Attach file"
							>
								<PaperclipIcon />
							</InputGroup.Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content>Attach file</Tooltip.Content>
				</Tooltip.Root>
				<DropdownMenu.Root bind:open={modelPopoverOpen}>
					<Tooltip.Root>
						<Tooltip.Trigger>
							{#snippet child({ props })}
								<DropdownMenu.Trigger {...props}>
									{#snippet child({ props })}
										<InputGroup.Button
											{...props}
											size="sm"
											class="rounded-full"
										>
											{selectedModel.name}
										</InputGroup.Button>
									{/snippet}
								</DropdownMenu.Trigger>
							{/snippet}
						</Tooltip.Trigger>
						<Tooltip.Content>Select AI model</Tooltip.Content>
					</Tooltip.Root>
					<DropdownMenu.Content side="top" align="start" class="[--radius:1rem]">
						<DropdownMenu.Group class="w-42">
							<DropdownMenu.Label class="text-muted-foreground text-xs">
								Select Agent Mode
							</DropdownMenu.Label>
							{#each SAMPLE_DATA.models as model (model.name)}
								<DropdownMenu.CheckboxItem
									checked={model.name === selectedModel.name}
									onCheckedChange={(checked) => {
										if (checked) {
											selectedModel = model;
										}
									}}
									class="ps-2 *:[span:first-child]:start-auto *:[span:first-child]:end-2"
								>
									{model.name}
									{#if model.badge}
										<Badge
											variant="secondary"
											class="h-5 rounded-sm bg-blue-100 px-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-100"
										>
											{model.badge}
										</Badge>
									{/if}
								</DropdownMenu.CheckboxItem>
							{/each}
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<DropdownMenu.Root bind:open={scopeMenuOpen}>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<InputGroup.Button {...props} size="sm" class="rounded-full">
								<GlobeIcon /> All Sources
							</InputGroup.Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content side="top" align="end" class="[--radius:1rem]">
						<DropdownMenu.Group>
							<DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
								{#snippet child({ props })}
									<label for="web-search" {...props}>
										<GlobeIcon /> Web Search
										<Switch id="web-search" class="ms-auto" checked />
									</label>
								{/snippet}
							</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
								{#snippet child({ props })}
									<label for="apps" {...props}>
										<AppsIcon /> Apps and Integrations
										<Switch id="apps" class="ms-auto" checked />
									</label>
								{/snippet}
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<CirclePlusIcon /> All Sources I can access
							</DropdownMenu.Item>
							<DropdownMenu.Sub>
								<DropdownMenu.SubTrigger>
									<Avatar class="size-4">
										<AvatarImage src="https://github.com/shadcn.png" />
										<AvatarFallback>CN</AvatarFallback>
									</Avatar>
									shadcn
								</DropdownMenu.SubTrigger>
								<DropdownMenu.SubContent class="w-72 p-0 [--radius:1rem]">
									<Command.Root>
										<Command.Input
											placeholder="Find or use knowledge in..."
											autofocus
										/>
										<Command.List>
											<Command.Empty>No knowledge found</Command.Empty>
											<Command.Group>
												{#each SAMPLE_DATA.mentionable.filter((item) => item.type === "user") as user (user.title)}
													<Command.Item
														value={user.title}
														onSelect={() => {
															// Handle user selection here
															console.log(
																"Selected user:",
																user.title
															);
														}}
													>
														<Avatar class="size-4">
															<AvatarImage src={user.image} />
															<AvatarFallback>
																{user.title[0]}
															</AvatarFallback>
														</Avatar>
														{user.title}
														<span class="text-muted-foreground">
															- {user.workspace}
														</span>
													</Command.Item>
												{/each}
											</Command.Group>
										</Command.List>
									</Command.Root>
								</DropdownMenu.SubContent>
							</DropdownMenu.Sub>
							<DropdownMenu.Item>
								<BookIcon /> Help Center
							</DropdownMenu.Item>
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Item>
								<PlusIcon /> Connect Apps
							</DropdownMenu.Item>
							<DropdownMenu.Label class="text-muted-foreground text-xs">
								We'll only search in the sources selected here.
							</DropdownMenu.Label>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<InputGroup.Button
					aria-label="Send"
					class="ms-auto rounded-full"
					variant="default"
					size="icon-sm"
				>
					<ArrowUpIcon />
				</InputGroup.Button>
			</InputGroup.Addon>
		</InputGroup.Root>
	</Field.Group>
</form>
