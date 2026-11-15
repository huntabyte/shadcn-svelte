<script lang="ts">
	import BadgeCheck from "@lucide/svelte/icons/badge-check";
	import BookmarkIcon from "@lucide/svelte/icons/bookmark";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				badge: "Badge",
				secondary: "Secondary",
				destructive: "Destructive",
				outline: "Outline",
				verified: "Verified",
				bookmark: "Bookmark",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				badge: "شارة",
				secondary: "ثانوي",
				destructive: "مدمر",
				outline: "مخطط",
				verified: "متحقق",
				bookmark: "إشارة مرجعية",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				badge: "תג",
				secondary: "משני",
				destructive: "הרסני",
				outline: "קווי מתאר",
				verified: "מאומת",
				bookmark: "סימנייה",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<div class="flex w-full flex-wrap justify-center gap-2" dir={t.dir}>
	<Badge>{t.values.badge}</Badge>
	<Badge variant="secondary">{t.values.secondary}</Badge>
	<Badge variant="destructive">{t.values.destructive}</Badge>
	<Badge variant="outline">{t.values.outline}</Badge>
	<Badge variant="secondary">
		<BadgeCheck data-icon="inline-start" />
		{t.values.verified}
	</Badge>
	<Badge variant="outline">
		{t.values.bookmark}
		<BookmarkIcon data-icon="inline-end" />
	</Badge>
</div>
