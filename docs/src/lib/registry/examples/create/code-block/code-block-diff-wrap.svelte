<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const longDiff = [
		{ variant: "default", text: "export async function GET(request: Request) {" },
		{
			variant: "removed",
			text: '  const { searchParams } = new URL(request.url, "http://localhost:3000/api/projects?include=owner,members")',
		},
		{
			variant: "added",
			text: '  const { searchParams } = new URL(request.url, process.env.NEXT_PUBLIC_APP_URL ?? request.headers.get("origin") ?? undefined)',
		},
		{
			variant: "added",
			text: '  const include = searchParams.get("include")?.split(",") ?? []',
		},
		{
			variant: "default",
			text: "  return Response.json(await getProjects({ include }))",
		},
		{ variant: "default", text: "}" },
	] as const;

	const lines = useHighlightedCode(
		() => longDiff.map((line) => line.text).join("\n"),
		() => "ts"
	);
</script>

<Example title="Diff, Wrap and Highlighting">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>app/api/projects/route.ts</CodeBlock.Title>
		</CodeBlock.Header>
		<CodeBlock.Content wrap lineNumbers startLine={12}>
			{#each lines.current as line, index (index)}
				<CodeBlock.Line variant={longDiff[index]?.variant} code={line} />
			{/each}
		</CodeBlock.Content>
	</CodeBlock.Root>
</Example>
