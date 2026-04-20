<script lang="ts">
	import CalendarIcon from "@lucide/svelte/icons/calendar";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { RangeCalendar } from "$lib/registry/ui/range-calendar/index.js";
	import * as Card from "$lib/registry/ui/card/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";
	import { SvelteSet } from "svelte/reactivity";
	import { CalendarDate, DateFormatter, getLocalTimeZone } from "@internationalized/date";
	import type { DateRange } from "bits-ui";

	const df = new DateFormatter("en-US", { dateStyle: "medium" });

	const FILE_TYPES = [
		{ id: "images", label: "Images (JPEG, PNG, WEBP)", defaultChecked: true },
		{ id: "video", label: "Video (MP4, MOV)", defaultChecked: false },
		{ id: "documents", label: "Documents (PDF)", defaultChecked: false },
		{ id: "audio", label: "Audio (MP3, WAV)", defaultChecked: false },
	];

	const DATE_OPTIONS = [
		{ value: "any", label: "Any time" },
		{ value: "24h", label: "Past 24 hours" },
		{ value: "week", label: "Past week" },
		{ value: "month", label: "Past month" },
	];

	const TAGS = [
		"architecture",
		"brutalism",
		"ceramics",
		"design-week",
		"editorial",
		"exterior",
		"film",
		"food",
		"furniture",
		"interior",
		"kyoto",
		"minimalism",
		"print",
		"sustainability",
		"summer-issue",
		"video",
	] as const;

	const now = new CalendarDate(2024, 10, 1);
	let dateRange = $state<DateRange>({
		start: now,
		end: now.add({ days: 21 }),
	});

	let selectedTags = new SvelteSet(["architecture", "brutalism"]);
	let dateFilter = $state("any");
	let sizeRange = $state([0, 60]);

	function toggleTag(tag: string) {
		if (selectedTags.has(tag)) {
			selectedTags.delete(tag);
		} else {
			selectedTags.add(tag);
		}
	}

	const dateRangeLabel = $derived.by(() => {
		if (!dateRange?.start) return "Pick a date range";
		const start = df.format(dateRange.start.toDate(getLocalTimeZone()));
		if (!dateRange.end) return start;
		const end = df.format(dateRange.end.toDate(getLocalTimeZone()));
		return `${start} – ${end}`;
	});
</script>

<Card.Root>
	<Card.Header class="border-b">
		<Card.Title>Filter Library</Card.Title>
	</Card.Header>
	<Card.Content>
		<Field.Group>
			<Field.Set>
				<Field.Legend>File Type</Field.Legend>
				<Field.Field>
					{#each FILE_TYPES as type (type.id)}
						<Field.Field orientation="horizontal">
							<Checkbox id={type.id} checked={type.defaultChecked} />
							<Field.Label for={type.id}>{type.label}</Field.Label>
						</Field.Field>
					{/each}
				</Field.Field>
			</Field.Set>
			<Field.Set>
				<Field.Legend>Date Uploaded</Field.Legend>
				<RadioGroup.Root bind:value={dateFilter}>
					{#each DATE_OPTIONS as option (option.value)}
						<Field.Field orientation="horizontal">
							<RadioGroup.Item value={option.value} id={`date-${option.value}`} />
							<Field.Label for={`date-${option.value}`}>{option.label}</Field.Label>
						</Field.Field>
					{/each}
				</RadioGroup.Root>
			</Field.Set>
			<Field.Field>
				<Field.Label for="custom-range">Custom Range</Field.Label>
				<Popover.Root>
					<Popover.Trigger>
						{#snippet child({ props })}
							<Button
								{...props}
								variant="outline"
								id="custom-range"
								class="w-full justify-start font-normal"
							>
								<CalendarIcon data-icon="inline-start" />
								{dateRangeLabel}
							</Button>
						{/snippet}
					</Popover.Trigger>
					<Popover.Content class="w-auto p-0" align="end">
						<RangeCalendar bind:value={dateRange} numberOfMonths={2} />
					</Popover.Content>
				</Popover.Root>
			</Field.Field>
			<Field.Set>
				<Field.Legend>File Size</Field.Legend>
				<div class="flex flex-col gap-3">
					<div
						class="text-muted-foreground flex items-center justify-between text-xs font-medium tracking-wider uppercase"
					>
						<span>0 MB</span>
						<span>500+ MB</span>
					</div>
					<Slider type="multiple" bind:value={sizeRange} max={100} step={1} />
					<div class="flex items-center justify-between text-xs font-medium">
						<span>Min: 0 MB</span>
						<span>Max: 300 MB</span>
					</div>
				</div>
			</Field.Set>
			<Field.Set>
				<Field.Legend>Tags</Field.Legend>
				<div class="flex flex-wrap gap-x-4 gap-y-2">
					{#each TAGS as tag (tag)}
						<Field.Field orientation="horizontal">
							<Checkbox
								id={`tag-${tag}`}
								checked={selectedTags.has(tag)}
								onCheckedChange={() => toggleTag(tag)}
							/>
							<Field.Label for={`tag-${tag}`}>{tag}</Field.Label>
						</Field.Field>
					{/each}
				</div>
			</Field.Set>
		</Field.Group>
	</Card.Content>
	<Card.Footer class="flex flex-col gap-2 border-t">
		<Button class="w-full">Apply Filters</Button>
		<Button variant="ghost" class="w-full">Reset</Button>
	</Card.Footer>
</Card.Root>
