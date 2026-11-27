<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as RadioGroup from "$lib/registry/ui/radio-group/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				default: "Default",
				defaultDescription: "Standard spacing for most use cases.",
				comfortable: "Comfortable",
				comfortableDescription: "More space between elements.",
				compact: "Compact",
				compactDescription: "Minimal spacing for dense layouts.",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				default: "افتراضي",
				defaultDescription: "تباعد قياسي لمعظم حالات الاستخدام.",
				comfortable: "مريح",
				comfortableDescription: "مساحة أكبر بين العناصر.",
				compact: "مضغوط",
				compactDescription: "تباعد أدنى للتخطيطات الكثيفة.",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				default: "ברירת מחדל",
				defaultDescription: "ריווח סטנדרטי לרוב מקרי השימוש.",
				comfortable: "נוח",
				comfortableDescription: "יותר מקום בין האלמנטים.",
				compact: "קומפקטי",
				compactDescription: "ריווח מינימלי לפריסות צפופות.",
			},
		},
	};
	const t = useTranslation(translations, "ar");
</script>

<RadioGroup.Root value="comfortable" class="w-fit" dir={t.dir}>
	<Field.Field orientation="horizontal"
		><RadioGroup.Item value="default" id="r1-rtl" /><Field.Content
			><Field.Label for="r1-rtl" dir={t.dir}>{t.values.default}</Field.Label><Field.Description
				dir={t.dir}>{t.values.defaultDescription}</Field.Description
			></Field.Content
		></Field.Field
	>
	<Field.Field orientation="horizontal"
		><RadioGroup.Item value="comfortable" id="r2-rtl" /><Field.Content
			><Field.Label for="r2-rtl" dir={t.dir}>{t.values.comfortable}</Field.Label><Field.Description
				dir={t.dir}>{t.values.comfortableDescription}</Field.Description
			></Field.Content
		></Field.Field
	>
	<Field.Field orientation="horizontal"
		><RadioGroup.Item value="compact" id="r3-rtl" /><Field.Content
			><Field.Label for="r3-rtl" dir={t.dir}>{t.values.compact}</Field.Label><Field.Description
				dir={t.dir}>{t.values.compactDescription}</Field.Description
			></Field.Content
		></Field.Field
	>
</RadioGroup.Root>
