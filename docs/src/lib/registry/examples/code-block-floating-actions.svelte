<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";

	const output = `$ pnpm add ai @ai-sdk/react zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
dependencies:
+ @ai-sdk/react 3.0.12
+ ai 6.0.12
+ zod 4.1.12
Done in 2.8s using pnpm v10.18.0`;
</script>

<div class="w-full max-w-md">
	<CodeBlock.Root>
		<CodeBlock.Actions>
			<CodeBlock.CopyButton value={output} />
		</CodeBlock.Actions>
		<CodeBlock.Content code={output} />
	</CodeBlock.Root>
</div>
