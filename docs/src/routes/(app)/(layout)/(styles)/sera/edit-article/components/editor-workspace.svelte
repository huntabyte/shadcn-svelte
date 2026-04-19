<script lang="ts">
	import AlignCenterIcon from "@lucide/svelte/icons/align-center";
	import AlignLeftIcon from "@lucide/svelte/icons/align-left";
	import AlignRightIcon from "@lucide/svelte/icons/align-right";
	import BoldIcon from "@lucide/svelte/icons/bold";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import Code2Icon from "@lucide/svelte/icons/code-2";
	import Heading1Icon from "@lucide/svelte/icons/heading-1";
	import Heading2Icon from "@lucide/svelte/icons/heading-2";
	import Heading3Icon from "@lucide/svelte/icons/heading-3";
	import ImageIcon from "@lucide/svelte/icons/image";
	import ItalicIcon from "@lucide/svelte/icons/italic";
	import LinkIcon from "@lucide/svelte/icons/link";
	import ListIcon from "@lucide/svelte/icons/list";
	import ListOrderedIcon from "@lucide/svelte/icons/list-ordered";
	import RedoIcon from "@lucide/svelte/icons/redo";
	import StrikethroughIcon from "@lucide/svelte/icons/strikethrough";
	import TypeIcon from "@lucide/svelte/icons/type";
	import UnderlineIcon from "@lucide/svelte/icons/underline";
	import UndoIcon from "@lucide/svelte/icons/undo";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Progress } from "$lib/registry/ui/progress/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";

	type Milestone = {
		name: string;
		complete: boolean;
		note?: string;
	};

	const MILESTONES: Milestone[] = [
		{ name: "Outline & Commissioning", complete: true },
		{ name: "First Draft Submitted", complete: true },
		{ name: "Review & Revisions", complete: false, note: "Waiting on editor" },
		{ name: "Final Copy Edit", complete: false },
		{ name: "Art Direction & Layout", complete: false },
	];

	const ISSUES = [
		{ label: "Spring Issue 2024", value: "spring-2024" },
		{ label: "Summer Issue 2024", value: "summer-2024" },
		{ label: "Autumn Issue 2024", value: "autumn-2024" },
		{ label: "Winter Issue 2024", value: "winter-2024" },
	];

	let selectedIssue = $state("summer-2024");
	const selectedIssueLabel = $derived(
		ISSUES.find((i) => i.value === selectedIssue)?.label ?? "Select an issue"
	);
</script>

