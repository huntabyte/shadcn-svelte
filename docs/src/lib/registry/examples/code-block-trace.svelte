<script lang="ts">
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";

	const output = `$ node --version
v24.18.0`;

	const error = `$ pnpm dev
Error: listen EADDRINUSE: address already in use :::3000
    at Server.setupListenHandle [as _listen2] (node:net:1908:16)`;
</script>

<div class="w-full max-w-md">
	<Trace.Root>
		<Trace.Collapsible open>
			<Trace.CollapsibleTrigger>
				<Trace.Line>
					<Trace.Icon>
						<TerminalIcon />
					</Trace.Icon>
					<Trace.Title>Ran node --version</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>
				<CodeBlock.Root size="sm">
					<CodeBlock.Content wrap class="max-h-64" code={output} />
				</CodeBlock.Root>
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
		<Trace.Collapsible open>
			<Trace.CollapsibleTrigger>
				<Trace.Line status="error">
					<Trace.Icon>
						<TerminalIcon />
					</Trace.Icon>
					<Trace.Title>Failed to run pnpm dev</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>
				<CodeBlock.Root size="sm" variant="destructive">
					<CodeBlock.Content wrap class="max-h-64" code={error} />
				</CodeBlock.Root>
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
	</Trace.Root>
</div>
