<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Progress } from "$lib/registry/ui/progress/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				label: "Upload progress",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				label: "تقدم الرفع",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				label: "התקדמות העלאה",
			},
		},
	};
	const t = useTranslation(translations, "ar");
	function formatNumber(num: number): string {
		return t.language === "ar"
			? num.toString().replace(/\d/g, (digit) => "٠١٢٣٤٥٦٧٨٩"[Number(digit)]!)
			: num.toString();
	}
</script>

<Field.Field class="w-full max-w-sm" dir={t.dir}>
	<Field.Label for="progress-upload"
		><span>{t.values.label}</span><span class="ms-auto">{formatNumber(66)}%</span></Field.Label
	>
	<Progress value={66} id="progress-upload" class="rtl:rotate-180" />
</Field.Field>
