<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";

	const logs = Array.from(
		{ length: 40 },
		(_, index) =>
			`[${String(index + 1).padStart(2, "0")}] GET /api/chat 200 in ${12 + ((index * 7) % 40)}ms`
	).join("\n");
</script>

<div class="w-full max-w-md">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>Logs</CodeBlock.Title>
			<CodeBlock.Actions>
				<CodeBlock.CopyButton value={logs} />
			</CodeBlock.Actions>
		</CodeBlock.Header>
		<CodeBlock.Content class="max-h-48 scroll-fade-y" code={logs} />
	</CodeBlock.Root>
</div>
