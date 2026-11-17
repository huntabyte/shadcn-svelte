<script lang="ts">
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import { useTranslation } from "$lib/components/language-selector/index.js";
	import {
		CodeBlock,
		CodeBlockActions,
		CodeBlockContent,
		CodeBlockCopyButton,
		CodeBlockHeader,
		CodeBlockLine,
		CodeBlockTitle,
	} from "$lib/registry/ui/code-block/index.js";
	const translations = {
		en: {
			dir: "ltr" as const,
			values: {
				description: "Install the packages, then start the dev server.",
				title: "Terminal",
			},
		},
		ar: {
			dir: "rtl" as const,
			values: {
				description: "ثبّت الحزم، ثم شغّل خادم التطوير.",
				title: "الطرفية",
			},
		},
		he: {
			dir: "rtl" as const,
			values: {
				description: "התקן את החבילות, ואז הפעל את שרת הפיתוח.",
				title: "מסוף",
			},
		},
	};

	const code = `pnpm add ai @ai-sdk/react zod
pnpm dev`;

	const t = useTranslation(translations, "ar");

	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";
	const lines = useHighlightedCode(
		() => code,
		() => "bash"
	);
</script>

<div class="flex w-full max-w-md flex-col gap-3 text-sm" dir={t.dir}>
	<p>{t.values.description}</p>
	<CodeBlock>
		<CodeBlockHeader>
			<CodeBlockTitle>
				<TerminalIcon />
				{t.values.title}
			</CodeBlockTitle>
			<CodeBlockActions>
				<CodeBlockCopyButton value={code} />
			</CodeBlockActions>
		</CodeBlockHeader>
		<CodeBlockContent lineNumbers>
			{#each lines.current as line, index (index)}<CodeBlockLine code={line} />{/each}
		</CodeBlockContent>
	</CodeBlock>
</div>
