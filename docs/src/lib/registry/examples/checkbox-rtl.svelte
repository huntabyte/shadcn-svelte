<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Label } from "$lib/registry/ui/label/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				acceptTerms: "Accept terms and conditions",
				acceptTermsDescription: "By clicking this checkbox, you agree to the terms.",
				enableNotifications: "Enable notifications",
				enableNotificationsDescription: "You can enable or disable notifications at any time.",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				acceptTerms: "قبول الشروط والأحكام",
				acceptTermsDescription: "بالنقر على هذا المربع، فإنك توافق على الشروط.",
				enableNotifications: "تفعيل الإشعارات",
				enableNotificationsDescription: "يمكنك تفعيل أو إلغاء تفعيل الإشعارات في أي وقت.",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				acceptTerms: "קבל תנאים והגבלות",
				acceptTermsDescription: "על ידי לחיצה על תיבת הסימון הזו, אתה מסכים לתנאים.",
				enableNotifications: "הפעל התראות",
				enableNotificationsDescription: "אתה יכול להפעיל או להשבית התראות בכל עת.",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<Field.Group class="max-w-sm" dir={t.dir}>
	<Field.Field orientation="horizontal">
		<Checkbox id="terms-checkbox-rtl" name="terms-checkbox" />
		<Label for="terms-checkbox-rtl">{t.values.acceptTerms}</Label>
	</Field.Field>
	<Field.Field orientation="horizontal">
		<Checkbox id="terms-checkbox-2-rtl" name="terms-checkbox-2" checked />
		<Field.Content>
			<Field.Label for="terms-checkbox-2-rtl">
				{t.values.acceptTerms}
			</Field.Label>
			<Field.Description>{t.values.acceptTermsDescription}</Field.Description>
		</Field.Content>
	</Field.Field>
	<Field.Field orientation="horizontal" data-disabled>
		<Checkbox id="toggle-checkbox-rtl" name="toggle-checkbox" disabled />
		<Field.Label for="toggle-checkbox-rtl">
			{t.values.enableNotifications}
		</Field.Label>
	</Field.Field>
	<Field.Label>
		<Field.Field orientation="horizontal">
			<Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
			<Field.Content>
				<Field.Title>{t.values.enableNotifications}</Field.Title>
				<Field.Description>
					{t.values.enableNotificationsDescription}
				</Field.Description>
			</Field.Content>
		</Field.Field>
	</Field.Label>
</Field.Group>
