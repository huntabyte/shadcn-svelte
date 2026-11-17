<script lang="ts">
	import * as ToggleGroup from "$lib/registry/ui/toggle-group/index.js";
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {
				list: "List",
				grid: "Grid",
				cards: "Cards",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				list: "قائمة",
				grid: "شبكة",
				cards: "بطاقات",
			},
		},
		he: {
			dir: "rtl",
			values: {
				list: "רשימה",
				grid: "רשת",
				cards: "כרטיסים",
			},
		},
	} satisfies Translations;
	const t = useTranslation(translations, "ar");
</script>

<ToggleGroup.Root variant="outline" type="single" value="list">
	<ToggleGroup.Item value="list" aria-label={t.values.list}>{t.values.list}</ToggleGroup.Item>
	<ToggleGroup.Item value="grid" aria-label={t.values.grid}>{t.values.grid}</ToggleGroup.Item>
	<ToggleGroup.Item value="cards" aria-label={t.values.cards}>{t.values.cards}</ToggleGroup.Item>
</ToggleGroup.Root>
