<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		Dialog,
		DialogClose,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
	} from "$lib/registry/ui/dialog/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				openDialog: "Open Dialog",
				editProfile: "Edit profile",
				description: "Make changes to your profile here. Click save when you're done.",
				name: "Name",
				username: "Username",
				cancel: "Cancel",
				saveChanges: "Save changes",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				openDialog: "فتح الحوار",
				editProfile: "تعديل الملف الشخصي",
				description: "قم بإجراء تغييرات على ملفك الشخصي هنا. انقر فوق حفظ عند الانتهاء.",
				name: "الاسم",
				username: "اسم المستخدم",
				cancel: "إلغاء",
				saveChanges: "حفظ التغييرات",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				openDialog: "פתח דיאלוג",
				editProfile: "ערוך פרופיל",
				description: "בצע שינויים בפרופיל שלך כאן. לחץ על שמור כשתסיים.",
				name: "שם",
				username: "שם משתמש",
				cancel: "בטל",
				saveChanges: "שמור שינויים",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<Dialog>
	<form>
		<DialogTrigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline">{t.values.openDialog}</Button>
			{/snippet}
		</DialogTrigger>
		<DialogContent
			class="sm:max-w-sm"
			dir={t.dir}
			data-lang={t.dir === "rtl" ? t.language : undefined}
		>
			<DialogHeader>
				<DialogTitle>{t.values.editProfile}</DialogTitle>
				<DialogDescription>{t.values.description}</DialogDescription>
			</DialogHeader>
			<Field.Group>
				<Field.Field>
					<Label for="name-1">{t.values.name}</Label>
					<Input id="name-1" name="name" value="Pedro Duarte" />
				</Field.Field>
				<Field.Field>
					<Label for="username-1">{t.values.username}</Label>
					<Input id="username-1" name="username" value="@peduarte" />
				</Field.Field>
			</Field.Group>
			<DialogFooter>
				<DialogClose>
					{#snippet child({ props })}
						<Button {...props} variant="outline">{t.values.cancel}</Button>
					{/snippet}
				</DialogClose>
				<Button type="submit">{t.values.saveChanges}</Button>
			</DialogFooter>
		</DialogContent>
	</form>
</Dialog>
