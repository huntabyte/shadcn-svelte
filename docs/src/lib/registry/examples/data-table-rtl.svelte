<script lang="ts">
	import ArrowUpDownIcon from "@lucide/svelte/icons/arrow-up-down";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import MoreHorizontalIcon from "@lucide/svelte/icons/ellipsis";
	import {
		FlexRender,
		columnFilteringFeature,
		columnVisibilityFeature,
		createColumnHelper,
		createFilteredRowModel,
		createPaginatedRowModel,
		createSortedRowModel,
		createTable,
		filterFn_includesString,
		renderSnippet,
		rowPaginationFeature,
		rowSelectionFeature,
		rowSortingFeature,
		sortFn_alphanumeric,
		sortFn_text,
		tableFeatures,
	} from "@tanstack/svelte-table";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Table from "$lib/registry/ui/table/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {
				filterEmails: "Filter emails...",
				columns: "Columns",
				status: "Status",
				email: "Email",
				amount: "Amount",
				actions: "Actions",
				copyPaymentId: "Copy payment ID",
				viewCustomer: "View customer",
				viewPaymentDetails: "View payment details",
				selectAll: "Select all",
				selectRow: "Select row",
				openMenu: "Open menu",
				noResults: "No results.",
				rowsSelected: "of",
				rowsSelectedSuffix: "row(s) selected.",
				previous: "Previous",
				next: "Next",
				success: "Success",
				processing: "Processing",
				failed: "Failed",
				pending: "Pending",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				filterEmails: "تصفية البريد الإلكتروني...",
				columns: "الأعمدة",
				status: "الحالة",
				email: "البريد الإلكتروني",
				amount: "المبلغ",
				actions: "الإجراءات",
				copyPaymentId: "نسخ معرف الدفع",
				viewCustomer: "عرض العميل",
				viewPaymentDetails: "عرض تفاصيل الدفع",
				selectAll: "تحديد الكل",
				selectRow: "تحديد الصف",
				openMenu: "فتح القائمة",
				noResults: "لا توجد نتائج.",
				rowsSelected: "من",
				rowsSelectedSuffix: "صف(وف) محدد.",
				previous: "السابق",
				next: "التالي",
				success: "ناجح",
				processing: "قيد المعالجة",
				failed: "فشل",
				pending: "قيد الانتظار",
			},
		},
		he: {
			dir: "rtl",
			values: {
				filterEmails: "סנן אימיילים...",
				columns: "עמודות",
				status: "סטטוס",
				email: "אימייל",
				amount: "סכום",
				actions: "פעולות",
				copyPaymentId: "העתק מזהה תשלום",
				viewCustomer: "צפה בלקוח",
				viewPaymentDetails: "צפה בפרטי תשלום",
				selectAll: "בחר הכל",
				selectRow: "בחר שורה",
				openMenu: "פתח תפריט",
				noResults: "אין תוצאות.",
				rowsSelected: "מתוך",
				rowsSelectedSuffix: "שורות נבחרו.",
				previous: "הקודם",
				next: "הבא",
				success: "הצליח",
				processing: "מעבד",
				failed: "נכשל",
				pending: "ממתין",
			},
		},
	} as const;
	const t = useTranslation(translations, "ar");
	type Payment = {
		id: string;
		amount: number;
		status: "pending" | "processing" | "success" | "failed";
		email: string;
	};
	const data: Payment[] = [
		{
			id: "m5gr84i9",
			amount: 316,
			status: "success",
			email: "ken99@example.com",
		},
		{
			id: "3u1reuv4",
			amount: 242,
			status: "success",
			email: "Abe45@example.com",
		},
		{
			id: "derv1ws0",
			amount: 837,
			status: "processing",
			email: "Monserrat44@example.com",
		},
		{
			id: "5kma53ae",
			amount: 874,
			status: "success",
			email: "Silas22@example.com",
		},
		{
			id: "bhqecj4p",
			amount: 721,
			status: "failed",
			email: "carmella@example.com",
		},
	];
	const features = tableFeatures({
		columnFilteringFeature,
		columnVisibilityFeature,
		rowPaginationFeature,
		rowSelectionFeature,
		rowSortingFeature,
		filteredRowModel: createFilteredRowModel(),
		paginatedRowModel: createPaginatedRowModel(),
		sortedRowModel: createSortedRowModel(),
		filterFns: { includesString: filterFn_includesString },
		sortFns: { alphanumeric: sortFn_alphanumeric, text: sortFn_text },
	});
	const columnHelper = createColumnHelper<typeof features, Payment>();
	const columns = $derived(
		columnHelper.columns([
			columnHelper.display({
				id: "select",
				enableSorting: false,
				enableHiding: false,
				header: ({ table }) =>
					renderSnippet(selection, {
						checked: table.getIsAllPageRowsSelected(),
						indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
						onCheckedChange: (value: boolean) => table.toggleAllPageRowsSelected(!!value),
						label: t.values.selectAll,
					}),
				cell: ({ row }) =>
					renderSnippet(selection, {
						checked: row.getIsSelected(),
						onCheckedChange: (value: boolean) => row.toggleSelected(!!value),
						label: t.values.selectRow,
					}),
			}),
			columnHelper.accessor("status", {
				header: t.values.status,
				cell: ({ row }) => renderSnippet(statusCell, row.original.status),
			}),
			columnHelper.accessor("email", {
				header: ({ column }) =>
					renderSnippet(emailHeader, () => column.toggleSorting(column.getIsSorted() === "asc")),
				cell: ({ row }) => renderSnippet(emailCell, row.original.email),
			}),
			columnHelper.accessor("amount", {
				header: () => renderSnippet(amountHeader),
				cell: ({ row }) => renderSnippet(amountCell, row.original.amount),
			}),
			columnHelper.display({
				id: "actions",
				enableHiding: false,
				cell: ({ row }) => renderSnippet(actions, row.original.id),
			}),
		])
	);
	const table = createTable({
		features,
		data,
		get columns() {
			return columns;
		},
	});
	const formatter = $derived(
		new Intl.NumberFormat(t.dir === "rtl" ? "ar-SA" : "en-US", {
			style: "currency",
			currency: "USD",
		})
	);
