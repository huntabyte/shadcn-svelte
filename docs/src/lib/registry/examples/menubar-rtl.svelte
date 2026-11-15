<script lang="ts">
	import * as Menubar from "$lib/registry/ui/menubar/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				file: "File",
				newTab: "New Tab",
				newWindow: "New Window",
				newIncognitoWindow: "New Incognito Window",
				share: "Share",
				emailLink: "Email link",
				messages: "Messages",
				notes: "Notes",
				print: "Print...",
				edit: "Edit",
				undo: "Undo",
				redo: "Redo",
				find: "Find",
				searchTheWeb: "Search the web",
				findItem: "Find...",
				findNext: "Find Next",
				findPrevious: "Find Previous",
				cut: "Cut",
				copy: "Copy",
				paste: "Paste",
				view: "View",
				bookmarksBar: "Bookmarks Bar",
				fullUrls: "Full URLs",
				reload: "Reload",
				forceReload: "Force Reload",
				toggleFullscreen: "Toggle Fullscreen",
				hideSidebar: "Hide Sidebar",
				profiles: "Profiles",
				andy: "Andy",
				benoit: "Benoit",
				luis: "Luis",
				editProfile: "Edit...",
				addProfile: "Add Profile...",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				file: "ملف",
				newTab: "علامة تبويب جديدة",
				newWindow: "نافذة جديدة",
				newIncognitoWindow: "نافذة التصفح المتخفي الجديدة",
				share: "مشاركة",
				emailLink: "رابط البريد الإلكتروني",
				messages: "الرسائل",
				notes: "الملاحظات",
				print: "طباعة...",
				edit: "تعديل",
				undo: "تراجع",
				redo: "إعادة",
				find: "بحث",
				searchTheWeb: "البحث على الويب",
				findItem: "بحث...",
				findNext: "البحث التالي",
				findPrevious: "البحث السابق",
				cut: "قص",
				copy: "نسخ",
				paste: "لصق",
				view: "عرض",
				bookmarksBar: "شريط الإشارات المرجعية",
				fullUrls: "عناوين URL الكاملة",
				reload: "إعادة تحميل",
				forceReload: "إعادة تحميل قسري",
				toggleFullscreen: "تبديل وضع ملء الشاشة",
				hideSidebar: "إخفاء الشريط الجانبي",
				profiles: "الملفات الشخصية",
				andy: "Andy",
				benoit: "Benoit",
				luis: "Luis",
				editProfile: "تعديل...",
				addProfile: "إضافة ملف شخصي...",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				file: "קובץ",
				newTab: "כרטיסייה חדשה",
				newWindow: "חלון חדש",
				newIncognitoWindow: "חלון גלישה בסתר חדש",
				share: "שתף",
				emailLink: "קישור אימייל",
				messages: "הודעות",
				notes: "הערות",
				print: "הדפס...",
				edit: "ערוך",
				undo: "בטל",
				redo: "בצע שוב",
				find: "מצא",
				searchTheWeb: "חפש באינטרנט",
				findItem: "מצא...",
				findNext: "מצא הבא",
				findPrevious: "מצא הקודם",
				cut: "גזור",
				copy: "העתק",
				paste: "הדבק",
				view: "תצוגה",
				bookmarksBar: "סרגל סימניות",
				fullUrls: "כתובות URL מלאות",
				reload: "רענן",
				forceReload: "רענן בכוח",
				toggleFullscreen: "החלף מסך מלא",
				hideSidebar: "הסתר סרגל צד",
				profiles: "פרופילים",
				andy: "Andy",
				benoit: "Benoit",
				luis: "Luis",
				editProfile: "ערוך...",
				addProfile: "הוסף פרופיל...",
			},
		},
	};
	const t = useTranslation(translations, "ar");
	let bookmarks = $state(false);
	let fullUrls = $state(true);
	let profileRadioValue = $state("benoit");
</script>

