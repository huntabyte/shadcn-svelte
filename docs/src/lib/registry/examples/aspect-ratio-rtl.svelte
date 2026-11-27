<script lang="ts">
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import { AspectRatio } from "$lib/registry/ui/aspect-ratio/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				caption: "Beautiful landscape",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				caption: "منظر طبيعي جميل",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				caption: "נוף יפה",
			},
		},
	};

	const t = useTranslation(translations, "ar");
</script>

<figure class="w-full max-w-sm" dir={t.dir}>
	<AspectRatio ratio={16 / 9} class="rounded-lg bg-muted">
		<img
			src="https://avatar.vercel.sh/shadcn1"
			alt="Landscape"
			class="size-full rounded-lg object-cover grayscale dark:brightness-20"
		/>
	</AspectRatio>
	<figcaption class="mt-2 text-center text-sm text-muted-foreground">
		{t.values.caption}
	</figcaption>
</figure>
