<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const install = `$ pnpm add ai @ai-sdk/react zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
dependencies:
+ @ai-sdk/react 3.0.12
+ ai 6.0.12
+ zod 4.1.12
Done in 2.8s using pnpm v10.18.0`;
</script>

<Example title="Small">
	<CodeBlock.Root size="sm">
		<CodeBlock.Header>
			<CodeBlock.Title>
				<IconPlaceholder
					lucide="TerminalIcon"
					tabler="IconTerminal"
					hugeicons="ComputerTerminal01Icon"
					phosphor="TerminalIcon"
					remixicon="RiTerminalBoxLine"
				/>
				pnpm add ai @ai-sdk/react zod
			</CodeBlock.Title>
			<CodeBlock.Actions>
				<CodeBlock.CopyButton value={install} />
			</CodeBlock.Actions>
		</CodeBlock.Header>
		<CodeBlock.Content wrap code={install} />
	</CodeBlock.Root>
</Example>