<div class="grid grid-cols-1 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
	<section class="border-border/70 bg-background flex flex-col border">
		<div class="flex border-b p-2">
			<ButtonGroup.Root>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="ghost" size="sm">
								Normal Text
								<ChevronDownIcon data-icon="inline-end" />
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content>
						<DropdownMenu.Item>
							<TypeIcon />
							Normal Text
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<Heading1Icon />
							Heading 1
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<Heading2Icon />
							Heading 2
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<Heading3Icon />
							Heading 3
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<ListIcon />
							Bullet List
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<ListOrderedIcon />
							Numbered List
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
				<ButtonGroup.Separator class="mx-2 data-vertical:h-4 data-vertical:self-center" />
				<Button variant="ghost" size="icon-sm" aria-label="Bold">
					<BoldIcon />
				</Button>
				<Button variant="ghost" size="icon-sm" aria-label="Italic">
					<ItalicIcon />
				</Button>
				<Button variant="ghost" size="icon-sm" aria-label="Underline">
					<UnderlineIcon />
				</Button>
				<Button
					variant="ghost"
					size="icon-sm"
					aria-label="Strikethrough"
					class="hidden md:flex"
				>
					<StrikethroughIcon />
				</Button>
				<Button variant="ghost" size="icon-sm" aria-label="Code" class="hidden md:flex">
					<Code2Icon />
				</Button>
				<ButtonGroup.Separator
					class="mx-2 hidden data-vertical:h-4 data-vertical:self-center md:flex"
				/>
				<Button
					variant="ghost"
					size="icon-sm"
					aria-label="Align Left"
					class="hidden md:flex"
				>
					<AlignLeftIcon />
				</Button>
				<Button
					variant="ghost"
					size="icon-sm"
					aria-label="Align Center"
					class="hidden md:flex"
				>
					<AlignCenterIcon />
				</Button>
				<Button
					variant="ghost"
					size="icon-sm"
					aria-label="Align Right"
					class="hidden md:flex"
				>
					<AlignRightIcon />
				</Button>
				<ButtonGroup.Separator
					class="mx-2 hidden data-vertical:h-4 data-vertical:self-center md:flex"
				/>
				<Button variant="ghost" size="icon-sm" aria-label="Link" class="hidden md:flex">
					<LinkIcon />
				</Button>
				<Button variant="ghost" size="icon-sm" aria-label="Image" class="hidden md:flex">
					<ImageIcon />
				</Button>
			</ButtonGroup.Root>
			<ButtonGroup.Root class="ml-auto">
				<Button variant="ghost" size="icon-sm" aria-label="Undo">
					<UndoIcon />
				</Button>
				<Button variant="ghost" size="icon-sm" aria-label="Redo">
					<RedoIcon />
				</Button>
			</ButtonGroup.Root>
		</div>
		<div
			class="mx-auto flex max-w-2xl flex-1 flex-col gap-8 px-10 py-10 leading-loose md:px-14 lg:py-18"
		>
			<h1 class="font-heading text-4xl leading-12 font-medium tracking-wide uppercase">
				The Future of Sustainable Architecture
			</h1>
			<p>
				As cities continue to expand at an unprecedented rate, the architectural paradigm is
				shifting from mere expansion to sustainable integration. The concrete jungles of the
				20th century are making way for structures that breathe, adapt, and give back to
				their environments.
			</p>
			<p>Historically, urban development has been a zero-sum game with nature.</p>
			<h2 class="font-heading text-2xl tracking-wide uppercase">
				The Living Building Challenge
			</h2>
			<p>
				Sterling's latest project in downtown Seattle is a testament to this new philosophy.
				"We are no longer designing static structures," Sterling explained during a recent
				site visit. "We are engineering localized ecosystems."
			</p>
			<p>
				The building features a facade of responsive biomaterials that adjust their porosity
				based on humidity and temperature, significantly reducing the need for artificial
				climate control. Rainwater is not merely channeled away but captured, filtered
				through a series of integrated rooftop wetlands, and reused within the building's
				greywater system.
			</p>
			<p class="text-muted-foreground text-sm">
				This shift requires more than just innovative materials; it demands a fundamental
				change in how we value space. Check with engineering team for specific stats.
			</p>
		</div>
	</section>
	<aside class="grid grid-cols-12 gap-(--gap) xl:flex xl:flex-col">
		<Card.Root class="col-span-full md:col-span-6 lg:col-span-4">
			<Card.Header>
				<Card.Title>Article Details</Card.Title>
			</Card.Header>
			<Card.Content>
				<Field.Group>
					<Field.Field>
						<Field.Label>Issue</Field.Label>
						<Select.Root type="single" bind:value={selectedIssue}>
							<Select.Trigger class="w-full">
								{selectedIssueLabel}
							</Select.Trigger>
							<Select.Content>
								<Select.Group>
									{#each ISSUES as issue (issue.value)}
										<Select.Item value={issue.value} label={issue.label}>
											{issue.label}
										</Select.Item>
									{/each}
								</Select.Group>
							</Select.Content>
						</Select.Root>
					</Field.Field>
					<Field.Field>
						<Field.Label>Author</Field.Label>
						<Input value="Elena Rostova" />
					</Field.Field>
				</Field.Group>
			</Card.Content>
		</Card.Root>
		<Card.Root class="col-span-full md:col-span-6 lg:col-span-4">
			<Card.Header>
				<Card.Title>Publication Flow</Card.Title>
			</Card.Header>
			<Card.Content>
				<Field.Group>
					<Field.Set>
						<Field.Legend>Required Milestones</Field.Legend>
						<Field.Field>
							{#each MILESTONES as milestone (milestone.name)}
								<Field.Field orientation="horizontal">
									<Checkbox
										checked={milestone.complete}
										name={milestone.name}
										id={milestone.name}
									/>
									<Field.Label for={milestone.name}>{milestone.name}</Field.Label>
								</Field.Field>
							{/each}
						</Field.Field>
					</Field.Set>
					<Field.Field>
						<Field.Label>Add note for editor</Field.Label>
						<Textarea
							placeholder="This article needs to be revised for clarity and accuracy."
						/>
					</Field.Field>
				</Field.Group>
			</Card.Content>
		</Card.Root>
		<Card.Root class="col-span-full lg:col-span-4">
			<Card.Header>
				<Card.Title>Word Count</Card.Title>
			</Card.Header>
			<Card.Content>
				<div class="flex flex-col gap-2">
					<div class="flex justify-between text-sm">
						<span>1,402 / 2,000 words</span>
						<span class="text-muted-foreground">70%</span>
					</div>
					<Progress value={70} />
				</div>
			</Card.Content>
		</Card.Root>
	</aside>
</div>
