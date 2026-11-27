<script lang="ts">
	import BadgeCheck from "@lucide/svelte/icons/badge-check";
	import Bell from "@lucide/svelte/icons/bell";
	import BookOpen from "@lucide/svelte/icons/book-open";
	import Bot from "@lucide/svelte/icons/bot";
	import ChevronRight from "@lucide/svelte/icons/chevron-right";
	import ChevronsUpDown from "@lucide/svelte/icons/chevrons-up-down";
	import CreditCard from "@lucide/svelte/icons/credit-card";
	import Folder from "@lucide/svelte/icons/folder";
	import Forward from "@lucide/svelte/icons/forward";
	import Frame from "@lucide/svelte/icons/frame";
	import GalleryVerticalEnd from "@lucide/svelte/icons/gallery-vertical-end";
	import LogOut from "@lucide/svelte/icons/log-out";
	import Map from "@lucide/svelte/icons/map";
	import MoreHorizontal from "@lucide/svelte/icons/more-horizontal";
	import PieChart from "@lucide/svelte/icons/pie-chart";
	import Settings2 from "@lucide/svelte/icons/settings-2";
	import Sparkles from "@lucide/svelte/icons/sparkles";
	import SquareTerminal from "@lucide/svelte/icons/square-terminal";
	import Trash2 from "@lucide/svelte/icons/trash-2";
	import { MediaQuery } from "svelte/reactivity";
	import * as Avatar from "$lib/registry/ui/avatar/index.js";
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import * as Sidebar from "$lib/registry/ui/sidebar/index.js";
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {
				teamName: "Acme Inc",
				teamPlan: "Enterprise",
				platform: "Platform",
				projects: "Projects",
				viewProject: "View Project",
				shareProject: "Share Project",
				deleteProject: "Delete Project",
				more: "More",
				upgradeToPro: "Upgrade to Pro",
				account: "Account",
				billing: "Billing",
				notifications: "Notifications",
				logOut: "Log out",
				playground: "Playground",
				history: "History",
				starred: "Starred",
				settings: "Settings",
				models: "Models",
				genesis: "Genesis",
				explorer: "Explorer",
				quantum: "Quantum",
				documentation: "Documentation",
				introduction: "Introduction",
				getStarted: "Get Started",
				tutorials: "Tutorials",
				changelog: "Changelog",
				general: "General",
				team: "Team",
				limits: "Limits",
				designEngineering: "Design Engineering",
				salesMarketing: "Sales & Marketing",
				travel: "Travel",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				teamName: "شركة أكمي",
				teamPlan: "المؤسسة",
				platform: "المنصة",
				projects: "المشاريع",
				viewProject: "عرض المشروع",
				shareProject: "مشاركة المشروع",
				deleteProject: "حذف المشروع",
				more: "المزيد",
				upgradeToPro: "ترقية إلى Pro",
				account: "الحساب",
				billing: "الفوترة",
				notifications: "الإشعارات",
				logOut: "تسجيل الخروج",
				playground: "ملعب",
				history: "السجل",
				starred: "المميز",
				settings: "الإعدادات",
				models: "النماذج",
				genesis: "جينيسيس",
				explorer: "إكسبلورر",
				quantum: "كوانتوم",
				documentation: "التوثيق",
				introduction: "مقدمة",
				getStarted: "ابدأ",
				tutorials: "الدروس",
				changelog: "سجل التغييرات",
				general: "عام",
				team: "الفريق",
				limits: "الحدود",
				designEngineering: "هندسة التصميم",
				salesMarketing: "المبيعات والتسويق",
				travel: "السفر",
			},
		},
		he: {
			dir: "rtl",
			values: {
				teamName: "אקמי בע״מ",
				teamPlan: "ארגוני",
				platform: "פלטפורמה",
				projects: "פרויקטים",
				viewProject: "הצג פרויקט",
				shareProject: "שתף פרויקט",
				deleteProject: "מחק פרויקט",
				more: "עוד",
				upgradeToPro: "שדרג ל-Pro",
				account: "חשבון",
				billing: "חיוב",
				notifications: "התראות",
				logOut: "התנתק",
				playground: "מגרש משחקים",
				history: "היסטוריה",
				starred: "מועדפים",
				settings: "הגדרות",
				models: "מודלים",
				genesis: "ג'נסיס",
				explorer: "אקספלורר",
				quantum: "קוונטום",
				documentation: "תיעוד",
				introduction: "מבוא",
				getStarted: "התחל",
				tutorials: "מדריכים",
				changelog: "יומן שינויים",
				general: "כללי",
				team: "צוות",
				limits: "מגבלות",
				designEngineering: "הנדסת עיצוב",
				salesMarketing: "מכירות ושיווק",
				travel: "נסיעות",
			},
		},
	} satisfies Translations;
	const t = useTranslation(translations, "ar");
	const navMain = $derived([
		{
			title: t.values.playground,
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{ title: t.values.history, url: "#" },
				{ title: t.values.starred, url: "#" },
				{ title: t.values.settings, url: "#" },
			],
		},
		{
			title: t.values.models,
			url: "#",
			icon: Bot,
			items: [
				{ title: t.values.genesis, url: "#" },
				{ title: t.values.explorer, url: "#" },
				{ title: t.values.quantum, url: "#" },
			],
		},
		{
			title: t.values.documentation,
			url: "#",
			icon: BookOpen,
			items: [
				{ title: t.values.introduction, url: "#" },
				{ title: t.values.getStarted, url: "#" },
				{ title: t.values.tutorials, url: "#" },
				{ title: t.values.changelog, url: "#" },
			],
		},
		{
			title: t.values.settings,
			url: "#",
			icon: Settings2,
			items: [
				{ title: t.values.general, url: "#" },
				{ title: t.values.team, url: "#" },
				{ title: t.values.billing, url: "#" },
				{ title: t.values.limits, url: "#" },
			],
		},
	]);

	const projects = $derived([
		{ name: t.values.designEngineering, url: "#", icon: Frame },
		{ name: t.values.salesMarketing, url: "#", icon: PieChart },
		{ name: t.values.travel, url: "#", icon: Map },
	]);

	const user = {
		name: "shadcn",
		email: "m@example.com",
		avatar: "/avatars/shadcn.jpg",
	};
	const isMobile = new MediaQuery("(max-width: 767px)");
