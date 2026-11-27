<script lang="ts">
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import PlusIcon from "@lucide/svelte/icons/plus";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				button: "Button",
				submit: "Submit",
				delete: "Delete",
				loading: "Loading",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				button: "زر",
				submit: "إرسال",
				delete: "حذف",
				loading: "جاري التحميل",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				button: "כפתור",
				submit: "שלח",
				delete: "מחק",
				loading: "טוען",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<div class="flex flex-wrap items-center gap-2 md:flex-row" dir={t.dir}>
	<Button variant="outline">{t.values.button}</Button>
	<Button variant="destructive">{t.values.delete}</Button>
	<Button variant="outline">
		{t.values.submit}
		<ArrowRightIcon class="rtl:rotate-180" data-icon="inline-end" />
	</Button>
	<Button variant="outline" size="icon" aria-label="Add">
		<PlusIcon />
	</Button>
	<Button variant="secondary" disabled>
		<Spinner data-icon="inline-start" />
		{t.values.loading}
	</Button>
</div>
