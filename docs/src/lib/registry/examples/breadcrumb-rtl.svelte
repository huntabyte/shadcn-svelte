<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import DotIcon from "@lucide/svelte/icons/dot";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import {
		Breadcrumb,
		BreadcrumbItem,
		BreadcrumbLink,
		BreadcrumbList,
		BreadcrumbPage,
		BreadcrumbSeparator,
	} from "$lib/registry/ui/breadcrumb/index.js";
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuGroup,
		DropdownMenuItem,
		DropdownMenuTrigger,
	} from "$lib/registry/ui/dropdown-menu/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				home: "Home",
				components: "Components",
				documentation: "Documentation",
				themes: "Themes",
				github: "GitHub",
				breadcrumb: "Breadcrumb",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				home: "الرئيسية",
				components: "المكونات",
				documentation: "التوثيق",
				themes: "السمات",
				github: "جيت هاب",
				breadcrumb: "مسار التنقل",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				home: "בית",
				components: "רכיבים",
				documentation: "תיעוד",
				themes: "ערכות נושא",
				github: "גיטהאב",
				breadcrumb: "פירורי לחם",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<Breadcrumb dir={t.dir}>
	<BreadcrumbList>
		<BreadcrumbItem>
			<BreadcrumbLink>
				{#snippet child({ props })}
					<a {...props} href="/">{t.values.home}</a>
				{/snippet}
			</BreadcrumbLink>
		</BreadcrumbItem>
		<BreadcrumbSeparator>
			<DotIcon />
		</BreadcrumbSeparator>
		<BreadcrumbItem>
			<DropdownMenu>
				<DropdownMenuTrigger>
					{#snippet child({ props })}
						<button {...props} class="flex items-center gap-1">
							{t.values.components}
							<ChevronDownIcon class="size-3.5" />
						</button>
					{/snippet}
				</DropdownMenuTrigger>
				<DropdownMenuContent data-lang={t.dir === "rtl" ? t.language : undefined}>
					<DropdownMenuGroup>
						<DropdownMenuItem>{t.values.documentation}</DropdownMenuItem>
						<DropdownMenuItem>{t.values.themes}</DropdownMenuItem>
						<DropdownMenuItem>{t.values.github}</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		</BreadcrumbItem>
		<BreadcrumbSeparator>
			<DotIcon />
		</BreadcrumbSeparator>
		<BreadcrumbItem>
			<BreadcrumbPage>{t.values.breadcrumb}</BreadcrumbPage>
		</BreadcrumbItem>
	</BreadcrumbList>
</Breadcrumb>
