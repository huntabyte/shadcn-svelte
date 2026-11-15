<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";

	const code = `{
  "location": "San Francisco",
  "temperature": 18,
  "unit": "celsius",
  "conditions": ["fog", "wind"]
}`;

	const lines = useHighlightedCode(
		() => code,
		() => "json"
	);
</script>

<div class="w-full max-w-md">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>getWeather output</CodeBlock.Title>
		</CodeBlock.Header>
		<CodeBlock.Content>
			{#each lines.current as line, index (index)}
				<CodeBlock.Line code={line} />
			{/each}
		</CodeBlock.Content>
	</CodeBlock.Root>
</div>
