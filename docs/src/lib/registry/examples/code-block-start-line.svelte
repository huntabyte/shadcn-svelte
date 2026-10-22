<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import { useHighlightedCode } from "$lib/registry/hooks/use-highlighted-code.svelte.js";

	const code = `  if (!session) {
    redirect("/login")
  }

  const projects = await db.project.findMany({
    where: { ownerId: session.user.id },
    orderBy: { updatedAt: "desc" },
  })

  return <ProjectList projects={projects} />
}`;

	const lines = useHighlightedCode(
		() => code,
		() => "tsx"
	);
</script>

<div class="w-full max-w-md">
	<CodeBlock.Root>
		<CodeBlock.Header>
			<CodeBlock.Title>app/dashboard/page.tsx</CodeBlock.Title>
		</CodeBlock.Header>
		<CodeBlock.Content lineNumbers startLine={995}>
			{#each lines.current as line, index (index)}
				<CodeBlock.Line code={line} />
			{/each}
		</CodeBlock.Content>
	</CodeBlock.Root>
</div>
