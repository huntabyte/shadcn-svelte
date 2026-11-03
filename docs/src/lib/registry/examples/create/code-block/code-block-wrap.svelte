<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const error = `TypeError: Cannot read properties of undefined (reading 'map')
    at MessageList (components/message-list.tsx:18:22)
    at renderWithHooks (react-dom.development.js:16305:18)
    at mountIndeterminateComponent (react-dom.development.js:20069:13)`;
</script>

<Example title="Wrap">
	<CodeBlock.Root>
		<CodeBlock.Content wrap code={error} />
	</CodeBlock.Root>
</Example>
