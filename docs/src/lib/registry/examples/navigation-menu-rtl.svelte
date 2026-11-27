<script lang="ts">
	import * as NavigationMenu from "$lib/registry/ui/navigation-menu/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { navigationMenuTriggerStyle } from "$lib/registry/ui/navigation-menu/navigation-menu-trigger.svelte";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				gettingStarted: "Getting started",
				introduction: "Introduction",
				introductionDesc: "Re-usable components built with Tailwind CSS.",
				installation: "Installation",
				installationDesc: "How to install dependencies and structure your app.",
				typography: "Typography",
				typographyDesc: "Styles for headings, paragraphs, lists...etc",
				components: "Components",
				alertDialog: "Alert Dialog",
				alertDialogDesc:
					"A modal dialog that interrupts the user with important content and expects a response.",
				hoverCard: "Hover Card",
				hoverCardDesc: "For sighted users to preview content available behind a link.",
				progress: "Progress",
				progressDesc:
					"Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
				scrollArea: "Scroll-area",
				scrollAreaDesc: "Visually or semantically separates content.",
				tabs: "Tabs",
				tabsDesc:
					"A set of layered sections of content—known as tab panels—that are displayed one at a time.",
				tooltip: "Tooltip",
				tooltipDesc:
					"A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
				withIcon: "With Icon",
				backlog: "Backlog",
				toDo: "To Do",
				done: "Done",
				docs: "Docs",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				gettingStarted: "البدء",
				introduction: "مقدمة",
				introductionDesc: "مكونات قابلة لإعادة الاستخدام مبنية باستخدام Tailwind CSS.",
				installation: "التثبيت",
				installationDesc: "كيفية تثبيت التبعيات وتنظيم تطبيقك.",
				typography: "الطباعة",
				typographyDesc: "أنماط للعناوين والفقرات والقوائم...إلخ",
				components: "المكونات",
				alertDialog: "حوار التنبيه",
				alertDialogDesc: "حوار نافذة يقطع المستخدم بمحتوى مهم ويتوقع استجابة.",
				hoverCard: "بطاقة التحويم",
				hoverCardDesc: "للمستخدمين المبصرين لمعاينة المحتوى المتاح خلف الرابط.",
				progress: "التقدم",
				progressDesc: "يعرض مؤشرًا يوضح تقدم إتمام المهمة، عادةً يتم عرضه كشريط تقدم.",
				scrollArea: "منطقة التمرير",
				scrollAreaDesc: "يفصل المحتوى بصريًا أو دلاليًا.",
				tabs: "التبويبات",
				tabsDesc:
					"مجموعة من أقسام المحتوى المتعددة الطبقات—المعروفة بألواح التبويب—التي يتم عرضها واحدة في كل مرة.",
				tooltip: "تلميح",
				tooltipDesc:
					"نافذة منبثقة تعرض معلومات متعلقة بعنصر عندما يتلقى العنصر التركيز على لوحة المفاتيح أو عند تحويم الماوس فوقه.",
				withIcon: "مع أيقونة",
				backlog: "قائمة الانتظار",
				toDo: "المهام",
				done: "منجز",
				docs: "الوثائق",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				gettingStarted: "התחלה",
				introduction: "הקדמה",
				introductionDesc: "רכיבים לשימוש חוזר שנבנו עם Tailwind CSS.",
				installation: "התקנה",
				installationDesc: "כיצד להתקין תלויות ולבנות את האפליקציה שלך.",
				typography: "טיפוגרפיה",
				typographyDesc: "סגנונות לכותרות, פסקאות, רשימות...וכו'",
				components: "רכיבים",
				alertDialog: "דיאלוג התראה",
				alertDialogDesc: "דיאלוג מודאלי שמפריע למשתמש עם תוכן חשוב ומצפה לתגובה.",
				hoverCard: "כרטיס ריחוף",
				hoverCardDesc: "למשתמשים רואים כדי להציג תצוגה מקדימה של תוכן זמין מאחורי קישור.",
				progress: "התקדמות",
				progressDesc:
					"מציג אינדיקטור המציג את התקדמות ההשלמה של משימה, בדרך כלל מוצג כסרגל התקדמות.",
				scrollArea: "אזור גלילה",
				scrollAreaDesc: "מפריד תוכן חזותית או סמנטית.",
				tabs: "כרטיסיות",
				tabsDesc: "קבוצה של חלקי תוכן מרובדים—המכונים לוחות כרטיסיות—המוצגים אחד בכל פעם.",
				tooltip: "טולטיפ",
				tooltipDesc:
					"חלון קופץ המציג מידע הקשור לאלמנט כאשר האלמנט מקבל מיקוד מקלדת או כאשר העכבר מרחף מעליו.",
				withIcon: "עם אייקון",
				backlog: "רשימת המתנה",
				toDo: "לעשות",
				done: "הושלם",
				docs: "תיעוד",
			},
		},
	};
	const t = useTranslation(translations, "ar");
	const components = [
		{
			titleKey: "alertDialog" as const,
			descriptionKey: "alertDialogDesc" as const,
			href: "/docs/components/alert-dialog",
		},
		{
			titleKey: "hoverCard" as const,
			descriptionKey: "hoverCardDesc" as const,
			href: "/docs/components/hover-card",
		},
		{
			titleKey: "progress" as const,
			descriptionKey: "progressDesc" as const,
			href: "/docs/components/progress",
		},
		{
			titleKey: "scrollArea" as const,
			descriptionKey: "scrollAreaDesc" as const,
			href: "/docs/components/scroll-area",
		},
		{
			titleKey: "tabs" as const,
			descriptionKey: "tabsDesc" as const,
			href: "/docs/components/tabs",
		},
		{
			titleKey: "tooltip" as const,
			descriptionKey: "tooltipDesc" as const,
			href: "/docs/components/tooltip",
		},
	] as const;
