<script lang="ts">
	import * as Field from "$lib/registry/ui/field/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Checkbox } from "$lib/registry/ui/checkbox/index.js";
	import { Input } from "$lib/registry/ui/input/index.js";
	import {
		Select,
		SelectContent,
		SelectGroup,
		SelectItem,
		SelectTrigger,
	} from "$lib/registry/ui/select/index.js";
	import { Textarea } from "$lib/registry/ui/textarea/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				paymentMethod: "Payment Method",
				secureTransactions: "All transactions are secure and encrypted",
				nameOnCard: "Name on Card",
				cardNumber: "Card Number",
				cardNumberDescription: "Enter your 16-digit card number",
				month: "Month",
				year: "Year",
				cvv: "CVV",
				monthPlaceholder: "MM",
				month01: "01",
				month02: "02",
				month03: "03",
				month04: "04",
				month05: "05",
				month06: "06",
				month07: "07",
				month08: "08",
				month09: "09",
				month10: "10",
				month11: "11",
				month12: "12",
				billingAddress: "Billing Address",
				billingAddressDescription: "The billing address associated with your payment method",
				sameAsShipping: "Same as shipping address",
				comments: "Comments",
				commentsPlaceholder: "Add any additional comments",
				submit: "Submit",
				cancel: "Cancel",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				paymentMethod: "طريقة الدفع",
				secureTransactions: "جميع المعاملات آمنة ومشفرة",
				nameOnCard: "الاسم على البطاقة",
				cardNumber: "رقم البطاقة",
				cardNumberDescription: "أدخل رقم البطاقة المكون من 16 رقمًا",
				month: "الشهر",
				year: "السنة",
				cvv: "CVV",
				monthPlaceholder: "ش.ش",
				month01: "٠١",
				month02: "٠٢",
				month03: "٠٣",
				month04: "٠٤",
				month05: "٠٥",
				month06: "٠٦",
				month07: "٠٧",
				month08: "٠٨",
				month09: "٠٩",
				month10: "١٠",
				month11: "١١",
				month12: "١٢",
				billingAddress: "عنوان الفوترة",
				billingAddressDescription: "عنوان الفوترة المرتبط بطريقة الدفع الخاصة بك",
				sameAsShipping: "نفس عنوان الشحن",
				comments: "تعليقات",
				commentsPlaceholder: "أضف أي تعليقات إضافية",
				submit: "إرسال",
				cancel: "إلغاء",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				paymentMethod: "אמצעי תשלום",
				secureTransactions: "כל העסקאות מאובטחות ומוצפנות",
				nameOnCard: "שם על הכרטיס",
				cardNumber: "מספר כרטיס",
				cardNumberDescription: "הזן את מספר הכרטיס בן 16 הספרות שלך",
				month: "חודש",
				year: "שנה",
				cvv: "CVV",
				monthPlaceholder: "MM",
				month01: "01",
				month02: "02",
				month03: "03",
				month04: "04",
				month05: "05",
				month06: "06",
				month07: "07",
				month08: "08",
				month09: "09",
				month10: "10",
				month11: "11",
				month12: "12",
				billingAddress: "כתובת חיוב",
				billingAddressDescription: "כתובת החיוב המשויכת לאמצעי התשלום שלך",
				sameAsShipping: "זהה לכתובת המשלוח",
				comments: "הערות",
				commentsPlaceholder: "הוסף הערות נוספות",
				submit: "שלח",
				cancel: "בטל",
			},
		},
	};

	const t = useTranslation(translations, "ar");

	const months = [
		{ label: "MM", value: null },
		{ label: "01", value: "01" },
		{ label: "02", value: "02" },
		{ label: "03", value: "03" },
		{ label: "04", value: "04" },
		{ label: "05", value: "05" },
		{ label: "06", value: "06" },
		{ label: "07", value: "07" },
		{ label: "08", value: "08" },
		{ label: "09", value: "09" },
		{ label: "10", value: "10" },
		{ label: "11", value: "11" },
		{ label: "12", value: "12" },
	];

	const years = [
		{ label: "YYYY", value: null },
		{ label: "2024", value: "2024" },
		{ label: "2025", value: "2025" },
		{ label: "2026", value: "2026" },
		{ label: "2027", value: "2027" },
		{ label: "2028", value: "2028" },
		{ label: "2029", value: "2029" },
	];

	let month = $state("");
	let year = $state("");
	function getMonthLabel(value: string | null): string {
		if (!value || value === "MM") return t.values.monthPlaceholder;
		const key = `month${value}` as keyof typeof t.values;
		return t.values[key] || value;
	}
