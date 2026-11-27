<script lang="ts">
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import {
		HoverCard,
		HoverCardContent,
		HoverCardTrigger,
	} from "$lib/registry/ui/hover-card/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				trigger: "Wireless Headphones",
				name: "Wireless Headphones",
				price: "$99.99",
				left: "Left",
				top: "Top",
				bottom: "Bottom",
				right: "Right",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				trigger: "سماعات لاسلكية",
				name: "سماعات لاسلكية",
				price: "٩٩.٩٩ $",
				left: "يسار",
				top: "أعلى",
				bottom: "أسفل",
				right: "يمين",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				trigger: "אוזניות אלחוטיות",
				name: "אוזניות אלחוטיות",
				price: "99.99 $",
				left: "שמאל",
				top: "למעלה",
				bottom: "למטה",
				right: "ימין",
			},
		},
	};

	const physicalSides: Array<"left" | "top" | "bottom" | "right"> = [
		"left",
		"top",
		"bottom",
		"right",
	];

	const t = useTranslation(translations, "ar");
</script>

<div class="flex flex-wrap justify-center gap-2">
	{#each physicalSides as side (side)}
		<HoverCard openDelay={10} closeDelay={100}>
			<HoverCardTrigger>
				{#snippet child({ props })}
					<Button {...props} variant="outline">{t.values[side]}</Button>
				{/snippet}
			</HoverCardTrigger>
			<HoverCardContent {side} class="flex w-64 flex-col gap-1" dir={t.dir}>
				<div class="font-semibold">{t.values.name}</div>
				<div class="text-sm text-muted-foreground">{t.values.price}</div>
			</HoverCardContent>
		</HoverCard>
	{/each}
</div>
