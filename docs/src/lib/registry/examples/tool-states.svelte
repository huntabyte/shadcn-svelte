<script lang="ts">
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";

	const status = ` M app/api/chat/route.ts
 M components/chat.tsx`;
</script>

<Trace.Root class="max-w-sm">
	<Trace.Collapsible>
		<Trace.CollapsibleTrigger>
			<Trace.Line>
				<Trace.Icon>
					<TerminalIcon />
				</Trace.Icon>
				<Trace.Title>Ran git status --short</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<CodeBlock.Root size="sm">
				<CodeBlock.Content wrap class="max-h-64" code={status} />
			</CodeBlock.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
	<Trace.Collapsible>
		<Trace.CollapsibleTrigger>
			<Trace.Line status="error">
				<Trace.Icon>
					<TerminalIcon />
				</Trace.Icon>
				<Trace.Title>Failed to run pnpm dev</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<CodeBlock.Root size="sm">
				<CodeBlock.Content wrap class="max-h-64" code="Command timed out after 120 seconds." />
			</CodeBlock.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
	<Trace.Line>
		<Trace.Icon>
			<TerminalIcon />
		</Trace.Icon>
		<Trace.Title>Denied rm -rf dist</Trace.Title>
	</Trace.Line>
	<Trace.Line status="running">
		<Trace.Icon>
			<TerminalIcon />
		</Trace.Icon>
		<Trace.Title>Running pnpm test</Trace.Title>
	</Trace.Line>
</Trace.Root>
