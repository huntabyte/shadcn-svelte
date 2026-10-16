<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const nodeVersion = "$ node --version\nv24.18.0";
</script>

{#snippet terminalGlyph()}
	<IconPlaceholder
		lucide="TerminalIcon"
		tabler="IconTerminal"
		hugeicons="ComputerTerminal01Icon"
		phosphor="TerminalIcon"
		remixicon="RiTerminalBoxLine"
	/>
{/snippet}

{#snippet globeGlyph()}
	<IconPlaceholder
		lucide="GlobeIcon"
		tabler="IconGlobe"
		hugeicons="Globe02Icon"
		phosphor="GlobeIcon"
		remixicon="RiGlobeLine"
	/>
{/snippet}

{#snippet searchGlyph()}
	<IconPlaceholder
		lucide="SearchIcon"
		tabler="IconSearch"
		hugeicons="Search01Icon"
		phosphor="MagnifyingGlassIcon"
		remixicon="RiSearchLine"
	/>
{/snippet}

<Example title="Tool Calls">
	<Trace.Root class="max-w-md">
		<Trace.Collapsible>
			<Trace.CollapsibleTrigger>
				<Trace.Line status="running">
					<Trace.Icon>{@render terminalGlyph()}</Trace.Icon>
					<Trace.Title>Running npm --version</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>
				<CodeBlock.Root size="sm">
					<CodeBlock.Content wrap class="max-h-64" code="$ npm --version" />
				</CodeBlock.Root>
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
		<Trace.Collapsible>
			<Trace.CollapsibleTrigger>
				<Trace.Line>
					<Trace.Icon>{@render globeGlyph()}</Trace.Icon>
					<Trace.Title>Searched the web for app getting started installation</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent class="flex flex-wrap gap-1.5">
				<Badge variant="secondary">example.com/docs/install</Badge>
				<Badge variant="secondary">example.com/blog/getting-started</Badge>
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
		<Trace.Line>
			<Trace.Icon>{@render searchGlyph()}</Trace.Icon>
			<Trace.Title>Searched for minimumReleaseAge</Trace.Title>
		</Trace.Line>
		<Trace.Collapsible open>
			<Trace.CollapsibleTrigger>
				<Trace.Line>
					<Trace.Icon>{@render terminalGlyph()}</Trace.Icon>
					<Trace.Title>Ran node --version</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>
				<CodeBlock.Root size="sm">
					<CodeBlock.Content wrap code={nodeVersion} />
				</CodeBlock.Root>
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
		<Trace.Collapsible>
			<Trace.CollapsibleTrigger>
				<Trace.Line status="error">
					<Trace.Icon>{@render terminalGlyph()}</Trace.Icon>
					<Trace.Title>Failed to run pnpm --version</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>
				<CodeBlock.Root size="sm" variant="destructive">
					<CodeBlock.Content wrap class="max-h-64" code="command not found: pnpm" />
				</CodeBlock.Root>
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
	</Trace.Root>
</Example>
