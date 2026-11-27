<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { InputOTP, InputOTPGroup, InputOTPSlot } from "$lib/registry/ui/input-otp/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				verificationCode: "Verification code",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				verificationCode: "رمز التحقق",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				verificationCode: "קוד אימות",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<Field.Field class="mx-auto max-w-xs">
	<Field.Label for="input-otp-rtl">{t.values.verificationCode}</Field.Label>
	<InputOTP maxlength={6} value="123456" dir={t.dir} id="input-otp-rtl">
		{#snippet children({ cells })}
			<InputOTPGroup
				>{#each cells as cell (cell)}<InputOTPSlot {cell} />{/each}</InputOTPGroup
			>
		{/snippet}
	</InputOTP>
</Field.Field>
