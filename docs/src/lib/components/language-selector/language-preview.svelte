<script lang="ts">
	import InfoIcon from "@lucide/svelte/icons/info";
	import { type Snippet } from "svelte";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import * as Select from "$lib/registry/ui/select/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { DirectionProvider } from "$lib/registry/ui/direction/index.js";
	import { Separator } from "$lib/registry/ui/separator/index.js";
	import { languageOptions, setLanguageContext, type Language } from "./index.js";
	let { children, fullPage = false }: { children: Snippet; fullPage?: boolean } = $props();
	let language = $state<Language>("ar");
	const dir = $derived(language === "en" ? "ltr" : "rtl");
	setLanguageContext({
		get language() {
			return language;
		},
		setLanguage(value) {
			language = value;
		},
	});
</script>

<div
	class={fullPage
		? `absolute top-4 z-20 flex items-center gap-2 ${language === "en" ? "right-4" : "left-4"}`
		: "flex h-16 items-center border-b px-4"}
	dir="ltr"
>
	<Select.Root
		type="single"
		items={[...languageOptions]}
		value={language}
		onValueChange={(value) => (language = value as Language)}
	>
		<Select.Trigger
			size="sm"
			class="w-36"
			dir="ltr"
			data-name="language-selector"
			aria-label="Language"><Select.Value /></Select.Trigger
		>
		<Select.Content dir="ltr" class="data-open:animate-none data-closed:animate-none"
			><Select.Group>
				{#each languageOptions as option (option.value)}<Select.Item
						value={option.value}
						label={option.label}>{option.label}</Select.Item
					>{/each}
			</Select.Group></Select.Content
		>
	</Select.Root>
	<Popover.Root
		><Popover.Trigger>
			{#snippet child({ props })}<Button
					{...props}
					variant="ghost"
					size="icon-sm"
					class="ms-auto size-7"
					><InfoIcon /><span class="sr-only">Toggle translation information</span></Button
				>{/snippet}
		</Popover.Trigger><Popover.Content side="bottom" align="end" class="w-56 text-xs">
			<div>
				I used AI to translate the text for demonstration purposes. It's not perfect and may contain
				errors.
			</div>
			<Separator class="-mx-2.5 w-auto!" />
			<div data-lang="ar" dir="rtl">
				لقد استخدمت الذكاء الاصطناعي لترجمة النص للأغراض التجريبية فقط. قد لا تكون الترجمة دقيقة وقد
				تحتوي على أخطاء.
			</div>
			<Separator class="-mx-2.5 w-auto!" />
			<div data-lang="he" dir="rtl">
				השתמשתי בבינה מלאכותית כדי לתרגם את הטקסט למטרות הדגמה. זה לא מושלם ויכול להכיל שגיאות.
			</div>
		</Popover.Content></Popover.Root
	>
</div>
<DirectionProvider direction={dir}
	><div {dir} lang={language} data-lang={language}>{@render children()}</div></DirectionProvider
>
