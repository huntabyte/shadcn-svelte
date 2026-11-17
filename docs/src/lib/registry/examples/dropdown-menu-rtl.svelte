<script lang="ts">
	import CreditCardIcon from "@lucide/svelte/icons/credit-card";
	import SettingsIcon from "@lucide/svelte/icons/settings";
	import UserIcon from "@lucide/svelte/icons/user";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		DropdownMenu,
		DropdownMenuCheckboxItem,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuPortal,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
		DropdownMenuSeparator,
		DropdownMenuShortcut,
		DropdownMenuSub,
		DropdownMenuSubContent,
		DropdownMenuSubTrigger,
		DropdownMenuTrigger,
	} from "$lib/registry/ui/dropdown-menu/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				open: "Open",
				account: "Account",
				profile: "Profile",
				billing: "Billing",
				settings: "Settings",
				logout: "Log out",
				team: "Team",
				inviteUsers: "Invite users",
				email: "Email",
				message: "Message",
				more: "More",
				calendar: "Calendar",
				chat: "Chat",
				webhook: "Webhook",
				advanced: "Advanced...",
				newTeam: "New Team",
				view: "View",
				statusBar: "Status Bar",
				activityBar: "Activity Bar",
				panel: "Panel",
				position: "Position",
				top: "Top",
				bottom: "Bottom",
				right: "Right",
				left: "Left",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				open: "افتح القائمة",
				account: "الحساب",
				profile: "الملف الشخصي",
				billing: "الفوترة",
				settings: "الإعدادات",
				logout: "تسجيل الخروج",
				team: "الفريق",
				inviteUsers: "دعوة المستخدمين",
				email: "البريد الإلكتروني",
				message: "رسالة",
				more: "المزيد",
				calendar: "تقويم",
				chat: "دردشة",
				webhook: "خطاف ويب",
				advanced: "متقدم...",
				newTeam: "فريق جديد",
				view: "عرض",
				statusBar: "شريط الحالة",
				activityBar: "شريط النشاط",
				panel: "اللوحة",
				position: "الموضع",
				top: "أعلى",
				bottom: "أسفل",
				right: "يمين",
				left: "يسار",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				open: "פתח תפריט",
				account: "חשבון",
				profile: "פרופיל",
				billing: "חיוב",
				settings: "הגדרות",
				logout: "התנתק",
				team: "הצוות",
				inviteUsers: "הזמן משתמשים",
				email: "אימייל",
				message: "הודעה",
				more: "עוד",
				calendar: "יומן",
				chat: "צ'אט",
				webhook: "Webhook",
				advanced: "מתקדם...",
				newTeam: "צוות חדש",
				view: "תצוגה",
				statusBar: "שורת סטטוס",
				activityBar: "שורת פעילות",
				panel: "לוח",
				position: "מיקום",
				top: "למעלה",
				bottom: "למטה",
				right: "ימין",
				left: "שמאל",
			},
		},
	};

	const t = useTranslation(translations, "ar");

	let showStatusBar = $state(true);
	let showActivityBar = $state(false);
	let showPanel = $state(false);
	let position = $state("bottom");
</script>

<DropdownMenu>
	<DropdownMenuTrigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">{t.values.open}</Button>
		{/snippet}
	</DropdownMenuTrigger>
	<DropdownMenuContent class="w-36" data-lang={t.dir === "rtl" ? t.language : undefined}>
		<DropdownMenuGroup>
			<DropdownMenuSub>
				<DropdownMenuSubTrigger>{t.values.account}</DropdownMenuSubTrigger>
				<DropdownMenuPortal>
					<DropdownMenuSubContent data-lang={t.dir === "rtl" ? t.language : undefined}>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<UserIcon />
								{t.values.profile}
							</DropdownMenuItem>
							<DropdownMenuItem>
								<CreditCardIcon />
								{t.values.billing}
							</DropdownMenuItem>
							<DropdownMenuItem>
								<SettingsIcon />
								{t.values.settings}
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuSubContent>
				</DropdownMenuPortal>
			</DropdownMenuSub>
		</DropdownMenuGroup>
		<DropdownMenuSeparator />
		<DropdownMenuGroup>
			<DropdownMenuLabel>{t.values.team}</DropdownMenuLabel>
			<DropdownMenuItem>{t.values.team}</DropdownMenuItem>
			<DropdownMenuSub>
				<DropdownMenuSubTrigger>{t.values.inviteUsers}</DropdownMenuSubTrigger>
				<DropdownMenuPortal>
					<DropdownMenuSubContent data-lang={t.dir === "rtl" ? t.language : undefined}>
						<DropdownMenuItem>{t.values.email}</DropdownMenuItem>
						<DropdownMenuItem>{t.values.message}</DropdownMenuItem>
						<DropdownMenuSub>
							<DropdownMenuSubTrigger>{t.values.more}</DropdownMenuSubTrigger>
							<DropdownMenuPortal>
								<DropdownMenuSubContent data-lang={t.dir === "rtl" ? t.language : undefined}>
									<DropdownMenuItem>{t.values.calendar}</DropdownMenuItem>
									<DropdownMenuItem>{t.values.chat}</DropdownMenuItem>
									<DropdownMenuSeparator />
									<DropdownMenuItem>{t.values.webhook}</DropdownMenuItem>
								</DropdownMenuSubContent>
							</DropdownMenuPortal>
						</DropdownMenuSub>
						<DropdownMenuSeparator />
						<DropdownMenuItem>{t.values.advanced}</DropdownMenuItem>
					</DropdownMenuSubContent>
				</DropdownMenuPortal>
			</DropdownMenuSub>
			<DropdownMenuItem>
				{t.values.newTeam}
				<DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
			</DropdownMenuItem>
		</DropdownMenuGroup>
		<DropdownMenuSeparator />
		<DropdownMenuGroup>
			<DropdownMenuLabel>{t.values.view}</DropdownMenuLabel>
			<DropdownMenuCheckboxItem bind:checked={showStatusBar}>
				{t.values.statusBar}
			</DropdownMenuCheckboxItem>
			<DropdownMenuCheckboxItem bind:checked={showActivityBar}>
				{t.values.activityBar}
			</DropdownMenuCheckboxItem>
			<DropdownMenuCheckboxItem bind:checked={showPanel}>
				{t.values.panel}
			</DropdownMenuCheckboxItem>
		</DropdownMenuGroup>
		<DropdownMenuSeparator />
		<DropdownMenuGroup>
			<DropdownMenuLabel>{t.values.position}</DropdownMenuLabel>
			<DropdownMenuRadioGroup bind:value={position}>
				<DropdownMenuRadioItem value="top">{t.values.top}</DropdownMenuRadioItem>
				<DropdownMenuRadioItem value="bottom">
					{t.values.bottom}
				</DropdownMenuRadioItem>
				<DropdownMenuRadioItem value="right">
					{t.values.right}
				</DropdownMenuRadioItem>
				<DropdownMenuRadioItem value="left">{t.values.left}</DropdownMenuRadioItem>
			</DropdownMenuRadioGroup>
		</DropdownMenuGroup>
		<DropdownMenuSeparator />
		<DropdownMenuGroup>
			<DropdownMenuItem variant="destructive">{t.values.logout}</DropdownMenuItem>
		</DropdownMenuGroup>
	</DropdownMenuContent>
</DropdownMenu>
