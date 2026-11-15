<script lang="ts">
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";

	const command = "pnpm add ai @ai-sdk/react zod";

	const output = `$ ${command}
Packages: +14
Progress: resolved 412, reused 398, downloaded 14, added 14, done
Done in 2.8s using pnpm v10.18.0`;
</script>

<div class="w-full max-w-md">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>
				<TerminalIcon />
				Terminal
			</CodeBlock.Title>
			<CodeBlock.Actions>
				<CodeBlock.CopyButton value={command} />
			</CodeBlock.Actions>
		</CodeBlock.Header>
		<CodeBlock.Content code={output} />
	</CodeBlock.Root>
</div>
