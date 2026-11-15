<script lang="ts">
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";

	const LINT_OUTPUT = `> acme-chat@0.1.0 lint
> eslint .

app/api/chat/route.ts
  14:7  error  'model' is assigned a value but never used  no-unused-vars

components/chat.tsx
  42:5  error  React Hook useEffect has a missing dependency: 'messages'  react-hooks/exhaustive-deps

✖ 2 problems (2 errors, 0 warnings)

 ELIFECYCLE  Command failed with exit code 1.`;
</script>

<Trace.Root class="max-w-sm">
	<Trace.Line>
		<Trace.Icon>
			<TerminalIcon />
		</Trace.Icon>
		<Trace.Title>Ran pnpm install</Trace.Title>
	</Trace.Line>
	<Trace.Collapsible open>
		<Trace.CollapsibleTrigger>
			<Trace.Line status="error">
				<Trace.Icon>
					<TerminalIcon />
				</Trace.Icon>
				<Trace.Title>pnpm lint exited with code 1</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<CodeBlock.Root size="sm">
				<CodeBlock.Content wrap class="max-h-64" code={LINT_OUTPUT} />
			</CodeBlock.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</Trace.Root>
