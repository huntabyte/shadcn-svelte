<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";

	const error = `TypeError: Cannot read properties of undefined (reading 'map')
    at MessageList (components/message-list.tsx:18:22)
    at renderWithHooks (react-dom.development.js:16305:18)`;
</script>

<div class="w-full max-w-md">
	<CodeBlock.Root variant="destructive">
		<CodeBlock.Header>
			<CodeBlock.Title>Error</CodeBlock.Title>
			<CodeBlock.Actions>
				<CodeBlock.CopyButton value={error} />
			</CodeBlock.Actions>
		</CodeBlock.Header>
		<CodeBlock.Content wrap code={error} />
	</CodeBlock.Root>
</div>
