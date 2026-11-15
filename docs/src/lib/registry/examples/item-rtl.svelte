<script lang="ts">
	import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		Item,
		ItemActions,
		ItemContent,
		ItemDescription,
		ItemMedia,
		ItemTitle,
	} from "$lib/registry/ui/item/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				basicItem: "Basic Item",
				basicItemDesc: "A simple item with title and description.",
				action: "Action",
				verifiedTitle: "Your profile has been verified.",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				basicItem: "عنصر أساسي",
				basicItemDesc: "عنصر بسيط يحتوي على عنوان ووصف.",
				action: "إجراء",
				verifiedTitle: "تم التحقق من ملفك الشخصي.",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				basicItem: "פריט בסיסי",
				basicItemDesc: "פריט פשוט עם כותרת ותיאור.",
				action: "פעולה",
				verifiedTitle: "הפרופיל שלך אומת.",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<div class="flex w-full max-w-md flex-col gap-6" dir={t.dir}>
	<Item variant="outline" dir={t.dir}>
		<ItemContent>
			<ItemTitle>{t.values.basicItem}</ItemTitle>
			<ItemDescription>{t.values.basicItemDesc}</ItemDescription>
		</ItemContent>
		<ItemActions>
			<Button variant="outline" size="sm">
				{t.values.action}
			</Button>
		</ItemActions>
	</Item>
	<Item variant="outline" size="sm" dir={t.dir}>
		{#snippet child({ props })}
			<a {...props} href="#_">
				<ItemMedia>
					<BadgeCheckIcon class="size-5" />
				</ItemMedia>
				<ItemContent>
					<ItemTitle>{t.values.verifiedTitle}</ItemTitle>
				</ItemContent>
				<ItemActions>
					<ChevronRightIcon class="size-4" />
				</ItemActions>
			</a>
		{/snippet}
	</Item>
</div>
