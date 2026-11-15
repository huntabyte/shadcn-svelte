<script lang="ts">
	import * as NativeSelect from "$lib/registry/ui/native-select/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				placeholder: "Select status",
				todo: "Todo",
				inProgress: "In Progress",
				done: "Done",
				cancelled: "Cancelled",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				placeholder: "اختر الحالة",
				todo: "مهام",
				inProgress: "قيد التنفيذ",
				done: "منجز",
				cancelled: "ملغي",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				placeholder: "בחר סטטוס",
				todo: "לעשות",
				inProgress: "בתהליך",
				done: "הושלם",
				cancelled: "בוטל",
			},
		},
	};
	const t = useTranslation(translations, "ar");
</script>

<NativeSelect.Root dir={t.dir}>
	<NativeSelect.Option value="">{t.values.placeholder}</NativeSelect.Option>
	<NativeSelect.Option value="todo">{t.values.todo}</NativeSelect.Option>
	<NativeSelect.Option value="in-progress">{t.values.inProgress}</NativeSelect.Option>
	<NativeSelect.Option value="done">{t.values.done}</NativeSelect.Option>
	<NativeSelect.Option value="cancelled">{t.values.cancelled}</NativeSelect.Option>
</NativeSelect.Root>
