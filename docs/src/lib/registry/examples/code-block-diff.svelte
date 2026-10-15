<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";

	const patch = ` export function Greeting({ name }: { name: string }) {
-  return <p>Hello, {name}</p>
+  return <p className="text-sm text-muted-foreground">
+    Hello, {name}!
+  </p>
 }`;

	function getVariant(line: string) {
		if (line.startsWith("+")) {
			return "added";
		}

		if (line.startsWith("-")) {
			return "removed";
		}

		return "default";
	}
</script>

<div class="w-full max-w-md">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>components/greeting.tsx</CodeBlock.Title>
			<CodeBlock.Actions>
				<CodeBlock.CopyButton value={patch} />
			</CodeBlock.Actions>
		</CodeBlock.Header>
		<CodeBlock.Content>
			{#each patch.split("\n") as line, index (index)}
				<CodeBlock.Line variant={getVariant(line)}>{line.slice(1)}</CodeBlock.Line>
			{/each}
		</CodeBlock.Content>
	</CodeBlock.Root>
</div>
