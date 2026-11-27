<script lang="ts">
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {
				design: "Design",
				engineering: "Engineering",
				marketing: "Marketing",
				product: "Product",
				research: "Research",
				sales: "Sales",
				support: "Support",
				operations: "Operations",
				finance: "Finance",
				legal: "Legal",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				design: "تصميم",
				engineering: "هندسة",
				marketing: "تسويق",
				product: "منتج",
				research: "أبحاث",
				sales: "مبيعات",
				support: "دعم",
				operations: "عمليات",
				finance: "مالية",
				legal: "قانوني",
			},
		},
		he: {
			dir: "rtl",
			values: {
				design: "עיצוב",
				engineering: "הנדסה",
				marketing: "שיווק",
				product: "מוצר",
				research: "מחקר",
				sales: "מכירות",
				support: "תמיכה",
				operations: "תפעול",
				finance: "כספים",
				legal: "משפטי",
			},
		},
	} satisfies Translations;
	const t = useTranslation(translations, "ar");
</script>

<div class="mx-auto w-full max-w-xs overflow-hidden rounded-2xl border" dir={t.dir}>
	<div class="no-scrollbar scroll-fade-x overflow-x-auto">
		<div class="flex w-max gap-1.5 p-1.5">
			{#each Object.values(t.values) as tag (tag)}<div
					class="shrink-0 rounded-lg bg-muted px-3 py-2.5 text-sm"
				>
					{tag}
				</div>{/each}
		</div>
	</div>
</div>
