<script lang="ts">
	import { today, getLocalTimeZone, type CalendarDate } from "@internationalized/date";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {},
		},
		ar: {
			dir: "rtl" as const,
			values: {},
		},
		he: {
			dir: "rtl" as const,
			values: {},
		},
	};

	const t = useTranslation(translations, "ar");

	let date = $state<CalendarDate | undefined>(today(getLocalTimeZone()));
</script>

<Calendar
	type="single"
	bind:value={date}
	class="rounded-lg border [--cell-size:--spacing(9)]"
	captionLayout="dropdown"
	weekdayFormat={t.dir === "rtl" ? "narrow" : "short"}
	dir={t.dir}
	locale={t.language === "ar" ? "ar-SA" : t.language === "he" ? "he-IL" : "en-US"}
/>
