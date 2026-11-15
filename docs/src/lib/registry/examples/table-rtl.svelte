<script lang="ts">
	import * as Table from "$lib/registry/ui/table/index.js";
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {
				caption: "A list of your recent invoices.",
				invoice: "Invoice",
				status: "Status",
				method: "Method",
				amount: "Amount",
				paid: "Paid",
				pending: "Pending",
				unpaid: "Unpaid",
				creditCard: "Credit Card",
				paypal: "PayPal",
				bankTransfer: "Bank Transfer",
				total: "Total",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				caption: "قائمة بفواتيرك الأخيرة.",
				invoice: "الفاتورة",
				status: "الحالة",
				method: "الطريقة",
				amount: "المبلغ",
				paid: "مدفوع",
				pending: "قيد الانتظار",
				unpaid: "غير مدفوع",
				creditCard: "بطاقة ائتمانية",
				paypal: "PayPal",
				bankTransfer: "تحويل بنكي",
				total: "المجموع",
			},
		},
		he: {
			dir: "rtl",
			values: {
				caption: "רשימת החשבוניות האחרונות שלך.",
				invoice: "חשבונית",
				status: "סטטוס",
				method: "שיטה",
				amount: "סכום",
				paid: "שולם",
				pending: "ממתין",
				unpaid: "לא שולם",
				creditCard: "כרטיס אשראי",
				paypal: "PayPal",
				bankTransfer: "העברה בנקאית",
				total: 'סה"כ',
			},
		},
	} satisfies Translations;
	const t = useTranslation(translations, "ar");
	const invoices = [
		{
			invoice: "INV001",
			paymentStatus: "paid" as const,
			totalAmount: "$250.00",
			paymentMethod: "creditCard" as const,
		},
		{
			invoice: "INV002",
			paymentStatus: "pending" as const,
			totalAmount: "$150.00",
			paymentMethod: "paypal" as const,
		},
		{
			invoice: "INV003",
			paymentStatus: "unpaid" as const,
			totalAmount: "$350.00",
			paymentMethod: "bankTransfer" as const,
		},
		{
			invoice: "INV004",
			paymentStatus: "paid" as const,
			totalAmount: "$450.00",
			paymentMethod: "creditCard" as const,
		},
		{
			invoice: "INV005",
			paymentStatus: "paid" as const,
			totalAmount: "$550.00",
			paymentMethod: "paypal" as const,
		},
		{
			invoice: "INV006",
			paymentStatus: "pending" as const,
			totalAmount: "$200.00",
			paymentMethod: "bankTransfer" as const,
		},
		{
			invoice: "INV007",
			paymentStatus: "unpaid" as const,
			totalAmount: "$300.00",
			paymentMethod: "creditCard" as const,
		},
	];
</script>

<Table.Root dir={t.dir}
	><Table.Caption>{t.values.caption}</Table.Caption><Table.Header
		><Table.Row
			><Table.Head class="w-[100px]">{t.values.invoice}</Table.Head><Table.Head
				>{t.values.status}</Table.Head
			><Table.Head>{t.values.method}</Table.Head><Table.Head class="text-right"
				>{t.values.amount}</Table.Head
			></Table.Row
		></Table.Header
	>
	<Table.Body
		>{#each invoices as invoice (invoice.invoice)}<Table.Row
				><Table.Cell class="font-medium">{invoice.invoice}</Table.Cell><Table.Cell
					>{t.values[invoice.paymentStatus]}</Table.Cell
				><Table.Cell>{t.values[invoice.paymentMethod]}</Table.Cell><Table.Cell class="text-right"
					>{invoice.totalAmount}</Table.Cell
				></Table.Row
			>{/each}</Table.Body
	>
	<Table.Footer
		><Table.Row
			><Table.Cell colspan={3}>{t.values.total}</Table.Cell><Table.Cell class="text-right"
				>$2,500.00</Table.Cell
			></Table.Row
		></Table.Footer
	></Table.Root
>
