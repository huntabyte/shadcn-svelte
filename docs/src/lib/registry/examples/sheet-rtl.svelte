<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import * as Sheet from "$lib/registry/ui/sheet/index.js";
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";
	import { Button, buttonVariants } from "$lib/registry/ui/button/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	const translations = {
		en: {
			dir: "ltr",
			values: {
				open: "Open",
				editProfile: "Edit profile",
				description: "Make changes to your profile here. Click save when you're done.",
				name: "Name",
				username: "Username",
				save: "Save changes",
				close: "Close",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				open: "فتح",
				editProfile: "تعديل الملف الشخصي",
				description: "قم بإجراء تغييرات على ملفك الشخصي هنا. انقر حفظ عند الانتهاء.",
				name: "الاسم",
				username: "اسم المستخدم",
				save: "حفظ التغييرات",
				close: "إغلاق",
			},
		},
		he: {
			dir: "rtl",
			values: {
				open: "פתח",
				editProfile: "עריכת פרופיל",
				description: "בצע שינויים בפרופיל שלך כאן. לחץ שמור כשתסיים.",
				name: "שם",
				username: "שם משתמש",
				save: "שמור שינויים",
				close: "סגור",
			},
		},
	} satisfies Translations;
	const t = useTranslation(translations, "ar");
</script>

<Sheet.Root>
	<Sheet.Trigger class={buttonVariants({ variant: "outline" })}>{t.values.open}</Sheet.Trigger>
	<Sheet.Content
		dir={t.dir}
		side={t.dir === "rtl" ? "left" : "right"}
		data-lang={t.dir === "rtl" ? t.language : undefined}
	>
		<Sheet.Header
			><Sheet.Title>{t.values.editProfile}</Sheet.Title><Sheet.Description
				>{t.values.description}</Sheet.Description
			></Sheet.Header
		>
		<Field.Group class="px-4"
			><Field.Field
				><Field.Label for="sheet-rtl-name">{t.values.name}</Field.Label><Input
					id="sheet-rtl-name"
					value="Pedro Duarte"
				/></Field.Field
			><Field.Field
				><Field.Label for="sheet-rtl-username">{t.values.username}</Field.Label><Input
					id="sheet-rtl-username"
					value="peduarte"
				/></Field.Field
			></Field.Group
		>
		<Sheet.Footer
			><Button type="submit">{t.values.save}</Button><Sheet.Close
				class={buttonVariants({ variant: "outline" })}>{t.values.close}</Sheet.Close
			></Sheet.Footer
		>
	</Sheet.Content></Sheet.Root
>
