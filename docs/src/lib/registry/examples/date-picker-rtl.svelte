<script lang="ts">
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import { DateFormatter, type DateValue, getLocalTimeZone } from "@internationalized/date";
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Calendar } from "$lib/registry/ui/calendar/index.js";

	const translations = {
		en: {
			dir: "ltr",
			values: {
				placeholder: "Pick a date",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				placeholder: "اختر تاريخًا",
			},
		},
		he: {
			dir: "rtl",
			values: {
				placeholder: "בחר תאריך",
			},
		},
	} as const;
	const t = useTranslation(translations, "ar");
	let value = $state<DateValue | undefined>();
	const locale = $derived(t.language === "ar" ? "ar-SA" : t.language === "he" ? "he-IL" : "en-US");
	const formatter = $derived(new DateFormatter(locale, { dateStyle: "long" }));
</script>

<Popover.Root>
	<Popover.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				variant="outline"
				data-empty={!value}
				dir={t.dir}
				class="w-[212px] justify-between text-start font-normal data-[empty=true]:text-muted-foreground"
			>
				{value ? formatter.format(value.toDate(getLocalTimeZone())) : t.values.placeholder}
				<ChevronDownIcon />
			</Button>
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0" align="start" dir={t.dir}>
		<Calendar type="single" bind:value dir={t.dir} {locale} />
	</Popover.Content>
</Popover.Root>
