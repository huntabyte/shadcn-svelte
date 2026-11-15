<script lang="ts">
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				label: "Accept terms and conditions",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				label: "قبول الشروط والأحكام",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				label: "קבל תנאים והגבלות",
			},
		},
	};
	const t = useTranslation(translations, "ar");
</script>

<div class="flex gap-2" dir={t.dir}>
	<Checkbox id="terms-rtl" /><Label for="terms-rtl" dir={t.dir}>{t.values.label}</Label>
</div>
