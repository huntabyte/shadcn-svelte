<script lang="ts">
	import * as Kbd from "$lib/registry/ui/kbd/index.js";
	import { useTranslation } from "$lib/components/language-selector/index.js";
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
	const t = useTranslation(translations, "ar");
</script>

<div class="flex flex-col items-center gap-4" dir={t.dir}>
	<Kbd.Group
		><Kbd.Root>⌘</Kbd.Root><Kbd.Root>⇧</Kbd.Root><Kbd.Root>⌥</Kbd.Root><Kbd.Root>⌃</Kbd.Root
		></Kbd.Group
	>
	<Kbd.Group><Kbd.Root>Ctrl</Kbd.Root><span>+</span><Kbd.Root>B</Kbd.Root></Kbd.Group>
</div>
