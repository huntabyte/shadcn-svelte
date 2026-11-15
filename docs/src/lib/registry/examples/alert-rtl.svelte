<script lang="ts">
	import CheckCircle2Icon from "@lucide/svelte/icons/circle-check";
	import InfoIcon from "@lucide/svelte/icons/info";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Alert, AlertDescription, AlertTitle } from "$lib/registry/ui/alert/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				paymentTitle: "Payment successful",
				paymentDescription:
					"Your payment of $29.99 has been processed. A receipt has been sent to your email address.",
				featureTitle: "New feature available",
				featureDescription:
					"We've added dark mode support. You can enable it in your account settings.",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				paymentTitle: "تم الدفع بنجاح",
				paymentDescription:
					"تمت معالجة دفعتك البالغة 29.99 دولارًا. تم إرسال إيصال إلى عنوان بريدك الإلكتروني.",
				featureTitle: "ميزة جديدة متاحة",
				featureDescription: "لقد أضفنا دعم الوضع الداكن. يمكنك تفعيله في إعدادات حسابك.",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				paymentTitle: "התשלום בוצע בהצלחה",
				paymentDescription: "התשלום שלך בסך 29.99 דולר עובד. קבלה נשלחה לכתובת האימייל שלך.",
				featureTitle: "תכונה חדשה זמינה",
				featureDescription: "הוספנו תמיכה במצב כהה. אתה יכול להפעיל אותו בהגדרות החשבון שלך.",
			},
		},
	};

	const alerts = [
		{
			icon: CheckCircle2Icon,
			titleKey: "paymentTitle" as const,
			descriptionKey: "paymentDescription" as const,
		},
		{
			icon: InfoIcon,
			titleKey: "featureTitle" as const,
			descriptionKey: "featureDescription" as const,
		},
	] as const;

	const t = useTranslation(translations, "ar");
</script>

<div class="grid w-full max-w-md items-start gap-4" dir={t.dir}>
	{#each alerts as alert (alert.titleKey)}
		<Alert>
			<alert.icon />
			<AlertTitle>{t.values[alert.titleKey]}</AlertTitle>
			<AlertDescription>{t.values[alert.descriptionKey]}</AlertDescription>
		</Alert>
	{/each}
</div>
