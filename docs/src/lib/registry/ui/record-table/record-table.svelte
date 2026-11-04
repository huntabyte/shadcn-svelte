<script lang="ts" module>
	import { tick, type Snippet } from "svelte";

	export type RecordTableColumn<TData> = {
		id: string;
		/** The column heading. */
		header: string;
		/** The value for sorting and filtering, and the cell text when there is no `cell` snippet. */
		accessor?: (row: TData) => string | number | boolean | null | undefined;
		/** A custom cell. It receives the row and the accessor's value. */
		cell?: Snippet<[{ row: TData; value: unknown }]>;
		/** Click the heading to sort. Default: true when there is an accessor. */
		sortable?: boolean;
		/** Include this column in the text filter. Default: true when there is an accessor. */
		filterable?: boolean;
		align?: "start" | "end";
		/** A CSS width for the column, for example "12rem". */
		width?: string;
		class?: string;
	};
</script>

<script lang="ts" generics="TData extends RowData">
	import {
		type RowData,
		type RowSelectionState,
		createColumnHelper,
		createSortedRowModel,
		createTable,
		rowSelectionFeature,
		rowSortingFeature,
		sortFn_alphanumeric,
		tableFeatures,
	} from "@tanstack/svelte-table";
	import * as Table from "$lib/registry/ui/table/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";
	import { cn } from "$lib/utils.js";

	// Ported from the shadcn-svelte Data Table (TanStack Table v9 with the Table component), wrapped so an app describes
	// its columns and does not write TanStack code. Twenty look: 32px rows, a sticky header, an "Add new" row at the bottom.
	let {
		data,
		columns,
		getRowId,
		filter = "",
		selectable = false,
		selectedIds = $bindable([]),
		onRowClick,
		onCreate,
		onCreateError,
		createPlaceholder = "Name",
		createLabel = "Add new",
		loading = false,
		empty,
		maxHeight,
		stickyFirstColumn = false,
		class: className,
	}: {
		data: TData[];
		columns: RecordTableColumn<TData>[];
		/** A stable id per row. Needed for selection and for keeping the rows in place while you sort. */
		getRowId: (row: TData) => string;
		/** Only the rows where a filterable column contains this text (case insensitive). */
		filter?: string;
		/** Show a checkbox column. */
		selectable?: boolean;
		/** The ids of the selected rows, bindable. */
		selectedIds?: string[];
		/** Called when a row is clicked, or Enter is pressed on a focused row. */
		onRowClick?: (row: TData) => void;
		/** Called with the typed text from the "Add new" row. The row is not shown without it. */
		onCreate?: (value: string) => void | Promise<void>;
		/** Called when `onCreate` throws or rejects. The typed text is kept and the input is marked invalid. */
		onCreateError?: (error: unknown, value: string) => void;
		createPlaceholder?: string;
		createLabel?: string;
		/** Show skeleton rows while there is no data yet. */
		loading?: boolean;
		/** What to show when there are no rows. */
		empty?: Snippet;
		/** A CSS height. The body scrolls under the sticky header. */
		maxHeight?: string;
		/** Keep the first data column in view while scrolling sideways. */
		stickyFirstColumn?: boolean;
		class?: string;
	} = $props();

	// Numbers compare as numbers (so 1.25 sorts before 1.5 and -10 before -5); everything else sorts alphanumerically.
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const sortSmart = (rowA: any, rowB: any, columnId: string) => {
		const a = rowA.getValue(columnId);
		const b = rowB.getValue(columnId);
		if (typeof a === "number" && typeof b === "number") return a === b ? 0 : a < b ? -1 : 1;
		return sortFn_alphanumeric(rowA, rowB, columnId);
	};

	const features = tableFeatures({
		rowSelectionFeature,
		rowSortingFeature,
		sortedRowModel: createSortedRowModel(),
		sortFns: { alphanumeric: sortFn_alphanumeric, smart: sortSmart },
	});
	const columnHelper = createColumnHelper<typeof features, TData>();

	const tanColumns = $derived(
		columnHelper.columns(
			columns.map((col) =>
				col.accessor
					? columnHelper.accessor((row: TData) => col.accessor?.(row) ?? "", {
							id: col.id,
							header: col.header,
							sortFn: "smart",
							enableSorting: col.sortable ?? true,
						})
					: columnHelper.display({ id: col.id, header: col.header })
			)
		)
	);

	const filtered = $derived.by(() => {
		const q = filter.trim().toLowerCase();
		// Always a new array: TanStack memoizes on the identity of `data`, and a parent that pushes onto its $state array
		// keeps the same identity. Reading the array here also makes this derived value depend on its items.
		if (!q) return data.slice();
		const searchable = columns.filter((c) => c.accessor && (c.filterable ?? true));
		return data.filter((row) =>
			searchable.some((c) =>
				String(c.accessor?.(row) ?? "")
					.toLowerCase()
					.includes(q)
			)
		);
	});

	// Selection is controlled by selectedIds, so the parent can read it and clear it.
	const selection = $derived<RowSelectionState>(
		Object.fromEntries(selectedIds.map((id) => [id, true]))
	);

	const table = createTable({
		features,
		get data() {
			return filtered;
		},
		get columns() {
			return tanColumns;
		},
		getRowId: (row: TData) => getRowId(row),
		state: {
			get rowSelection() {
				return selection;
			},
		},
		onRowSelectionChange: (
			updater: RowSelectionState | ((old: RowSelectionState) => RowSelectionState)
		) => {
			const next = typeof updater === "function" ? updater(selection) : updater;
			selectedIds = Object.keys(next).filter((id) => next[id]);
		},
	});

	// Only visible rows can be selected: a row hidden by the filter, or removed from data, is dropped from selectedIds,
	// so a bulk action never touches rows the user cannot see.
	$effect(() => {
		if (!selectedIds.length) return;
		const visible = new Set(filtered.map((row) => getRowId(row)));
		const next = selectedIds.filter((id) => visible.has(id));
		if (next.length !== selectedIds.length) selectedIds = next;
	});

	const rows = $derived(table.getRowModel().rows);
	const colCount = $derived(columns.length + (selectable ? 1 : 0));

	// Inline create: a row at the bottom that turns into an input.
	let creating = $state(false);
	let draft = $state("");
	let busy = $state(false);
	let createInput = $state<HTMLInputElement | null>(null);

	let invalid = $state(false);

	async function submit() {
		const value = draft.trim();
		if (!value || busy) return;
		busy = true;
		invalid = false;
		try {
			await onCreate?.(value);
			draft = "";
		} catch (error) {
			invalid = true;
			onCreateError?.(error, value);
		} finally {
			busy = false;
		}
		// The input is readonly while busy (not disabled, which would drop focus); focus it again once the DOM settles.
		await tick();
		createInput?.focus();
	}

	function cancel() {
		creating = false;
		draft = "";
		invalid = false;
	}

	function rowClick(event: Event, row: TData) {
		if (!onRowClick) return;
		// A click on a control inside the row (checkbox, link, button, input) is not a click on the row.
		if ((event.target as HTMLElement).closest("button, a, input, label, [role='checkbox']")) return;
		onRowClick(row);
	}

	function rowKeydown(event: KeyboardEvent, row: TData) {
		if ((event.key === "Enter" || event.key === " ") && event.target === event.currentTarget) {
			event.preventDefault();
			onRowClick?.(row);
		}
	}

	const sortLabel = { asc: "ascending", desc: "descending" } as const;
	const alignClass = (a?: "start" | "end") => (a === "end" ? "text-end" : "");
