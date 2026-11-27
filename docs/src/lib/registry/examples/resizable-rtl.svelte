<script lang="ts">
	import * as Resizable from "$lib/registry/ui/resizable/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				one: "One",
				two: "Two",
				three: "Three",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				one: "واحد",
				two: "اثنان",
				three: "ثلاثة",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				one: "אחד",
				two: "שניים",
				three: "שלושה",
			},
		},
	};
	const t = useTranslation(translations, "ar");
</script>

<Resizable.PaneGroup direction="horizontal" dir={t.dir} class="max-w-sm rounded-lg border">
	<Resizable.Pane defaultSize={50}>
		<div class="flex h-[200px] items-center justify-center p-6">
			<span class="font-semibold">{t.values.one}</span>
		</div>
	</Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane defaultSize={50}>
		<Resizable.PaneGroup direction="vertical" dir={t.dir}>
			<Resizable.Pane defaultSize={25}>
				<div class="flex h-full items-center justify-center p-6">
					<span class="font-semibold">{t.values.two}</span>
				</div>
			</Resizable.Pane>
			<Resizable.Handle withHandle />
			<Resizable.Pane defaultSize={75}>
				<div class="flex h-full items-center justify-center p-6">
					<span class="font-semibold">{t.values.three}</span>
				</div>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
</Resizable.PaneGroup>
