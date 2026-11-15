<script lang="ts">
	import BluetoothIcon from "@lucide/svelte/icons/bluetooth";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import {
		AlertDialog,
		AlertDialogAction,
		AlertDialogCancel,
		AlertDialogContent,
		AlertDialogDescription,
		AlertDialogFooter,
		AlertDialogHeader,
		AlertDialogMedia,
		AlertDialogTitle,
		AlertDialogTrigger,
	} from "$lib/registry/ui/alert-dialog/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				showDialog: "Show Dialog",
				showDialogSm: "Show Dialog (sm)",
				title: "Are you absolutely sure?",
				description:
					"This action cannot be undone. This will permanently delete your account from our servers.",
				cancel: "Cancel",
				continue: "Continue",
				smallTitle: "Allow accessory to connect?",
				smallDescription: "Do you want to allow the USB accessory to connect to this device?",
				dontAllow: "Don't allow",
				allow: "Allow",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				showDialog: "إظهار الحوار",
				showDialogSm: "إظهار الحوار (صغير)",
				title: "هل أنت متأكد تمامًا؟",
				description: "لا يمكن التراجع عن هذا الإجراء. سيؤدي هذا إلى حذف حسابك نهائيًا من خوادمنا.",
				cancel: "إلغاء",
				continue: "متابعة",
				smallTitle: "السماح للملحق بالاتصال؟",
				smallDescription: "هل تريد السماح لملحق USB بالاتصال بهذا الجهاز؟",
				dontAllow: "عدم السماح",
				allow: "السماح",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				showDialog: "הצג דיאלוג",
				showDialogSm: "הצג דיאלוג (קטן)",
				title: "האם אתה בטוח לחלוטין?",
				description: "פעולה זו לא ניתנת לביטול. זה ימחק לצמיתות את החשבון שלך מהשרתים שלנו.",
				cancel: "ביטול",
				continue: "המשך",
				smallTitle: "לאפשר להתקן להתחבר?",
				smallDescription: "האם אתה רוצה לאפשר להתקן USB להתחבר למכשיר זה?",
				dontAllow: "אל תאפשר",
				allow: "אפשר",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<div class="flex gap-4" dir={t.dir}>
	<AlertDialog>
		<AlertDialogTrigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline">{t.values.showDialog}</Button>
			{/snippet}
		</AlertDialogTrigger>
		<AlertDialogContent dir={t.dir} data-lang={t.dir === "rtl" ? t.language : undefined}>
			<AlertDialogHeader>
				<AlertDialogTitle>{t.values.title}</AlertDialogTitle>
				<AlertDialogDescription>{t.values.description}</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>{t.values.cancel}</AlertDialogCancel>
				<AlertDialogAction>{t.values.continue}</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
	<AlertDialog>
		<AlertDialogTrigger>
			{#snippet child({ props })}
				<Button {...props} variant="outline">{t.values.showDialogSm}</Button>
			{/snippet}
		</AlertDialogTrigger>
		<AlertDialogContent size="sm" dir={t.dir} data-lang={t.dir === "rtl" ? t.language : undefined}>
			<AlertDialogHeader>
				<AlertDialogMedia>
					<BluetoothIcon />
				</AlertDialogMedia>
				<AlertDialogTitle>{t.values.smallTitle}</AlertDialogTitle>
				<AlertDialogDescription>
					{t.values.smallDescription}
				</AlertDialogDescription>
			</AlertDialogHeader>
			<AlertDialogFooter>
				<AlertDialogCancel>{t.values.dontAllow}</AlertDialogCancel>
				<AlertDialogAction>{t.values.allow}</AlertDialogAction>
			</AlertDialogFooter>
		</AlertDialogContent>
	</AlertDialog>
</div>
