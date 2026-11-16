<script lang="ts">
	import { onDestroy } from "svelte";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
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

	const streamed: {
		title?: string;
		language: string;
		code: string;
		lineNumbers?: boolean;
		highlight?: number[];
		diff?: boolean;
	}[] = [
		{
			title: "app/api/chat/route.ts",
			language: "ts",
			lineNumbers: true,
			highlight: [5, 6, 7, 8],
			code: source,
		},
		{ language: "bash", code: "pnpm dlx shadcn@latest add code-block" },
		{
			title: "components/search.tsx",
			language: "tsx",
			lineNumbers: true,
			diff: true,
			code: ` export function Search() {
   const [query, setQuery] = React.useState("")
-  const results = useSearch(query)
+  const debounced = useDebounce(query, 300)
+  const results = useSearch(debounced)
 
   return <SearchResults results={results} />
 }`,
		},
	];

	// Where each block starts in the stream.
	const offsets = streamed.map((_, index) =>
		streamed.slice(0, index).reduce((total, block) => total + block.code.length, 0)
	);
	const streamedLength = streamed.reduce((sum, block) => sum + block.code.length, 0);

	let position = $state(streamedLength);
	let timeout: ReturnType<typeof setTimeout> | undefined;

	function tick() {
		if (position >= streamedLength) {
			return;
		}

		timeout = setTimeout(() => {
			position = position + 3;
			tick();
		}, 16);
	}

	function replay() {
		clearTimeout(timeout);
		position = 0;
		tick();
	}

	onDestroy(() => clearTimeout(timeout));

	const blocks = streamed.map((block, index) => {
		const code = () => block.code.slice(0, Math.max(0, position - offsets[index]));
		const rows = () => code().split("\n");
		// A diff row starts with +, - or a space. The marker is not part of the code.
		const text = () =>
			block.diff
				? rows()
						.map((row) => row.slice(1))
						.join("\n")
				: code();
		const lines = useHighlightedCode(text, () => block.language);

		return {
			get code() {
				return code();
			},
			get rows() {
				return rows();
			},
			get text() {
				return text();
			},
			get lines() {
				return lines.current;
			},
		};
	});

	function getVariant(block: (typeof streamed)[number], rows: string[], index: number) {
		if (block.diff) {
			if (rows[index]?.startsWith("+")) {
				return "added";
			}

			if (rows[index]?.startsWith("-")) {
				return "removed";
			}

			return "default";
		}

		return block.highlight?.includes(index) ? "highlighted" : "default";
	}
</script>

<Example title="Streaming">
	<div class="flex flex-col gap-4">
		{#each streamed as block, blockIndex (blockIndex)}
			{#if position > offsets[blockIndex]}
				{@const stream = blocks[blockIndex]}
				<CodeBlock.Root>
					{#if block.title}
						<CodeBlock.Header>
							<CodeBlock.Title>{block.title}</CodeBlock.Title>
							<CodeBlock.Actions>
								<CodeBlock.CopyButton
									value={stream.text}
									disabled={stream.code.length < block.code.length}
								/>
							</CodeBlock.Actions>
						</CodeBlock.Header>
					{/if}
					<CodeBlock.Content lineNumbers={block.lineNumbers}>
						{#each stream.lines as line, index (index)}
							<CodeBlock.Line variant={getVariant(block, stream.rows, index)} code={line} />
						{/each}
					</CodeBlock.Content>
				</CodeBlock.Root>
			{/if}
		{/each}
		<Button
			variant="outline"
			size="sm"
			class="self-start"
			disabled={position < streamedLength}
			onclick={replay}
		>
			Replay
		</Button>
	</div>
</Example>
