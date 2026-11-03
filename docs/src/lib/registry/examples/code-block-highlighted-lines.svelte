<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";

	const code = `export default {
  experimental: {
    reactCompiler: true,
    viewTransition: true,
  },
  images: {
    remotePatterns: [{ hostname: "avatars.githubusercontent.com" }],
  },
}`;

	const highlighted = [2, 3];
</script>

<div class="w-full max-w-md">
	<CodeBlock.Root>
		<CodeBlock.Content lineNumbers>
			{#each code.split("\n") as line, index (index)}
				<CodeBlock.Line variant={highlighted.includes(index) ? "highlighted" : "default"}
					>{line}</CodeBlock.Line
				>
			{/each}
		</CodeBlock.Content>
	</CodeBlock.Root>
</div>
