<script lang="ts">
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		Collapsible,
		CollapsibleContent,
		CollapsibleTrigger,
	} from "$lib/registry/ui/collapsible/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				orderNumber: "Order #4189",
				status: "Status",
				shipped: "Shipped",
				shippingAddress: "Shipping address",
				address: "100 Market St, San Francisco",
				items: "Items",
				itemsDescription: "2x Studio Headphones",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				orderNumber: "الطلب #4189",
				status: "الحالة",
				shipped: "تم الشحن",
				shippingAddress: "عنوان الشحن",
				address: "100 Market St, San Francisco",
				items: "العناصر",
				itemsDescription: "2x سماعات الاستوديو",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				orderNumber: "הזמנה #4189",
				status: "סטטוס",
				shipped: "נשלח",
				shippingAddress: "כתובת משלוח",
				address: "100 Market St, San Francisco",
				items: "פריטים",
				itemsDescription: "2x אוזניות סטודיו",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<Collapsible class="flex w-[350px] flex-col gap-2" dir={t.dir}>
	<div class="flex items-center justify-between gap-4 px-4">
		<h4 class="text-sm font-semibold">{t.values.orderNumber}</h4>
		<CollapsibleTrigger>
			{#snippet child({ props })}
				<Button {...props} variant="ghost" size="icon" class="size-8">
					<ChevronsUpDown />
					<span class="sr-only">Toggle details</span>
				</Button>
			{/snippet}
		</CollapsibleTrigger>
	</div>
	<div class="flex items-center justify-between rounded-md border px-4 py-2 text-sm">
		<span class="text-muted-foreground">{t.values.status}</span>
		<span class="font-medium">{t.values.shipped}</span>
	</div>
	<CollapsibleContent class="flex flex-col gap-2">
		<div class="rounded-md border px-4 py-2 text-sm">
			<p class="font-medium">{t.values.shippingAddress}</p>
			<p class="text-muted-foreground">{t.values.address}</p>
		</div>
		<div class="rounded-md border px-4 py-2 text-sm">
			<p class="font-medium">{t.values.items}</p>
			<p class="text-muted-foreground">{t.values.itemsDescription}</p>
		</div>
	</CollapsibleContent>
</Collapsible>
