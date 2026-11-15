<script lang="ts">
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";

	let open = $state(false);

	const nodeOutput = "$ node --version\nv24.18.0";
	const pnpmOutput = "$ pnpm --version\n10.33.4";
</script>

<div class="flex w-full max-w-sm flex-col items-start gap-4">
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
				<CodeBlock.Content wrap class="max-h-64" code={nodeOutput} />
			</CodeBlock.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
	<Trace.Collapsible bind:open>
		<Trace.CollapsibleTrigger>
			<Trace.Line>
				<Trace.Icon>
					<TerminalIcon />
				</Trace.Icon>
				<Trace.Title>Ran pnpm --version</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<CodeBlock.Root size="sm">
				<CodeBlock.Content wrap class="max-h-64" code={pnpmOutput} />
			</CodeBlock.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
	<Button variant="outline" size="sm" onclick={() => (open = !open)}>
		{open ? "Hide" : "Show"} the pnpm output
	</Button>
</div>
