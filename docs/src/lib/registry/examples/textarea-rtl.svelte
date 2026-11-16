<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {
				label: "Feedback",
				placeholder: "Your feedback helps us improve...",
				description: "Share your thoughts about our service.",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				label: "التعليقات",
				placeholder: "تعليقاتك تساعدنا على التحسين...",
				description: "شاركنا أفكارك حول خدمتنا.",
			},
		},
		he: {
			dir: "rtl",
			values: {
				label: "משוב",
				placeholder: "המשוב שלך עוזר לנו להשתפר...",
				description: "שתף את מחשבותיך על השירות שלנו.",
			},
		},
	} satisfies Translations;
	const t = useTranslation(translations, "ar");
</script>

<Field.Field class="w-full max-w-xs" dir={t.dir}>
	<Field.Label for="feedback" dir={t.dir}>{t.values.label}</Field.Label>
	<Textarea id="feedback" placeholder={t.values.placeholder} dir={t.dir} rows={4} />
	<Field.Description dir={t.dir}>{t.values.description}</Field.Description>
</Field.Field>
