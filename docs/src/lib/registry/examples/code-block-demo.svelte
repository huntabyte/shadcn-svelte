<script lang="ts">
	import DownloadIcon from "@lucide/svelte/icons/download";
	import FileCodeIcon from "@lucide/svelte/icons/file-code";
	import WrapTextIcon from "@lucide/svelte/icons/text-wrap";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	const code = `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    system: "You are a helpful assistant. Answer in one short paragraph.",
    messages,
  })

  return result.toUIMessageStreamResponse()
}`;

	function download(value: string, filename: string) {
		const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		link.click();
		URL.revokeObjectURL(url);
	}

	let wrap = $state(false);

	const lines = useHighlightedCode(
		() => code,
		() => "ts"
	);
</script>

<div class="w-full max-w-lg">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>
				<FileCodeIcon />
				app/api/chat/route.ts
			</CodeBlock.Title>
			<CodeBlock.Actions>
				<Button
					variant="ghost"
					size="icon-xs"
					aria-label="Wrap lines"
					aria-pressed={wrap}
					class="aria-pressed:text-foreground"
					onclick={() => (wrap = !wrap)}
				>
					<WrapTextIcon />
				</Button>
				<Button
					variant="ghost"
					size="icon-xs"
					aria-label="Download"
					onclick={() => download(code, "route.ts")}
				>
					<DownloadIcon />
				</Button>
				<CodeBlock.CopyButton value={code} />
			</CodeBlock.Actions>
		</CodeBlock.Header>
		<CodeBlock.Content {wrap} lineNumbers>
			{#each lines.current as line, index (index)}
				<CodeBlock.Line
					variant={index >= 5 && index <= 9 ? "highlighted" : "default"}
					code={line}
				/>
			{/each}
		</CodeBlock.Content>
	</CodeBlock.Root>
</div>
