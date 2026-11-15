<script lang="ts">
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {
				title: "shadcn/ui",
				subtitle: "The Foundation for your Design System",
				description:
					"A set of beautifully designed components that you can customize, extend, and build on.",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				title: "shadcn/ui",
				subtitle: "الأساس لنظام التصميم الخاص بك",
				description: "مجموعة من المكونات المصممة بشكل جميل يمكنك تخصيصها وتوسيعها والبناء عليها.",
			},
		},
		he: {
			dir: "rtl",
			values: {
				title: "shadcn/ui",
				subtitle: "הבסיס למערכת העיצוב שלך",
				description: "סט של רכיבים מעוצבים בצורה יפה שאתה יכול להתאים אישית, להרחיב ולבנות עליהם.",
			},
		},
	} satisfies Translations;
	const t = useTranslation(translations, "ar");
</script>

<div class="flex max-w-sm flex-col gap-4 text-sm" dir={t.dir}>
	<div class="flex flex-col gap-1.5">
		<div class="leading-none font-medium">{t.values.title}</div>
		<div class="text-muted-foreground">{t.values.subtitle}</div>
	</div>
	<Separator />
	<div>{t.values.description}</div>
</div>
