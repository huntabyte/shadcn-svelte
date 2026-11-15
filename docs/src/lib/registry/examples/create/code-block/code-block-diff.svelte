<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const diff = [
		{ variant: "default", text: "export function Greeting({ name }: Props) {" },
		{ variant: "removed", text: "  return <p>Hello, {name}</p>" },
		{
			variant: "added",
			text: '  return <p className="text-sm">Hello, {name}!</p>',
		},
		{ variant: "default", text: "}" },
	] as const;

	const lines = useHighlightedCode(
		() => diff.map((line) => line.text).join("\n"),
		() => "tsx"
	);
</script>

<Example title="Diff">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>components/greeting.tsx</CodeBlock.Title>
		</CodeBlock.Header>
		<CodeBlock.Content lineNumbers>
			{#each lines.current as line, index (index)}
				<CodeBlock.Line variant={diff[index]?.variant} code={line} />
			{/each}
		</CodeBlock.Content>
	</CodeBlock.Root>
</Example>
