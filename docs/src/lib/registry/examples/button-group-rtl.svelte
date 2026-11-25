<script lang="ts">
	import ArchiveIcon from "@lucide/svelte/icons/archive";
	import ArrowLeftIcon from "@lucide/svelte/icons/arrow-left";
	import CalendarPlusIcon from "@lucide/svelte/icons/calendar-plus";
	import ClockIcon from "@lucide/svelte/icons/clock";
	import ListFilterIcon from "@lucide/svelte/icons/list-filter";
	import MailCheckIcon from "@lucide/svelte/icons/mail-check";
	import MoreHorizontalIcon from "@lucide/svelte/icons/more-horizontal";
	import TagIcon from "@lucide/svelte/icons/tag";
	import Trash2Icon from "@lucide/svelte/icons/trash-2";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuItem,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
		DropdownMenuSeparator,
		DropdownMenuSub,
		DropdownMenuSubContent,
		DropdownMenuSubTrigger,
		DropdownMenuTrigger,
	} from "$lib/registry/ui/dropdown-menu/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				archive: "Archive",
				report: "Report",
				snooze: "Snooze",
				markAsRead: "Mark as Read",
				addToCalendar: "Add to Calendar",
				addToList: "Add to List",
				labelAs: "Label As...",
				personal: "Personal",
				work: "Work",
				other: "Other",
				trash: "Trash",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				archive: "أرشفة",
				report: "تقرير",
				snooze: "تأجيل",
				markAsRead: "وضع علامة كمقروء",
				addToCalendar: "إضافة إلى التقويم",
				addToList: "إضافة إلى القائمة",
				labelAs: "تصنيف كـ...",
				personal: "شخصي",
				work: "عمل",
				other: "آخر",
				trash: "سلة المهملات",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				archive: "ארכיון",
				report: "דוח",
				snooze: "דחה",
				markAsRead: "סמן כנקרא",
				addToCalendar: "הוסף ליומן",
				addToList: "הוסף לרשימה",
				labelAs: "תייג כ...",
				personal: "אישי",
				work: "עבודה",
				other: "אחר",
				trash: "פח",
			},
		},
	};

	const t = useTranslation(translations, "ar");

	let label = $state("personal");
</script>

<div dir={t.dir}>
	<ButtonGroup>
		<ButtonGroup class="hidden sm:flex">
			<Button variant="outline" size="icon" aria-label="Go Back">
				<ArrowLeftIcon class="rtl:rotate-180" />
			</Button>
		</ButtonGroup>
		<ButtonGroup>
			<Button variant="outline">{t.values.archive}</Button>
			<Button variant="outline">{t.values.report}</Button>
		</ButtonGroup>
		<ButtonGroup>
			<Button variant="outline">{t.values.snooze}</Button>
			<DropdownMenu>
				<DropdownMenuTrigger>
					{#snippet child({ props })}
						<Button {...props} variant="outline" size="icon" aria-label="More Options">
							<MoreHorizontalIcon />
						</Button>
					{/snippet}
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align={t.dir === "rtl" ? "end" : "end"}
					data-lang={t.dir === "rtl" ? t.language : undefined}
					class="w-40"
				>
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<MailCheckIcon />
							{t.values.markAsRead}
						</DropdownMenuItem>
						<DropdownMenuItem>
							<ArchiveIcon />
							{t.values.archive}
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<ClockIcon />
							{t.values.snooze}
						</DropdownMenuItem>
						<DropdownMenuItem>
							<CalendarPlusIcon />
							{t.values.addToCalendar}
						</DropdownMenuItem>
						<DropdownMenuItem>
							<ListFilterIcon />
							{t.values.addToList}
						</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>
								<TagIcon />
								{t.values.labelAs}
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent data-lang={t.dir === "rtl" ? t.language : undefined}>
								<DropdownMenuRadioGroup bind:value={label}>
									<DropdownMenuRadioItem value="personal">
										{t.values.personal}
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="work">
										{t.values.work}
									</DropdownMenuRadioItem>
									<DropdownMenuRadioItem value="other">
										{t.values.other}
									</DropdownMenuRadioItem>
								</DropdownMenuRadioGroup>
							</DropdownMenuSubContent>
						</DropdownMenuSub>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem variant="destructive">
							<Trash2Icon />
							{t.values.trash}
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</ButtonGroup>
	</ButtonGroup>
</div>
