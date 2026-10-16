<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Sheet from "$lib/registry/ui/sheet/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

{#snippet chevronRightGlyph()}
	<IconPlaceholder
		lucide="ChevronRightIcon"
		tabler="IconChevronRight"
		hugeicons="ArrowRight01Icon"
		phosphor="CaretRightIcon"
		remixicon="RiArrowRightSLine"
	/>
{/snippet}

{#snippet fileGlyph()}
	<IconPlaceholder
		lucide="FileTextIcon"
		tabler="IconFileText"
		hugeicons="File02Icon"
		phosphor="FileTextIcon"
		remixicon="RiFileTextLine"
	/>
{/snippet}

{#snippet fileSearchGlyph()}
	<IconPlaceholder
		lucide="FileSearchIcon"
		tabler="IconFileSearch"
		hugeicons="FileSearchIcon"
		phosphor="FileMagnifyingGlassIcon"
		remixicon="RiFileSearchLine"
	/>
{/snippet}

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

<Example title="Rows">
	<Trace.Root class="max-w-md">
		<Trace.Line status="running">
			<Trace.Icon>{@render fileSearchGlyph()}</Trace.Icon>
			<Trace.Title>Scanning 52 files</Trace.Title>
		</Trace.Line>
		<Trace.Collapsible>
			<Trace.CollapsibleTrigger>
				<Trace.Line>
					<Trace.Icon>{@render terminalGlyph()}</Trace.Icon>
					<Trace.Title>Ran node --version</Trace.Title>
				</Trace.Line>
			</Trace.CollapsibleTrigger>
			<Trace.CollapsibleContent>
				<CodeBlock.Root size="sm">
					<CodeBlock.Content wrap class="max-h-64" code="v24.18.0" />
				</CodeBlock.Root>
			</Trace.CollapsibleContent>
		</Trace.Collapsible>
		<a href="#rows">
			<Trace.Line>
				<Trace.Icon>{@render fileGlyph()}</Trace.Icon>
				<Trace.Title>Read apps/v4/lib/docs.ts</Trace.Title>
				<Trace.Icon>{@render chevronRightGlyph()}</Trace.Icon>
			</Trace.Line>
		</a>
		<Sheet.Root>
			<Sheet.Trigger>
				<Trace.Line>
					<Trace.Icon>{@render fileSearchGlyph()}</Trace.Icon>
					<Trace.Title>Explored 4 files</Trace.Title>
					<Trace.Icon>{@render chevronRightGlyph()}</Trace.Icon>
				</Trace.Line>
			</Sheet.Trigger>
			<Sheet.Content>
				<Sheet.Header>
					<Sheet.Title>Explored 4 files</Sheet.Title>
					<Sheet.Description>Files read while preparing the response.</Sheet.Description>
				</Sheet.Header>
				<ul class="flex flex-col gap-2 px-4 font-mono text-xs">
					<li>apps/v4/lib/docs.ts</li>
					<li>apps/v4/lib/components.ts</li>
					<li>apps/v4/next.config.mjs</li>
					<li>apps/v4/package.json</li>
				</ul>
			</Sheet.Content>
		</Sheet.Root>
		<Dialog.Root>
			<Dialog.Trigger>
				<Trace.Line>
					<Trace.Icon>{@render globeGlyph()}</Trace.Icon>
					<Trace.Title>Searched the web for cache keys</Trace.Title>
					<Trace.Icon>{@render chevronRightGlyph()}</Trace.Icon>
				</Trace.Line>
			</Dialog.Trigger>
			<Dialog.Content>
				<Dialog.Header>
					<Dialog.Title>Searched the web for cache keys</Dialog.Title>
					<Dialog.Description>Three results were used in the response.</Dialog.Description>
				</Dialog.Header>
				<ul class="flex flex-col gap-2 text-sm">
					<li>Caching build outputs</li>
					<li>Image optimization reference</li>
					<li>Deploy hooks and cache keys</li>
				</ul>
			</Dialog.Content>
		</Dialog.Root>
	</Trace.Root>
</Example>
