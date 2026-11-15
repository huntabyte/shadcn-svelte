<script lang="ts">
	import BookmarkIcon from "@lucide/svelte/icons/bookmark";
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";
	import { Toggle } from "$lib/registry/ui/toggle/index.js";
	const translations = {
		en: {
			dir: "ltr",
			values: {
				label: "Bookmark",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				label: "إشارة مرجعية",
			},
		},
		he: {
			dir: "rtl",
			values: {
				label: "סימנייה",
			},
		},
	} satisfies Translations;
	const t = useTranslation(translations, "ar");
</script>

<Toggle aria-label="Toggle bookmark" size="sm" variant="outline" dir={t.dir}
	><BookmarkIcon class="group-aria-pressed/toggle:fill-foreground" />{t.values.label}</Toggle
>
