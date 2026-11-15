<script lang="ts">
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { useTranslation, type Translations } from "$lib/components/language-selector/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	const translations = {
		en: {
			dir: "ltr",
			values: {
				content: "Add to library",
				left: "Left",
				top: "Top",
				bottom: "Bottom",
				right: "Right",
			},
		},
		ar: {
			dir: "rtl",
			values: {
				content: "إضافة إلى المكتبة",
				left: "يسار",
				top: "أعلى",
				bottom: "أسفل",
				right: "يمين",
			},
		},
		he: {
			dir: "rtl",
			values: {
				content: "הוסף לספרייה",
				left: "שמאל",
				top: "למעלה",
				bottom: "למטה",
				right: "ימין",
			},
		},
	} satisfies Translations;
	const t = useTranslation(translations, "ar");
	const sides = ["left", "top", "bottom", "right"] as const;
</script>

<Tooltip.Provider
	><div class="flex flex-wrap gap-2">
		{#each sides as side (side)}<Tooltip.Root
				><Tooltip.Trigger
					class={buttonVariants({
						variant: "outline",
						class: "w-fit capitalize",
					})}>{t.values[side]}</Tooltip.Trigger
				><Tooltip.Content {side}>{t.values.content}</Tooltip.Content></Tooltip.Root
			>{/each}
	</div></Tooltip.Provider
>
