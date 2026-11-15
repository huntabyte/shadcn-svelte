<script lang="ts">
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Card, CardContent } from "$lib/registry/ui/card/index.js";
	import {
		Carousel,
		CarouselContent,
		CarouselItem,
		CarouselNext,
		CarouselPrevious,
	} from "$lib/registry/ui/carousel/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {},
		},
		ar: {
			dir: "rtl" as const,
			values: {},
		},
		he: {
			dir: "rtl" as const,
			values: {},
		},
	};

	function toArabicNumerals(num: number): string {
		const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
		return num
			.toString()
			.split("")
			.map((digit) => arabicNumerals[parseInt(digit, 10)])
			.join("");
	}

	const t = useTranslation(translations, "ar");
</script>

<Carousel
	dir={t.dir}
	class="w-full max-w-[12rem] sm:max-w-xs"
	opts={{
		direction: t.dir,
	}}
>
	<CarouselContent>
		{#each Array.from({ length: 5 }) as _, index (index)}
			<CarouselItem>
				<div class="p-1">
					<Card dir={t.dir}>
						<CardContent class="flex aspect-square items-center justify-center p-6">
							<span class="text-4xl font-semibold">
								{t.language === "ar" ? toArabicNumerals(index + 1) : String(index + 1)}
							</span>
						</CardContent>
					</Card>
				</div>
			</CarouselItem>
		{/each}
	</CarouselContent>
	<CarouselPrevious />
	<CarouselNext />
</Carousel>