</script>

<Sidebar.Provider>
	<Sidebar.Root collapsible="icon" dir={t.dir} side={t.dir === "ltr" ? "left" : "right"}>
		<Sidebar.Header
			><Sidebar.Menu
				><Sidebar.MenuItem
					><Sidebar.MenuButton size="lg">
						{#snippet child({ props })}<!-- svelte-ignore a11y_invalid_attribute -->
							<a href="#" {...props}
								><div
									class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
								>
									<GalleryVerticalEnd class="size-4" />
								</div>
								<div class="flex flex-col gap-0.5 leading-none">
									<span class="font-medium">{t.values.teamName}</span><span
										>{t.values.teamPlan}</span
									>
								</div></a
							>{/snippet}
					</Sidebar.MenuButton></Sidebar.MenuItem
				></Sidebar.Menu
			></Sidebar.Header
		>
		<Sidebar.Content>
			<Sidebar.Group
				><Sidebar.GroupLabel>{t.values.platform}</Sidebar.GroupLabel><Sidebar.Menu>
					{#each navMain as item (item.title)}
						<Collapsible.Root open={item.isActive ?? false} class="group/collapsible">
							{#snippet child({ props })}<Sidebar.MenuItem {...props}>
									<Collapsible.Trigger
										>{#snippet child({ props })}<Sidebar.MenuButton
												{...props}
												tooltipContent={item.title}
												><item.icon /><span>{item.title}</span><ChevronRight
													class="ms-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 rtl:rotate-180 rtl:group-data-[state=open]/collapsible:rotate-90"
												/></Sidebar.MenuButton
											>{/snippet}</Collapsible.Trigger
									>
									<Collapsible.Content
										><Sidebar.MenuSub
											>{#each item.items as subItem (subItem.title)}<Sidebar.MenuSubItem
													><Sidebar.MenuSubButton href={subItem.url}
														><span>{subItem.title}</span></Sidebar.MenuSubButton
													></Sidebar.MenuSubItem
												>{/each}</Sidebar.MenuSub
										></Collapsible.Content
									>
								</Sidebar.MenuItem>{/snippet}
						</Collapsible.Root>
					{/each}</Sidebar.Menu
				></Sidebar.Group
			>
			<Sidebar.Group class="group-data-[collapsible=icon]:hidden"
				><Sidebar.GroupLabel>{t.values.projects}</Sidebar.GroupLabel><Sidebar.Menu>
					{#each projects as item (item.name)}<Sidebar.MenuItem>
							<Sidebar.MenuButton
								>{#snippet child({ props })}<a href={item.url} {...props}
										><item.icon /><span>{item.name}</span></a
									>{/snippet}</Sidebar.MenuButton
							>
							<DropdownMenu.Root
								><DropdownMenu.Trigger
									>{#snippet child({ props })}<Sidebar.MenuAction {...props} showOnHover
											><MoreHorizontal /><span class="sr-only">{t.values.more}</span
											></Sidebar.MenuAction
										>{/snippet}</DropdownMenu.Trigger
								>
								<DropdownMenu.Content
									class="w-48 rounded-lg"
									side={isMobile.current ? "bottom" : "right"}
									align={isMobile.current ? "end" : "start"}
									dir={t.dir}
								>
									<DropdownMenu.Group
										><DropdownMenu.Item
											><Folder class="text-muted-foreground" /><span>{t.values.viewProject}</span
											></DropdownMenu.Item
										><DropdownMenu.Item
											><Forward class="text-muted-foreground" /><span>{t.values.shareProject}</span
											></DropdownMenu.Item
										></DropdownMenu.Group
									><DropdownMenu.Separator /><DropdownMenu.Group
										><DropdownMenu.Item
											><Trash2 class="text-muted-foreground" /><span>{t.values.deleteProject}</span
											></DropdownMenu.Item
										></DropdownMenu.Group
									>
								</DropdownMenu.Content></DropdownMenu.Root
							></Sidebar.MenuItem
						>{/each}
					<Sidebar.MenuItem
						><Sidebar.MenuButton class="text-sidebar-foreground/70"
							><MoreHorizontal class="text-sidebar-foreground/70" /><span>{t.values.more}</span
							></Sidebar.MenuButton
						></Sidebar.MenuItem
					>
				</Sidebar.Menu></Sidebar.Group
			></Sidebar.Content
		>
		<Sidebar.Footer
			><Sidebar.Menu
				><Sidebar.MenuItem
					><DropdownMenu.Root
						><DropdownMenu.Trigger>
							{#snippet child({ props })}<Sidebar.MenuButton
									{...props}
									size="lg"
									class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									<Avatar.Root class="rounded-lg"
										><Avatar.Image src={user.avatar} alt={user.name} /><Avatar.Fallback
											class="rounded-lg">CN</Avatar.Fallback
										></Avatar.Root
									>
									<div class="grid flex-1 text-start text-sm leading-tight">
										<span class="truncate font-medium">{user.name}</span><span
											class="truncate text-xs">{user.email}</span
										>
									</div>
									<ChevronsUpDown class="ms-auto size-4" />
								</Sidebar.MenuButton>{/snippet}</DropdownMenu.Trigger
						>
						<DropdownMenu.Content
							class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
							side={isMobile.current ? "bottom" : "right"}
							align="end"
							sideOffset={4}
							dir={t.dir}
						>
							<DropdownMenu.Group
								><DropdownMenu.Label class="p-0 font-normal"
									><div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
										<Avatar.Root
											><Avatar.Image src={user.avatar} alt={user.name} /><Avatar.Fallback
												class="rounded-lg">CN</Avatar.Fallback
											></Avatar.Root
										>
										<div class="grid flex-1 text-start text-sm leading-tight">
											<span class="truncate font-medium">{user.name}</span><span
												class="truncate text-xs">{user.email}</span
											>
										</div>
									</div></DropdownMenu.Label
								></DropdownMenu.Group
							>
							<DropdownMenu.Separator /><DropdownMenu.Group
								><DropdownMenu.Item><Sparkles />{t.values.upgradeToPro}</DropdownMenu.Item
								></DropdownMenu.Group
							>
							<DropdownMenu.Separator /><DropdownMenu.Group
								><DropdownMenu.Item><BadgeCheck />{t.values.account}</DropdownMenu.Item
								><DropdownMenu.Item><CreditCard />{t.values.billing}</DropdownMenu.Item
								><DropdownMenu.Item><Bell />{t.values.notifications}</DropdownMenu.Item
								></DropdownMenu.Group
							>
							<DropdownMenu.Separator /><DropdownMenu.Group
								><DropdownMenu.Item><LogOut />{t.values.logOut}</DropdownMenu.Item
								></DropdownMenu.Group
							>
						</DropdownMenu.Content></DropdownMenu.Root
					></Sidebar.MenuItem
				></Sidebar.Menu
			></Sidebar.Footer
		>
		<Sidebar.Rail /></Sidebar.Root
	>
	<Sidebar.Inset
		><header
			class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
			dir={t.dir}
		>
			<div class="flex items-center gap-2 px-4">
				<Sidebar.Trigger class="-ml-1" />
			</div>
		</header></Sidebar.Inset
	>
</Sidebar.Provider>
