<script lang="ts">
	import MarkdownCodeBlock from "#lib/components/code-block/markdown-code-block.svelte";
	import { Button } from "#lib/registry/ui/button/index.js";
	import { onDestroy } from "svelte";
	import { Streamdown } from "svelte-streamdown";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const answer = `Wrap the input in a \`useDebounce\` hook:

\`\`\`tsx
export function useDebounce<T>(value: T, delay = 300) {
  const [debounced, setDebounced] = React.useState(value)

  React.useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounced
}
\`\`\`

Then install it:

\`\`\`bash
pnpm dlx shadcn@latest add use-debounce
\`\`\``;

	let position = $state(answer.length);
	let timeout: ReturnType<typeof setTimeout> | undefined;

	function tick() {
		if (position >= answer.length) {
			return;
		}

		timeout = setTimeout(() => {
			position = position + 3;
			tick();
		}, 16);
	}

	function replay() {
		clearTimeout(timeout);
		position = 0;
		tick();
	}

	onDestroy(() => clearTimeout(timeout));
</script>

<Example title="Markdown">
	<div class="flex flex-col gap-4 text-sm">
		<!-- Fenced code renders through `components.code`. Inline code uses the `codespan` snippet. -->
		<Streamdown
			content={answer.slice(0, position)}
			controls={false}
			components={{ code: MarkdownCodeBlock }}
			class="space-y-4 whitespace-normal [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
		>
			{#snippet codespan({ children })}
				<code class="rounded-sm bg-muted px-1 py-0.5 font-mono text-[0.9em]"
					>{@render children()}</code
				>
			{/snippet}
		</Streamdown>
		<Button
			variant="outline"
			size="sm"
			class="self-start"
			disabled={position < answer.length}
			onclick={replay}
		>
			Replay
		</Button>
	</div>
</Example>
