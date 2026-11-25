<script lang="ts">
	import Calculator from "@lucide/svelte/icons/calculator";
	import Calendar from "@lucide/svelte/icons/calendar";
	import CreditCard from "@lucide/svelte/icons/credit-card";
	import Settings from "@lucide/svelte/icons/settings";
	import Smile from "@lucide/svelte/icons/smile";
	import User from "@lucide/svelte/icons/user";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import {
		Command,
		CommandEmpty,
		CommandGroup,
		CommandInput,
		CommandItem,
		CommandList,
		CommandSeparator,
		CommandShortcut,
	} from "$lib/registry/ui/command/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				placeholder: "Type a command or search...",
				empty: "No results found.",
				suggestions: "Suggestions",
				calendar: "Calendar",
				searchEmoji: "Search Emoji",
				calculator: "Calculator",
				settings: "Settings",
				profile: "Profile",
				billing: "Billing",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				placeholder: "اكتب أمرًا أو ابحث...",
				empty: "لم يتم العثور على نتائج.",
				suggestions: "اقتراحات",
				calendar: "التقويم",
				searchEmoji: "البحث عن الرموز التعبيرية",
				calculator: "الآلة الحاسبة",
				settings: "الإعدادات",
				profile: "الملف الشخصي",
				billing: "الفوترة",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				placeholder: "הקלד פקודה או חפש...",
				empty: "לא נמצאו תוצאות.",
				suggestions: "הצעות",
				calendar: "לוח שנה",
				searchEmoji: "חפש אמוג'י",
				calculator: "מחשבון",
				settings: "הגדרות",
				profile: "פרופיל",
				billing: "חיוב",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<Command class="max-w-sm rounded-lg border" dir={t.dir}>
	<CommandInput placeholder={t.values.placeholder} dir={t.dir} />
	<CommandList>
		<CommandEmpty>{t.values.empty}</CommandEmpty>
		<CommandGroup heading={t.values.suggestions}>
			<CommandItem value={t.values.calendar}>
				<Calendar />
				<span>{t.values.calendar}</span>
			</CommandItem>
			<CommandItem value={t.values.searchEmoji}>
				<Smile />
				<span>{t.values.searchEmoji}</span>
			</CommandItem>
			<CommandItem disabled value={t.values.calculator}>
				<Calculator />
				<span>{t.values.calculator}</span>
			</CommandItem>
		</CommandGroup>
		<CommandSeparator />
		<CommandGroup heading={t.values.settings}>
			<CommandItem value={t.values.profile}>
				<User />
				<span>{t.values.profile}</span>
				<CommandShortcut>⌘P</CommandShortcut>
			</CommandItem>
			<CommandItem value={t.values.billing}>
				<CreditCard />
				<span>{t.values.billing}</span>
				<CommandShortcut>⌘B</CommandShortcut>
			</CommandItem>
			<CommandItem value={t.values.settings}>
				<Settings />
				<span>{t.values.settings}</span>
				<CommandShortcut>⌘S</CommandShortcut>
			</CommandItem>
		</CommandGroup>
	</CommandList>
</Command>
