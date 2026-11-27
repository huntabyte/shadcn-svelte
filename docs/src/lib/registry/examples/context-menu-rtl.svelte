<script lang="ts">
	import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
	import ArrowRightIcon from "@lucide/svelte/icons/arrow-right";
	import RotateCwIcon from "@lucide/svelte/icons/rotate-cw";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import {
		ContextMenu,
		ContextMenuCheckboxItem,
		ContextMenuContent,
		ContextMenuGroup,
		ContextMenuItem,
		ContextMenuLabel,
		ContextMenuRadioGroup,
		ContextMenuRadioItem,
		ContextMenuSeparator,
		ContextMenuShortcut,
		ContextMenuSub,
		ContextMenuSubContent,
		ContextMenuSubTrigger,
		ContextMenuTrigger,
	} from "$lib/registry/ui/context-menu/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				rightClick: "Right click here",
				longPress: "Long press here",
				navigation: "Navigation",
				back: "Back",
				forward: "Forward",
				reload: "Reload",
				moreTools: "More Tools",
				savePage: "Save Page...",
				createShortcut: "Create Shortcut...",
				nameWindow: "Name Window...",
				developerTools: "Developer Tools",
				delete: "Delete",
				showBookmarks: "Show Bookmarks",
				showFullUrls: "Show Full URLs",
				people: "People",
				pedro: "Pedro Duarte",
				colm: "Colm Tuite",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				rightClick: "انقر بزر الماوس الأيمن هنا",
				longPress: "اضغط مطولاً هنا",
				navigation: "التنقل",
				back: "رجوع",
				forward: "تقدم",
				reload: "إعادة تحميل",
				moreTools: "المزيد من الأدوات",
				savePage: "حفظ الصفحة...",
				createShortcut: "إنشاء اختصار...",
				nameWindow: "تسمية النافذة...",
				developerTools: "أدوات المطور",
				delete: "حذف",
				showBookmarks: "إظهار الإشارات المرجعية",
				showFullUrls: "إظهار عناوين URL الكاملة",
				people: "الأشخاص",
				pedro: "Pedro Duarte",
				colm: "Colm Tuite",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				rightClick: "לחץ לחיצה ימנית כאן",
				longPress: "לחץ לחיצה ארוכה כאן",
				navigation: "ניווט",
				back: "חזור",
				forward: "קדימה",
				reload: "רענן",
				moreTools: "כלים נוספים",
				savePage: "שמור עמוד...",
				createShortcut: "צור קיצור דרך...",
				nameWindow: "שם חלון...",
				developerTools: "כלי מפתח",
				delete: "מחק",
				showBookmarks: "הצג סימניות",
				showFullUrls: "הצג כתובות URL מלאות",
				people: "אנשים",
				pedro: "Pedro Duarte",
				colm: "Colm Tuite",
			},
		},
	};

	const t = useTranslation(translations, "ar");

	let people = $state("pedro");
</script>

<ContextMenu>
	<ContextMenuTrigger
		class="flex aspect-video w-full max-w-xs items-center justify-center rounded-xl border border-dashed text-sm"
	>
		<span class="hidden pointer-fine:inline-block">{t.values.rightClick}</span>
		<span class="hidden pointer-coarse:inline-block">
			{t.values.longPress}
		</span>
	</ContextMenuTrigger>
	<ContextMenuContent class="w-48" data-lang={t.dir === "rtl" ? t.language : undefined}>
		<ContextMenuGroup>
			<ContextMenuSub>
				<ContextMenuSubTrigger>{t.values.navigation}</ContextMenuSubTrigger>
				<ContextMenuSubContent class="w-44" data-lang={t.dir === "rtl" ? t.language : undefined}>
					<ContextMenuGroup>
						<ContextMenuItem>
							<ArrowLeftIcon />
							{t.values.back}
							<ContextMenuShortcut>⌘[</ContextMenuShortcut>
						</ContextMenuItem>
						<ContextMenuItem disabled>
							<ArrowRightIcon />
							{t.values.forward}
							<ContextMenuShortcut>⌘]</ContextMenuShortcut>
						</ContextMenuItem>
						<ContextMenuItem>
							<RotateCwIcon />
							{t.values.reload}
							<ContextMenuShortcut>⌘R</ContextMenuShortcut>
						</ContextMenuItem>
					</ContextMenuGroup>
				</ContextMenuSubContent>
			</ContextMenuSub>
			<ContextMenuSub>
				<ContextMenuSubTrigger>{t.values.moreTools}</ContextMenuSubTrigger>
				<ContextMenuSubContent class="w-44" data-lang={t.dir === "rtl" ? t.language : undefined}>
					<ContextMenuGroup>
						<ContextMenuItem>{t.values.savePage}</ContextMenuItem>
						<ContextMenuItem>{t.values.createShortcut}</ContextMenuItem>
						<ContextMenuItem>{t.values.nameWindow}</ContextMenuItem>
					</ContextMenuGroup>
					<ContextMenuSeparator />
					<ContextMenuGroup>
						<ContextMenuItem>{t.values.developerTools}</ContextMenuItem>
					</ContextMenuGroup>
					<ContextMenuSeparator />
					<ContextMenuGroup>
						<ContextMenuItem variant="destructive">
							{t.values.delete}
						</ContextMenuItem>
					</ContextMenuGroup>
				</ContextMenuSubContent>
			</ContextMenuSub>
		</ContextMenuGroup>
		<ContextMenuSeparator />
		<ContextMenuGroup>
			<ContextMenuCheckboxItem checked>
				{t.values.showBookmarks}
			</ContextMenuCheckboxItem>
			<ContextMenuCheckboxItem>{t.values.showFullUrls}</ContextMenuCheckboxItem>
		</ContextMenuGroup>
		<ContextMenuSeparator />
		<ContextMenuGroup>
			<ContextMenuRadioGroup bind:value={people}>
				<ContextMenuLabel>{t.values.people}</ContextMenuLabel>
				<ContextMenuRadioItem value="pedro">{t.values.pedro}</ContextMenuRadioItem>
				<ContextMenuRadioItem value="colm">{t.values.colm}</ContextMenuRadioItem>
			</ContextMenuRadioGroup>
		</ContextMenuGroup>
	</ContextMenuContent>
</ContextMenu>
