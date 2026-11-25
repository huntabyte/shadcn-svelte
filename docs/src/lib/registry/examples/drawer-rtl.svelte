<script lang="ts">
	import Minus from "@lucide/svelte/icons/minus";
	import Plus from "@lucide/svelte/icons/plus";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		Drawer,
		DrawerClose,
		DrawerContent,
		DrawerDescription,
		DrawerFooter,
		DrawerHeader,
		DrawerTitle,
		DrawerTrigger,
	} from "$lib/registry/ui/drawer/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			locale: "en-US",
			values: {
				trigger: "Open Drawer",
				title: "Move Goal",
				description: "Set your daily activity goal.",
				caloriesPerDay: "Calories/day",
				decrease: "Decrease",
				increase: "Increase",
				submit: "Submit",
				cancel: "Cancel",
			},
		},
		ar: {
			dir: "rtl" as const,
			locale: "ar-EG",
			values: {
				trigger: "فتح الدرج",
				title: "نقل الهدف",
				description: "حدد هدف نشاطك اليومي.",
				caloriesPerDay: "سعرات حرارية/يوم",
				decrease: "تقليل",
				increase: "زيادة",
				submit: "إرسال",
				cancel: "إلغاء",
			},
		},
		he: {
			dir: "rtl" as const,
			locale: "he-IL",
			values: {
				trigger: "פתח מגירה",
				title: "הזז מטרה",
				description: "הגדר את יעד הפעילות היומי שלך.",
				caloriesPerDay: "קלוריות/יום",
				decrease: "הקטן",
				increase: "הגדל",
				submit: "שלח",
				cancel: "בטל",
			},
		},
	};

	const t = useTranslation(translations, "ar");

	import { scaleBand } from "d3-scale";
	import { BarChart } from "layerchart";
	let goal = $state(350);
	function onClick(adjustment: number) {
		goal = Math.max(200, Math.min(400, goal + adjustment));
	}
	const data = [400, 300, 200, 300, 200, 278, 189, 239, 300, 200, 278, 189, 349].map(
		(goal, index) => ({ goal, index })
	);
</script>

<Drawer>
	<DrawerTrigger>
		{#snippet child({ props })}
			<Button {...props} variant="outline">{t.values.trigger}</Button>
		{/snippet}
	</DrawerTrigger>
	<DrawerContent dir={t.dir} data-lang={t.dir === "rtl" ? t.language : undefined}>
		<div class="mx-auto w-full max-w-sm">
			<DrawerHeader>
				<DrawerTitle>{t.values.title}</DrawerTitle>
				<DrawerDescription>{t.values.description}</DrawerDescription>
			</DrawerHeader>
			<div class="p-4 pb-0">
				<div class="flex items-center justify-center gap-2">
					<Button
						variant="outline"
						size="icon"
						class="size-8 shrink-0 rounded-full"
						onclick={() => onClick(-10)}
						disabled={goal <= 200}
					>
						<Minus />
						<span class="sr-only">{t.values.decrease}</span>
					</Button>
					<div class="flex-1 text-center">
						<div class="text-7xl font-bold tracking-tighter">
							{goal.toLocaleString(translations[t.language].locale)}
						</div>
						<div class="text-[0.70rem] text-muted-foreground uppercase">
							{t.values.caloriesPerDay}
						</div>
					</div>
					<Button
						variant="outline"
						size="icon"
						class="size-8 shrink-0 rounded-full"
						onclick={() => onClick(10)}
						disabled={goal >= 400}
					>
						<Plus />
						<span class="sr-only">{t.values.increase}</span>
					</Button>
				</div>
				<div class="mt-3 h-[120px]">
					<BarChart
						data={t.dir === "rtl" ? [...data].reverse() : data}
						x="index"
						xScale={scaleBand().padding(0.1)}
						series={[{ key: "goal", color: "var(--chart-2)" }]}
						axis="x"
						tooltipContext={false}
						props={{
							xAxis: {
								format: (value) =>
									(data[Number(value)]?.goal ?? 0).toLocaleString(translations[t.language].locale),
							},
						}}
					/>
				</div>
			</div>
			<DrawerFooter>
				<Button>{t.values.submit}</Button>
				<DrawerClose>
					{#snippet child({ props })}
						<Button {...props} variant="outline">{t.values.cancel}</Button>
					{/snippet}
				</DrawerClose>
			</DrawerFooter>
		</div>
	</DrawerContent>
</Drawer>