</script>

<div
	data-slot="record-table"
	class={cn(
		"relative w-full overflow-auto [&_[data-slot=table-container]]:overflow-visible",
		className
	)}
	style:max-height={maxHeight}
>
	<Table.Root>
		<Table.Header>
			{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
				<Table.Row class="hover:bg-transparent">
					{#if selectable}
						<Table.Head class="sticky top-0 left-0 z-20 w-8 max-w-8 min-w-8 bg-background">
							<Checkbox
								aria-label="Select all"
								checked={table.getIsAllRowsSelected()}
								indeterminate={table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
								onCheckedChange={(v) => table.toggleAllRowsSelected(!!v)}
							/>
						</Table.Head>
					{/if}
					{#each headerGroup.headers as header, i (header.id)}
						{@const def = columns.find((c) => c.id === header.column.id)}
						{@const sorted = header.column.getIsSorted()}
						<Table.Head
							aria-sort={sorted ? (sorted === "asc" ? "ascending" : "descending") : undefined}
							style={def?.width ? `width: ${def.width}` : undefined}
							class={cn(
								"sticky top-0 z-10 bg-background",
								stickyFirstColumn && i === 0 && "left-0 z-20",
								stickyFirstColumn && i === 0 && selectable && "left-8",
								alignClass(def?.align)
							)}
						>
							{#if header.column.getCanSort()}
								<Button
									type="button"
									variant="ghost"
									size="sm"
									class={cn(
										"-ms-2 h-6 gap-1 px-2 font-medium text-muted-foreground hover:text-foreground",
										def?.align === "end" && "ms-0 -me-2 flex-row-reverse"
									)}
									onclick={header.column.getToggleSortingHandler()}
									aria-label="Sort by {def?.header}{sorted ? `, ${sortLabel[sorted]}` : ''}"
								>
									{def?.header}
									{#if sorted === "asc"}
										<IconPlaceholder
											lucide="ArrowUpIcon"
											tabler="IconArrowUp"
											hugeicons="ArrowUp01Icon"
											phosphor="CaretUpIcon"
											remixicon="RiArrowUpSLine"
											class="size-3"
										/>
									{:else if sorted === "desc"}
										<IconPlaceholder
											lucide="ArrowDownIcon"
											tabler="IconArrowDown"
											hugeicons="ArrowDown01Icon"
											phosphor="CaretDownIcon"
											remixicon="RiArrowDownSLine"
											class="size-3"
										/>
									{/if}
								</Button>
							{:else}
								{def?.header}
							{/if}
						</Table.Head>
					{/each}
				</Table.Row>
			{/each}
		</Table.Header>
		<Table.Body>
			{#if loading && !data.length}
				{#each [0, 1, 2, 3, 4] as i (i)}
					<Table.Row class="h-[var(--twenty-table-row-height,2rem)]">
						<Table.Cell colspan={colCount}><Skeleton class="h-4 w-1/3" /></Table.Cell>
					</Table.Row>
				{/each}
			{:else}
				{#each rows as row (row.id)}
					<Table.Row
						data-state={row.getIsSelected() ? "selected" : undefined}
						tabindex={onRowClick ? 0 : undefined}
						class={cn(
							"h-[var(--twenty-table-row-height,2rem)] bg-background",
							onRowClick &&
								"cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
						)}
						onclick={(e: MouseEvent) => rowClick(e, row.original)}
						onkeydown={(e: KeyboardEvent) => rowKeydown(e, row.original)}
					>
						{#if selectable}
							<Table.Cell
								class="sticky left-0 z-[1] w-8 max-w-8 min-w-8 bg-inherit"
								onclick={(e: MouseEvent) => e.stopPropagation()}
							>
								<Checkbox
									aria-label="Select row"
									checked={row.getIsSelected()}
									onCheckedChange={(v) => row.toggleSelected(!!v)}
								/>
							</Table.Cell>
						{/if}
						{#each columns as def, i (def.id)}
							{@const value = def.accessor?.(row.original)}
							<Table.Cell
								class={cn(
									stickyFirstColumn && i === 0 && "sticky z-[1] bg-inherit",
									stickyFirstColumn && i === 0 && (selectable ? "left-8" : "left-0"),
									alignClass(def.align),
									def.class
								)}
							>
								{#if def.cell}
									{@render def.cell({ row: row.original, value })}
								{:else}
									{value ?? ""}
								{/if}
							</Table.Cell>
						{/each}
					</Table.Row>
				{:else}
					<Table.Row class="hover:bg-transparent">
						<Table.Cell colspan={colCount} class="h-24 text-center text-muted-foreground">
							{#if empty}
								{@render empty()}
							{:else}
								{filter.trim() ? "No results." : "No records."}
							{/if}
						</Table.Cell>
					</Table.Row>
				{/each}
			{/if}
			{#if onCreate}
				<Table.Row class="h-[var(--twenty-table-row-height,2rem)] hover:bg-transparent">
					<Table.Cell colspan={colCount} class="py-0">
						{#if creating}
							<Input
								bind:ref={createInput}
								bind:value={draft}
								aria-label={createPlaceholder}
								placeholder={createPlaceholder}
								readonly={busy}
								aria-invalid={invalid || undefined}
								class="my-1 h-6 max-w-xs"
								oninput={() => (invalid = false)}
								onkeydown={(e: KeyboardEvent) => {
									if (e.key === "Enter") {
										e.preventDefault();
										submit();
									} else if (e.key === "Escape") cancel();
								}}
								onblur={() => {
									if (!draft.trim()) cancel();
								}}
							/>
						{:else}
							<Button
								type="button"
								variant="ghost"
								size="sm"
								class="-ms-2 gap-2 px-2 text-muted-foreground hover:text-foreground"
								onclick={async () => {
									creating = true;
									await tick();
									createInput?.focus();
								}}
							>
								<IconPlaceholder
									lucide="PlusIcon"
									tabler="IconPlus"
									hugeicons="PlusSignIcon"
									phosphor="PlusIcon"
									remixicon="RiAddLine"
									class="size-3.5"
								/>
								{createLabel}
							</Button>
						{/if}
					</Table.Cell>
				</Table.Row>
			{/if}
		</Table.Body>
	</Table.Root>
</div>
