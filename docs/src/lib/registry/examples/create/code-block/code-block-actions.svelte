<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const source = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  })

  return result.toUIMessageStreamResponse()
}`;

	function download(code: string, filename: string) {
		const url = URL.createObjectURL(new Blob([code], { type: "text/plain" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		link.click();
		URL.revokeObjectURL(url);
	}

	let wrap = $state(false);

	const lines = useHighlightedCode(
		() => source,
		() => "ts"
	);
</script>

<Example title="Actions">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>app/api/chat/route.ts</CodeBlock.Title>
			<CodeBlock.Actions>
				<Button
					variant="ghost"
					size="icon-xs"
					aria-label="Wrap lines"
					aria-pressed={wrap}
					class="aria-pressed:text-foreground"
					onclick={() => (wrap = !wrap)}
				>
					<IconPlaceholder
						lucide="WrapTextIcon"
						tabler="IconTextWrap"
						hugeicons="TextWrapIcon"
						phosphor="ArrowUDownLeftIcon"
						remixicon="RiTextWrap"
					/>
				</Button>
				<Button
					variant="ghost"
					size="icon-xs"
					aria-label="Download"
					onclick={() => download(source, "route.ts")}
				>
					<IconPlaceholder
						lucide="DownloadIcon"
						tabler="IconDownload"
						hugeicons="Download01Icon"
						phosphor="DownloadSimpleIcon"
						remixicon="RiDownloadLine"
					/>
				</Button>
				<CodeBlock.CopyButton value={source} />
			</CodeBlock.Actions>
		</CodeBlock.Header>
		<CodeBlock.Content {wrap} lineNumbers>
			{#each lines.current as line, index (index)}
				<CodeBlock.Line code={line} />
			{/each}
		</CodeBlock.Content>
	</CodeBlock.Root>
</Example>