</script>

<div class="w-full max-w-md py-6" dir={t.dir}>
	<form>
		<Field.Group>
			<Field.Set>
				<Field.Legend>{t.values.paymentMethod}</Field.Legend>
				<Field.Description>{t.values.secureTransactions}</Field.Description>
				<Field.Group>
					<Field.Field>
						<Field.Label for="checkout-7j9-card-name-43j-rtl">
							{t.values.nameOnCard}
						</Field.Label>
						<Input id="checkout-7j9-card-name-43j-rtl" placeholder="Evil Rabbit" required />
					</Field.Field>
					<Field.Field>
						<Field.Label for="checkout-7j9-card-number-uw1-rtl">
							{t.values.cardNumber}
						</Field.Label>
						<Input
							id="checkout-7j9-card-number-uw1-rtl"
							placeholder="1234 5678 9012 3456"
							required
						/>
						<Field.Description>{t.values.cardNumberDescription}</Field.Description>
					</Field.Field>
					<div class="grid grid-cols-3 gap-4">
						<Field.Field>
							<Field.Label for="checkout-exp-month-ts6-rtl">
								{t.values.month}
							</Field.Label>
							<Select type="single" bind:value={month}>
								<SelectTrigger id="checkout-exp-month-ts6-rtl">
									{getMonthLabel(month)}
								</SelectTrigger>
								<SelectContent dir={t.dir}>
									<SelectGroup>
										{#each months as item (item.value)}
											<SelectItem value={item.value ?? item.label}>
												{getMonthLabel(item.value)}
											</SelectItem>
										{/each}
									</SelectGroup>
								</SelectContent>
							</Select>
						</Field.Field>
						<Field.Field>
							<Field.Label for="checkout-7j9-exp-year-f59-rtl">
								{t.values.year}
							</Field.Label>
							<Select type="single" bind:value={year}>
								<SelectTrigger id="checkout-7j9-exp-year-f59-rtl">
									{year || "YYYY"}
								</SelectTrigger>
								<SelectContent dir={t.dir}>
									<SelectGroup>
										{#each years as item (item.value)}
											<SelectItem value={item.value ?? item.label}>
												{item.label}
											</SelectItem>
										{/each}
									</SelectGroup>
								</SelectContent>
							</Select>
						</Field.Field>
						<Field.Field>
							<Field.Label for="checkout-7j9-cvv-rtl">
								{t.values.cvv}
							</Field.Label>
							<Input id="checkout-7j9-cvv-rtl" placeholder="123" required />
						</Field.Field>
					</div>
				</Field.Group>
			</Field.Set>
			<Field.Separator />
			<Field.Set>
				<Field.Legend>{t.values.billingAddress}</Field.Legend>
				<Field.Description>{t.values.billingAddressDescription}</Field.Description>
				<Field.Group>
					<Field.Field orientation="horizontal">
						<Checkbox id="checkout-7j9-same-as-shipping-wgm-rtl" checked />
						<Field.Label for="checkout-7j9-same-as-shipping-wgm-rtl" class="font-normal">
							{t.values.sameAsShipping}
						</Field.Label>
					</Field.Field>
				</Field.Group>
			</Field.Set>
			<Field.Set>
				<Field.Group>
					<Field.Field>
						<Field.Label for="checkout-7j9-optional-comments-rtl">
							{t.values.comments}
						</Field.Label>
						<Textarea
							id="checkout-7j9-optional-comments-rtl"
							placeholder={t.values.commentsPlaceholder}
							class="resize-none"
						/>
					</Field.Field>
				</Field.Group>
			</Field.Set>
			<Field.Field orientation="horizontal">
				<Button type="submit">{t.values.submit}</Button>
				<Button variant="outline" type="button">
					{t.values.cancel}
				</Button>
			</Field.Field>
		</Field.Group>
	</form>
</div>