<Menubar.Root class="w-72" dir={t.dir}>
	<Menubar.Menu>
		<Menubar.Trigger>{t.values.file}</Menubar.Trigger>
		<Menubar.Content data-lang={t.dir === "rtl" ? t.language : undefined}>
			<Menubar.Group>
				<Menubar.Item>
					{t.values.newTab}
					<Menubar.Shortcut>⌘T</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>
					{t.values.newWindow}
					<Menubar.Shortcut>⌘N</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item disabled>{t.values.newIncognitoWindow}</Menubar.Item>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Sub>
					<Menubar.SubTrigger>{t.values.share}</Menubar.SubTrigger>
					<Menubar.SubContent data-lang={t.dir === "rtl" ? t.language : undefined}>
						<Menubar.Group>
							<Menubar.Item>{t.values.emailLink}</Menubar.Item>
							<Menubar.Item>{t.values.messages}</Menubar.Item>
							<Menubar.Item>{t.values.notes}</Menubar.Item>
						</Menubar.Group>
					</Menubar.SubContent>
				</Menubar.Sub>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Item>
					{t.values.print}
					<Menubar.Shortcut>⌘P</Menubar.Shortcut>
				</Menubar.Item>
			</Menubar.Group>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>{t.values.edit}</Menubar.Trigger>
		<Menubar.Content data-lang={t.dir === "rtl" ? t.language : undefined}>
			<Menubar.Group>
				<Menubar.Item>
					{t.values.undo}
					<Menubar.Shortcut>⌘Z</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item>
					{t.values.redo}
					<Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
				</Menubar.Item>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Sub>
					<Menubar.SubTrigger>{t.values.find}</Menubar.SubTrigger>
					<Menubar.SubContent data-lang={t.dir === "rtl" ? t.language : undefined}>
						<Menubar.Group>
							<Menubar.Item>{t.values.searchTheWeb}</Menubar.Item>
						</Menubar.Group>
						<Menubar.Separator />
						<Menubar.Group>
							<Menubar.Item>{t.values.findItem}</Menubar.Item>
							<Menubar.Item>{t.values.findNext}</Menubar.Item>
							<Menubar.Item>{t.values.findPrevious}</Menubar.Item>
						</Menubar.Group>
					</Menubar.SubContent>
				</Menubar.Sub>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Item>{t.values.cut}</Menubar.Item>
				<Menubar.Item>{t.values.copy}</Menubar.Item>
				<Menubar.Item>{t.values.paste}</Menubar.Item>
			</Menubar.Group>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>{t.values.view}</Menubar.Trigger>
		<Menubar.Content class="w-44" data-lang={t.dir === "rtl" ? t.language : undefined}>
			<Menubar.Group>
				<Menubar.CheckboxItem bind:checked={bookmarks}>{t.values.bookmarksBar}</Menubar.CheckboxItem
				>
				<Menubar.CheckboxItem bind:checked={fullUrls}>{t.values.fullUrls}</Menubar.CheckboxItem>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Item inset>
					Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
				</Menubar.Item>
				<Menubar.Item disabled inset>
					Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
				</Menubar.Item>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Item inset>{t.values.toggleFullscreen}</Menubar.Item>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Item inset>{t.values.hideSidebar}</Menubar.Item>
			</Menubar.Group>
		</Menubar.Content>
	</Menubar.Menu>
	<Menubar.Menu>
		<Menubar.Trigger>{t.values.profiles}</Menubar.Trigger>
		<Menubar.Content data-lang={t.dir === "rtl" ? t.language : undefined}>
			<Menubar.RadioGroup bind:value={profileRadioValue}>
				<Menubar.RadioItem value="andy">{t.values.andy}</Menubar.RadioItem>
				<Menubar.RadioItem value="benoit">{t.values.benoit}</Menubar.RadioItem>
				<Menubar.RadioItem value="Luis">{t.values.luis}</Menubar.RadioItem>
			</Menubar.RadioGroup>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Item inset>{t.values.editProfile}</Menubar.Item>
			</Menubar.Group>
			<Menubar.Separator />
			<Menubar.Group>
				<Menubar.Item inset>{t.values.addProfile}</Menubar.Item>
			</Menubar.Group>
		</Menubar.Content>
	</Menubar.Menu>
</Menubar.Root>
