<script lang="ts">
	import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
	import IconFolderCode from "@lucide/svelte/icons/folder-code";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		Empty,
		EmptyContent,
		EmptyDescription,
		EmptyHeader,
		EmptyMedia,
		EmptyTitle,
	} from "$lib/registry/ui/empty/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				title: "No Projects Yet",
				description:
					"You haven't created any projects yet. Get started by creating your first project.",
				createProject: "Create Project",
				importProject: "Import Project",
				learnMore: "Learn More",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				title: "لا توجد مشاريع بعد",
				description: "لم تقم بإنشاء أي مشاريع بعد. ابدأ بإنشاء مشروعك الأول.",
				createProject: "إنشاء مشروع",
				importProject: "استيراد مشروع",
				learnMore: "تعرف على المزيد",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				title: "אין פרויקטים עדיין",
				description: "עדיין לא יצרת פרויקטים. התחל על ידי יצירת הפרויקט הראשון שלך.",
				createProject: "צור פרויקט",
				importProject: "ייבא פרויקט",
				learnMore: "למד עוד",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<Empty dir={t.dir}>
	<EmptyHeader>
		<EmptyMedia variant="icon">
			<IconFolderCode />
		</EmptyMedia>
		<EmptyTitle>{t.values.title}</EmptyTitle>
		<EmptyDescription>{t.values.description}</EmptyDescription>
	</EmptyHeader>
	<EmptyContent class="flex-row justify-center gap-2">
		<Button>{t.values.createProject}</Button>
		<Button variant="outline">{t.values.importProject}</Button>
	</EmptyContent>
	<Button variant="link" class="text-muted-foreground" size="sm" href="#_">
		{t.values.learnMore}
		<ArrowUpRightIcon class="rtl:rotate-270" data-icon="inline-end" />
	</Button>
</Empty>