</script>

{#snippet listItem(href: string, title: string, content: string)}
	<li>
		<NavigationMenu.Link {href}
			><div class="flex flex-col gap-1 text-sm">
				<div class="leading-none font-medium">{title}</div>
				<div class="line-clamp-2 text-muted-foreground">{content}</div>
			</div></NavigationMenu.Link
		>
	</li>
{/snippet}
<NavigationMenu.Root dir={t.dir}
	><NavigationMenu.List>
		<NavigationMenu.Item
			><NavigationMenu.Trigger>{t.values.gettingStarted}</NavigationMenu.Trigger>
			<NavigationMenu.Content dir={t.dir} data-lang={t.dir === "rtl" ? t.language : undefined}
				><ul class="w-96">
					{@render listItem("/docs", t.values.introduction, t.values.introductionDesc)}
					{@render listItem("/docs/installation", t.values.installation, t.values.installationDesc)}
					{@render listItem(
						"/docs/components/typography",
						t.values.typography,
						t.values.typographyDesc
					)}
				</ul></NavigationMenu.Content
			></NavigationMenu.Item
		>
		<NavigationMenu.Item class="hidden md:flex"
			><NavigationMenu.Trigger>{t.values.components}</NavigationMenu.Trigger>
			<NavigationMenu.Content dir={t.dir} data-lang={t.dir === "rtl" ? t.language : undefined}
				><ul class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
					{#each components as component (component.titleKey)}
						{@render listItem(
							component.href,
							t.values[component.titleKey],
							t.values[component.descriptionKey]
						)}
					{/each}
				</ul></NavigationMenu.Content
			></NavigationMenu.Item
		>
		<NavigationMenu.Item
			><NavigationMenu.Link
				href="/docs"
				class={navigationMenuTriggerStyle()}
				data-lang={t.dir === "rtl" ? t.language : undefined}>{t.values.docs}</NavigationMenu.Link
			></NavigationMenu.Item
		>
	</NavigationMenu.List></NavigationMenu.Root
>
