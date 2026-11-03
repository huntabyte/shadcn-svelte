<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const install = `$ pnpm add ai @ai-sdk/react zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
dependencies:
+ @ai-sdk/react 3.0.12
+ ai 6.0.12
+ zod 4.1.12
Done in 2.8s using pnpm v10.18.0`;

	const error = `TypeError: Cannot read properties of undefined (reading 'map')
    at MessageList (components/message-list.tsx:18:22)
    at renderWithHooks (react-dom.development.js:16305:18)
    at mountIndeterminateComponent (react-dom.development.js:20069:13)`;
</script>

<Example title="Trace">
	<Trace.Root>
		<Trace.Collapsible open>
			<Trace.CollapsibleTrigger>
				<Trace.Line>
					<Trace.Icon>
						<IconPlaceholder
							lucide="TerminalIcon"
							tabler="IconTerminal"
							hugeicons="ComputerTerminal01Icon"
							phosphor="TerminalIcon"
							remixicon="RiTerminalBoxLine"
						/>
					</Trace.Icon>
					<Trace.Title>Ran pnpm add ai @ai-sdk/react zod</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>
				<CodeBlock.Root size="sm">
					<CodeBlock.Content wrap class="max-h-64" code={install} />
				</CodeBlock.Root>
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
		<Trace.Collapsible open>
			<Trace.CollapsibleTrigger>
				<Trace.Line status="error">
					<Trace.Icon>
						<IconPlaceholder
							lucide="TerminalIcon"
							tabler="IconTerminal"
							hugeicons="ComputerTerminal01Icon"
							phosphor="TerminalIcon"
							remixicon="RiTerminalBoxLine"
						/>
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
</Example>
