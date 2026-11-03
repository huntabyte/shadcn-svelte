<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const build = `$ pnpm build
> next build

   ▲ Next.js 16.0.0
   Creating an optimized production build ...
 ✓ Compiled successfully in 4.2s
 ✓ Generating static pages (12/12)

Route (app)                Size  First Load JS
┌ ○ /                    1.9 kB         112 kB
├ ○ /_not-found           993 B         103 kB
└ ƒ /api/chat             141 B         102 kB`;
</script>

<Example title="Plain">
	<CodeBlock.Root>
		<CodeBlock.Content code={build} />
	</CodeBlock.Root>
</Example>
