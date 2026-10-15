<script lang="ts">
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";

	const output = `$ pnpm add ai @ai-sdk/react zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
Done in 2.8s using pnpm v10.18.0`;
</script>

<div class="flex w-full max-w-md flex-col gap-4">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>
				<TerminalIcon />
				Terminal
			</CodeBlock.Title>
			<CodeBlock.Actions>
				<CodeBlock.CopyButton value={output} />
			</CodeBlock.Actions>
		</CodeBlock.Header>
		<CodeBlock.Content wrap code={output} />
	</CodeBlock.Root>
	<CodeBlock.Root size="sm">
		<CodeBlock.Header>
			<CodeBlock.Title>
				<TerminalIcon />
				Terminal
			</CodeBlock.Title>
			<CodeBlock.Actions>
				<CodeBlock.CopyButton value={output} />
			</CodeBlock.Actions>
		</CodeBlock.Header>
		<CodeBlock.Content wrap code={output} />
	</CodeBlock.Root>
</div>
