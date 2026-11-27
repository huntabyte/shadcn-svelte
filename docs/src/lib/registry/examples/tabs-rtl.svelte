<script lang="ts">
	import * as Card from "$lib/registry/ui/card/index.js";
	import * as Tabs from "$lib/registry/ui/tabs/index.js";
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {
				overview: "Overview",
				analytics: "Analytics",
				reports: "Reports",
				settings: "Settings",
				overviewTitle: "Overview",
				overviewDesc:
					"View your key metrics and recent project activity. Track progress across all your active projects.",
				overviewContent: "You have 12 active projects and 3 pending tasks.",
				analyticsTitle: "Analytics",
				analyticsDesc:
					"Track performance and user engagement metrics. Monitor trends and identify growth opportunities.",
				analyticsContent: "Page views are up 25% compared to last month.",
				reportsTitle: "Reports",
				reportsDesc:
					"Generate and download your detailed reports. Export data in multiple formats for analysis.",
				reportsContent: "You have 5 reports ready and available to export.",
				settingsTitle: "Settings",
				settingsDesc:
					"Manage your account preferences and options. Customize your experience to fit your needs.",
				settingsContent: "Configure notifications, security, and themes.",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				overview: "نظرة عامة",
				analytics: "التحليلات",
				reports: "التقارير",
				settings: "الإعدادات",
				overviewTitle: "نظرة عامة",
				overviewDesc:
					"عرض مقاييسك الرئيسية وأنشطة المشروع الأخيرة. تتبع التقدم عبر جميع مشاريعك النشطة.",
				overviewContent: "لديك ١٢ مشروعًا نشطًا و٣ مهام معلقة.",
				analyticsTitle: "التحليلات",
				analyticsDesc: "تتبع مقاييس الأداء ومشاركة المستخدمين. راقب الاتجاهات وحدد فرص النمو.",
				analyticsContent: "زادت مشاهدات الصفحة بنسبة ٢٥٪ مقارنة بالشهر الماضي.",
				reportsTitle: "التقارير",
				reportsDesc: "إنشاء وتنزيل تقاريرك التفصيلية. تصدير البيانات بتنسيقات متعددة للتحليل.",
				reportsContent: "لديك ٥ تقارير جاهزة ومتاحة للتصدير.",
				settingsTitle: "الإعدادات",
				settingsDesc: "إدارة تفضيلات حسابك وخياراته. تخصيص تجربتك لتناسب احتياجاتك.",
				settingsContent: "تكوين الإشعارات والأمان والسمات.",
			},
		},
		he: {
			dir: "rtl",
			values: {
				overview: "סקירה כללית",
				analytics: "אנליטיקה",
				reports: "דוחות",
				settings: "הגדרות",
				overviewTitle: "סקירה כללית",
				overviewDesc:
					"הצג את המדדים העיקריים שלך ופעילות הפרויקט האחרונה. עקוב אחר התקדמות בכל הפרויקטים הפעילים שלך.",
				overviewContent: "יש לך 12 פרויקטים פעילים ו-3 משימות ממתינות.",
				analyticsTitle: "אנליטיקה",
				analyticsDesc:
					"עקוב אחר ביצועים ומדדי מעורבות משתמשים. עקוב אחר מגמות וזהה הזדמנויות צמיחה.",
				analyticsContent: "צפיות בדף עלו ב-25% בהשוואה לחודש שעבר.",
				reportsTitle: "דוחות",
				reportsDesc: "צור והורד את הדוחות המפורטים שלך. ייצא נתונים בפורמטים מרובים לניתוח.",
				reportsContent: "יש לך 5 דוחות מוכנים וזמינים לייצוא.",
				settingsTitle: "הגדרות",
				settingsDesc:
					"נהל את העדפות החשבון והאפשרויות שלך. התאם אישית את החוויה שלך כך שתתאים לצרכים שלך.",
				settingsContent: "הגדר התראות, אבטחה וערכות נושא.",
			},
		},
	} satisfies Translations;
	const t = useTranslation(translations, "ar");
	const sections = ["overview", "analytics", "reports", "settings"] as const;
</script>

<Tabs.Root value="overview" class="w-full max-w-sm" dir={t.dir}>
	<Tabs.List dir={t.dir}
		>{#each sections as section (section)}<Tabs.Trigger value={section}
				>{t.values[section]}</Tabs.Trigger
			>{/each}</Tabs.List
	>
	{#each sections as section (section)}<Tabs.Content value={section}
			><Card.Root dir={t.dir}
				><Card.Header
					><Card.Title>{t.values[`${section}Title`]}</Card.Title><Card.Description
						>{t.values[`${section}Desc`]}</Card.Description
					></Card.Header
				><Card.Content class="text-sm text-muted-foreground"
					>{t.values[`${section}Content`]}</Card.Content
				></Card.Root
			></Tabs.Content
		>{/each}
</Tabs.Root>
