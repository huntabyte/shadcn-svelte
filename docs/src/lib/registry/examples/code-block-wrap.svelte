<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";

	const output = `Error: The model "anthropic/claude-sonnet-4.5" returned an error: Request too large. The prompt is 212,431 tokens and the context window is 200,000 tokens. Remove some messages or summarize the conversation and try again.`;
</script>

<div class="flex w-full max-w-md flex-col gap-4">
	<CodeBlock.Root>
		<CodeBlock.Content code={output} />
	</CodeBlock.Root>
	<CodeBlock.Root>
		<CodeBlock.Content wrap code={output} />
	</CodeBlock.Root>
</div>
