<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const log = Array.from(
		{ length: 40 },
		(_, index) =>
			`[${String(index + 1).padStart(2, "0")}] GET /api/chat 200 in ${12 + ((index * 7) % 40)}ms`
	).join("\n");
</script>

<Example title="Height">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>Logs</CodeBlock.Title>
			<CodeBlock.Actions>
				<CodeBlock.CopyButton value={log} />
			</CodeBlock.Actions>
		</CodeBlock.Header>
		<CodeBlock.Content class="max-h-48 scroll-fade-y" code={log} />
	</CodeBlock.Root>
</Example>
