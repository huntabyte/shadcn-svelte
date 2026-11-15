<script lang="ts">
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";
	import { Skeleton } from "$lib/registry/ui/skeleton/index.js";

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

<div class="flex items-center gap-4" dir={t.dir}>
	<Skeleton class="size-12 rounded-full" />
	<div class="flex flex-col gap-2">
		<Skeleton class="h-4 w-[250px]" /><Skeleton class="h-4 w-[200px]" />
	</div>
</div>
