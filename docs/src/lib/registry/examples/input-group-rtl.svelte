<script lang="ts">
	import Search from "@lucide/svelte/icons/search";
	import * as Field from "$lib/registry/ui/field/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import {
		InputGroup,
		InputGroupAddon,
		InputGroupButton,
		InputGroupInput,
		InputGroupText,
		InputGroupTextarea,
	} from "$lib/registry/ui/input-group/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				placeholder: "Search...",
				results: "12 results",
				searching: "Searching...",
				saving: "Saving...",
				savingChanges: "Saving changes...",
				textareaLabel: "Textarea",
				textareaPlaceholder: "Write a comment...",
				characterCount: "0/280",
				post: "Post",
				textareaDescription: "Footer positioned below the textarea.",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				placeholder: "بحث...",
				results: "١٢ نتيجة",
				searching: "جاري البحث...",
				saving: "جاري الحفظ...",
				savingChanges: "جاري حفظ التغييرات...",
				textareaLabel: "منطقة النص",
				textareaPlaceholder: "اكتب تعليقًا...",
				characterCount: "٠/٢٨٠",
				post: "نشر",
				textareaDescription: "تذييل موضع أسفل منطقة النص.",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				placeholder: "חפש...",
				results: "12 תוצאות",
				searching: "מחפש...",
				saving: "שומר...",
				savingChanges: "שומר שינויים...",
				textareaLabel: "אזור טקסט",
				textareaPlaceholder: "כתוב תגובה...",
				characterCount: "0/280",
				post: "פרסם",
				textareaDescription: "כותרת תחתונה ממוקמת מתחת לאזור הטקסט.",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<div class="grid w-full max-w-sm gap-6">
	<InputGroup class="max-w-xs" dir={t.dir}>
		<InputGroupInput placeholder={t.values.placeholder} />
		<InputGroupAddon>
			<Search />
		</InputGroupAddon>
		<InputGroupAddon align="inline-end">{t.values.results}</InputGroupAddon>
	</InputGroup>
	<InputGroup dir={t.dir}>
		<InputGroupInput placeholder={t.values.searching} />
		<InputGroupAddon align="inline-end">
			<Spinner />
		</InputGroupAddon>
	</InputGroup>
	<InputGroup dir={t.dir}>
		<InputGroupInput placeholder={t.values.savingChanges} />
		<InputGroupAddon align="inline-end">
			<InputGroupText>{t.values.saving}</InputGroupText>
			<Spinner />
		</InputGroupAddon>
	</InputGroup>
	<Field.Group class="max-w-sm" dir={t.dir}>
		<Field.Field>
			<Field.Label for="rtl-textarea">{t.values.textareaLabel}</Field.Label>
			<InputGroup dir={t.dir}>
				<InputGroupTextarea id="rtl-textarea" placeholder={t.values.textareaPlaceholder} />
				<InputGroupAddon align="block-end">
					<InputGroupText>{t.values.characterCount}</InputGroupText>
					<InputGroupButton variant="default" size="sm" class="ml-auto">
						{t.values.post}
					</InputGroupButton>
				</InputGroupAddon>
			</InputGroup>
			<Field.Description>{t.values.textareaDescription}</Field.Description>
		</Field.Field>
	</Field.Group>
</div>
