<script lang="ts">
	import * as Item from "$lib/registry/ui/item/index.js";
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {
				title: "Processing payment...",
				amount: "$100.00",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				title: "جاري معالجة الدفع...",
				amount: "١٠٠.٠٠ دولار",
			},
		},
		he: {
			dir: "rtl",
			values: {
				title: "מעבד תשלום...",
				amount: "$100.00",
			},
		},
	} satisfies Translations;
	const t = useTranslation(translations, "ar");
</script>

<div class="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]" dir={t.dir}>
	<Item.Root variant="muted" dir={t.dir}
		><Item.Media><Spinner /></Item.Media><Item.Content
			><Item.Title class="line-clamp-1">{t.values.title}</Item.Title></Item.Content
		><Item.Content class="flex-none justify-end"
			><span class="text-sm tabular-nums">{t.values.amount}</span></Item.Content
		></Item.Root
	>
</div>
