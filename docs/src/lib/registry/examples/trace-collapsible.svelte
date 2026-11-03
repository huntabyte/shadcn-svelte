<script lang="ts">
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";

	const output = "$ node --version\nv24.18.0";
</script>

<div class="w-full max-w-sm">
	<Trace.Collapsible>
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
</div>
