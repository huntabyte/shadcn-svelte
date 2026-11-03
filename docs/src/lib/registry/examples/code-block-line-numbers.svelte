<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";

	const code = `{
  "name": "chat",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build"
  }
}`;
</script>

<div class="w-full max-w-md">
	<CodeBlock.Root>
		<CodeBlock.Content lineNumbers {code} />
	</CodeBlock.Root>
</div>
