<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import DownloadIcon from "@lucide/svelte/icons/download";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as ButtonGroup from "$lib/registry/ui/button-group/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";

	const EXPORT_DATE_OPTIONS = [
		{ label: "Last 7 days", value: "last-7-days" },
		{ label: "Last 30 days", value: "last-30-days" },
		{ label: "This month", value: "this-month" },
		{ label: "Last month", value: "last-month" },
	];

	let selectedDateRange = $state("last-30-days");

	const selectedDateRangeLabel = $derived(
		EXPORT_DATE_OPTIONS.find((o) => o.value === selectedDateRange)?.label ?? "Last 30 days"
	);
</script>

<header>
	<div
		class="container flex flex-col items-center justify-center gap-(--gap) py-(--gap) sm:flex-row sm:justify-between"
	>
		<div class="flex flex-col gap-2 text-center sm:text-left">
			<h1
				class="font-heading line-clamp-1 text-3xl tracking-wide uppercase md:text-3xl lg:text-4xl"
			>
				Audience Analytics
			</h1>
			<div
				class="text-muted-foreground line-clamp-1 text-sm font-medium tracking-wider uppercase"
			>
				Editorial Performance Dashboard
			</div>
		</div>
		<ButtonGroup.Root class="gap-2 sm:ml-auto md:gap-4">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button
							{...props}
							variant="outline"
							class="bg-background hover:bg-background/80 data-[state=open]:bg-background"
						>
							{selectedDateRangeLabel}
							<ChevronDownIcon data-icon="inline-end" />
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<DropdownMenu.Group>
						<DropdownMenu.RadioGroup bind:value={selectedDateRange}>
							{#each EXPORT_DATE_OPTIONS as option (option.value)}
								<DropdownMenu.RadioItem value={option.value}>
									{option.label}
								</DropdownMenu.RadioItem>
							{/each}
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
			<Button>
				<DownloadIcon data-icon="inline-start" />
				<span class="lg:hidden">Export</span>
				<span class="hidden lg:inline">Export Report</span>
			</Button>
		</ButtonGroup.Root>
	</div>
</header>
