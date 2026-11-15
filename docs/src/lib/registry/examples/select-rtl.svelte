<script lang="ts">
	import * as Select from "$lib/registry/ui/select/index.js";
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {
				selectFruit: "Select a fruit",
				fruits: "Fruits",
				apple: "Apple",
				banana: "Banana",
				blueberry: "Blueberry",
				grapes: "Grapes",
				pineapple: "Pineapple",
				vegetables: "Vegetables",
				carrot: "Carrot",
				broccoli: "Broccoli",
				spinach: "Spinach",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				selectFruit: "اختر فاكهة",
				fruits: "الفواكه",
				apple: "تفاح",
				banana: "موز",
				blueberry: "توت أزرق",
				grapes: "عنب",
				pineapple: "أناناس",
				vegetables: "الخضروات",
				carrot: "جزر",
				broccoli: "بروكلي",
				spinach: "سبانخ",
			},
		},
		he: {
			dir: "rtl",
			values: {
				selectFruit: "בחר פרי",
				fruits: "פירות",
				apple: "תפוח",
				banana: "בננה",
				blueberry: "אוכמניה",
				grapes: "ענבים",
				pineapple: "אננס",
				vegetables: "ירקות",
				carrot: "גזר",
				broccoli: "ברוקולי",
				spinach: "תרד",
			},
		},
	} satisfies Translations;
	const t = useTranslation(translations, "ar");
	let value = $state("");
	const fruits = $derived(
		(["apple", "banana", "blueberry", "grapes", "pineapple"] as const).map((value) => ({
			value,
			label: t.values[value],
		}))
	);
	const vegetables = $derived(
		(["carrot", "broccoli", "spinach"] as const).map((value) => ({
			value,
			label: t.values[value],
		}))
	);
</script>

<Select.Root type="single" bind:value items={[...fruits, ...vegetables]}>
	<Select.Trigger class="w-32" dir={t.dir}
		><Select.Value placeholder={t.values.selectFruit} /></Select.Trigger
	>
	<Select.Content dir={t.dir} data-lang={t.dir === "rtl" ? t.language : undefined}>
		<Select.Group
			><Select.Label>{t.values.fruits}</Select.Label>{#each fruits as item (item.value)}<Select.Item
					value={item.value}
					label={item.label}>{item.label}</Select.Item
				>{/each}</Select.Group
		>
		<Select.Separator />
		<Select.Group
			><Select.Label>{t.values.vegetables}</Select.Label
			>{#each vegetables as item (item.value)}<Select.Item value={item.value} label={item.label}
					>{item.label}</Select.Item
				>{/each}</Select.Group
		>
	</Select.Content></Select.Root
>
