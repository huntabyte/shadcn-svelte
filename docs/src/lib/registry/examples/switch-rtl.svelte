<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";
	import { Switch } from "$lib/registry/ui/switch/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {
				label: "Share across devices",
				description: "Focus is shared across devices, and turns off when you leave the app.",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				label: "المشاركة عبر الأجهزة",
				description: "يتم مشاركة التركيز عبر الأجهزة، ويتم إيقاف تشغيله عند مغادرة التطبيق.",
			},
		},
		he: {
			dir: "rtl",
			values: {
				label: "שיתוף בין מכשירים",
				description: "המיקוד משותף בין מכשירים, וכבה כשאתה עוזב את האפליקציה.",
			},
		},
	} satisfies Translations;
	const t = useTranslation(translations, "ar");
</script>

<Field.Field orientation="horizontal" class="max-w-sm" dir={t.dir}>
	<Field.Content
		><Field.Label for="switch-focus-mode-rtl" dir={t.dir}>{t.values.label}</Field.Label
		><Field.Description dir={t.dir}>{t.values.description}</Field.Description></Field.Content
	>
	<Switch id="switch-focus-mode-rtl" dir={t.dir} />
</Field.Field>
