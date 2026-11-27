<script lang="ts">
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";
	import { Slider } from "$lib/registry/ui/slider/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {},
		},
		ar: {
			dir: "rtl",
			values: {},
		},
		he: {
			dir: "rtl",
			values: {},
		},
	} satisfies Translations;
	const t = useTranslation(translations, "ar");
</script>

<Slider
	type="multiple"
	value={[75]}
	max={100}
	step={1}
	class="mx-auto w-full max-w-xs"
	dir={t.dir}
/>
