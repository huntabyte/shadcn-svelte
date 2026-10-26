<script lang="ts">
	import * as CodeBlock from "#lib/registry/ui/code-block/index.js";
	import RotateCcwIcon from "@lucide/svelte/icons/rotate-ccw";
	import { useHighlightedCode } from "#lib/registry/hooks/use-highlighted-code.svelte.js";
	import { Button } from "#lib/registry/ui/button/index.js";
	import { onDestroy } from "svelte";

	const blocks: {
		title?: string;
		language: string;
		code: string;
		lineNumbers?: boolean;
		highlight?: number[];
		diff?: boolean;
	}[] = [
		{
			title: "hooks/use-debounce.ts",
			language: "ts",
			lineNumbers: true,
			code: `export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}`,
		},
		{
			language: "bash",
			code: "pnpm dlx shadcn@latest add code-block",
		},
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
		{
			title: "app/api/chat/route.ts",
			language: "ts",
			lineNumbers: true,
			highlight: [5, 6, 7, 8],
			code: `import { streamText } from "ai"

export async function POST(request: Request) {
  const { messages } = await request.json()

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  })

  return result.toUIMessageStreamResponse()
}`,
		},
		{
			title: ".env.local",
			language: "bash",
			code: "AI_GATEWAY_API_KEY=your-api-key",
		},
	];

	// Where each block starts in the stream.
	const offsets = blocks.map((_, index) =>
		blocks.slice(0, index).reduce((total, block) => total + block.code.length, 0)
	);
	const total = blocks.reduce((sum, block) => sum + block.code.length, 0);

	let length = $state(total);
	let interval: ReturnType<typeof setInterval> | undefined;

	function replay() {
		clearInterval(interval);
		length = 0;
		interval = setInterval(() => {
			length = Math.min(length + 3, total);

			if (length >= total) {
				clearInterval(interval);
			}
		}, 16);
	}

	onDestroy(() => clearInterval(interval));

	const streamed = blocks.map((block, index) => {
		const code = () => block.code.slice(0, Math.max(0, length - offsets[index]));
		const rows = () => code().split("\n");
		// A diff row starts with +, - or a space. The marker is not part of the code.
		const source = () =>
			block.diff
				? rows()
						.map((row) => row.slice(1))
						.join("\n")
				: code();
		const lines = useHighlightedCode(source, () => block.language);

		return {
			get rows() {
				return rows();
			},
			get source() {
				return source();
			},
			get lines() {
				return lines.current;
			},
		};
	});

	function getVariant(block: (typeof blocks)[number], rows: string[], index: number) {
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

<div class="flex w-full max-w-md flex-col gap-4">
	{#each blocks as block, blockIndex (block.code)}
		{#if length > offsets[blockIndex]}
			{@const stream = streamed[blockIndex]}
			<CodeBlock.Root>
				{#if block.title}
					<CodeBlock.Header>
						<CodeBlock.Title>{block.title}</CodeBlock.Title>
						<CodeBlock.Actions>
							<CodeBlock.CopyButton
								value={stream.source}
								disabled={length - offsets[blockIndex] < block.code.length}
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
	<Button variant="outline" size="sm" class="self-start" disabled={length < total} onclick={replay}>
		<RotateCcwIcon />
		Replay
	</Button>
</div>