</script>

{#snippet selection({
	checked,
	indeterminate = false,
	onCheckedChange,
	label,
}: {
	checked: boolean;
	indeterminate?: boolean;
	onCheckedChange: (value: boolean) => void;
	label: string;
})}
	<Checkbox {checked} {indeterminate} {onCheckedChange} aria-label={label} />
{/snippet}
{#snippet statusCell(status: Payment["status"])}
	<div class="capitalize">{t.values[status]}</div>
{/snippet}
{#snippet emailHeader(onclick: () => void)}
	<Button variant="ghost" {onclick}>{t.values.email}<ArrowUpDownIcon /></Button>
{/snippet}
{#snippet emailCell(email: string)}
	<div class="lowercase">{email}</div>
{/snippet}
{#snippet amountHeader()}
	<div class="text-start">{t.values.amount}</div>
{/snippet}
{#snippet amountCell(amount: number)}
	<div class="text-start font-medium">{formatter.format(amount)}</div>
{/snippet}
{#snippet actions(id: string)}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="ghost" size="icon-xs"
					><span class="sr-only">{t.values.openMenu}</span><MoreHorizontalIcon /></Button
				>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content
			align="end"
			class="w-40"
			dir={t.dir}
			data-lang={t.dir === "rtl" ? t.language : undefined}
		>
			<DropdownMenu.Group>
				<DropdownMenu.Label>{t.values.actions}</DropdownMenu.Label>
				<DropdownMenu.Item onSelect={() => navigator.clipboard.writeText(id)}
					>{t.values.copyPaymentId}</DropdownMenu.Item
				>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Group>
				<DropdownMenu.Item>{t.values.viewCustomer}</DropdownMenu.Item>
				<DropdownMenu.Item>{t.values.viewPaymentDetails}</DropdownMenu.Item>
			</DropdownMenu.Group>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/snippet}

<div class="w-full">
	<div class="flex items-center gap-2 py-4">
		<Input
			placeholder={t.values.filterEmails}
			value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
			oninput={(event) => table.getColumn("email")?.setFilterValue(event.currentTarget.value)}
			class="max-w-sm"
		/>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline" class="ms-auto"
						>{t.values.columns}<ChevronDownIcon /></Button
					>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				align={t.dir === "rtl" ? "start" : "end"}
				dir={t.dir}
				data-lang={t.dir === "rtl" ? t.language : undefined}
			>
				<DropdownMenu.Group>
					{#each table
						.getAllColumns()
						.filter((column) => column.getCanHide()) as column (column.id)}
						<DropdownMenu.CheckboxItem
							class="capitalize"
							checked={column.getIsVisible()}
							onCheckedChange={(value) => column.toggleVisibility(!!value)}
							>{column.id}</DropdownMenu.CheckboxItem
						>
					{/each}
				</DropdownMenu.Group>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<div class="overflow-hidden rounded-md border">
		<Table.Root>
			<Table.Header>
				{#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
					<Table.Row>
						{#each headerGroup.headers as header (header.id)}
							<Table.Head
								>{#if !header.isPlaceholder}<FlexRender {header} />{/if}</Table.Head
							>
						{/each}
					</Table.Row>
				{/each}
			</Table.Header>
			<Table.Body>
				{#each table.getRowModel().rows as row (row.id)}
					<Table.Row data-state={row.getIsSelected() && "selected"}>
						{#each row.getVisibleCells() as cell (cell.id)}<Table.Cell
								><FlexRender {cell} /></Table.Cell
							>{/each}
					</Table.Row>
				{:else}
					<Table.Row
						><Table.Cell colspan={columns.length} class="h-24 text-center"
							>{t.values.noResults}</Table.Cell
						></Table.Row
					>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end gap-2 py-4">
		<div class="flex-1 text-sm text-muted-foreground">
			{table.getFilteredSelectedRowModel().rows.length}
			{t.values.rowsSelected}
			{table.getFilteredRowModel().rows.length}
			{t.values.rowsSelectedSuffix}
		</div>
		<div class="flex gap-2">
			<Button
				variant="outline"
				size="sm"
				onclick={() => table.previousPage()}
				disabled={!table.getCanPreviousPage()}>{t.values.previous}</Button
			>
			<Button
				variant="outline"
				size="sm"
				onclick={() => table.nextPage()}
				disabled={!table.getCanNextPage()}>{t.values.next}</Button
			>
		</div>
	</div>
</div>
