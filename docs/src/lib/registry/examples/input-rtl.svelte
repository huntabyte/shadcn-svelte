<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				apiKey: "API Key",
				placeholder: "sk-...",
				description: "Your API key is encrypted and stored securely.",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				apiKey: "مفتاح API",
				placeholder: "sk-...",
				description: "مفتاح API الخاص بك مشفر ومخزن بأمان.",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				apiKey: "מפתח API",
				placeholder: "sk-...",
				description: "מפתח ה-API שלך מוצפן ונשמר בצורה מאובטחת.",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<Field.Field dir={t.dir}>
	<Field.Label for="input-rtl-api-key">{t.values.apiKey}</Field.Label>
	<Input id="input-rtl-api-key" type="password" placeholder={t.values.placeholder} dir={t.dir} />
	<Field.Description>{t.values.description}</Field.Description>
</Field.Field>
