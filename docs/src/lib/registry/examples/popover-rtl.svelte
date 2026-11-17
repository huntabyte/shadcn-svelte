<script lang="ts">
	import * as Popover from "$lib/registry/ui/popover/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { buttonVariants } from "$lib/registry/ui/button/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				title: "Dimensions",
				description: "Set the dimensions for the layer.",
				left: "Left",
				top: "Top",
				bottom: "Bottom",
				right: "Right",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				title: "الأبعاد",
				description: "تعيين الأبعاد للطبقة.",
				left: "يسار",
				top: "أعلى",
				bottom: "أسفل",
				right: "يمين",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				title: "מימדים",
				description: "הגדר את המימדים לשכבה.",
				left: "שמאל",
				top: "למעלה",
				bottom: "למטה",
				right: "ימין",
			},
		},
	};
	const t = useTranslation(translations, "ar");
	const physicalSides = ["left", "top", "bottom", "right"] as const;
</script>

<div class="flex flex-wrap justify-center gap-2">
	{#each physicalSides as side (side)}
		<Popover.Root
			><Popover.Trigger class={buttonVariants({ variant: "outline" })}
				>{t.values[side]}</Popover.Trigger
			>
			<Popover.Content {side} dir={t.dir}
				><Popover.Header
					><Popover.Title>{t.values.title}</Popover.Title><Popover.Description
						>{t.values.description}</Popover.Description
					></Popover.Header
				></Popover.Content
			>
		</Popover.Root>
	{/each}
</div>
