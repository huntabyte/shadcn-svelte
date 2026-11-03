<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Badge } from "$lib/registry/ui/badge/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

{#snippet searchGlyph()}
	<IconPlaceholder
		lucide="SearchIcon"
		tabler="IconSearch"
		hugeicons="Search01Icon"
		phosphor="MagnifyingGlassIcon"
		remixicon="RiSearchLine"
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

<Example title="Chain of Thought">
	<Trace.Collapsible class="max-w-md" open>
		<Trace.CollapsibleTrigger>
			<Trace.Line status="running">
				<Trace.Title>Looking into the slow deploy</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<Trace.Root>
				<Trace.Collapsible>
					<Trace.CollapsibleTrigger>
						<Trace.Line>
							<Trace.Icon>{@render searchGlyph()}</Trace.Icon>
							<Trace.Title>Searched for the checkout build log</Trace.Title>
						</Trace.Line>
					</Trace.CollapsibleTrigger>
					<Trace.CollapsibleContent class="flex flex-wrap gap-1.5">
						<Badge variant="secondary">vercel.com</Badge>
						<Badge variant="secondary">github.com</Badge>
						<Badge variant="secondary">nextjs.org</Badge>
					</Trace.CollapsibleContent>
				</Trace.Collapsible>
				<Trace.Collapsible open>
					<Trace.CollapsibleTrigger>
						<Trace.Line>
							<Trace.Icon>{@render fileGlyph()}</Trace.Icon>
							<Trace.Title>Read the last twelve deploys</Trace.Title>
						</Trace.Line>
					</Trace.CollapsibleTrigger>
					<Trace.CollapsibleContent>
						Image optimization takes almost four minutes on every deploy. The other steps finish in
						under a minute.
					</Trace.CollapsibleContent>
				</Trace.Collapsible>
				<Trace.Collapsible>
					<Trace.CollapsibleTrigger>
						<Trace.Line status="running">
							<Trace.Icon>{@render searchGlyph()}</Trace.Icon>
							<Trace.Title>Searching for the cache key</Trace.Title>
						</Trace.Line>
					</Trace.CollapsibleTrigger>
					<Trace.CollapsibleContent>
						<CodeBlock.Root size="sm">
							<CodeBlock.Content wrap class="max-h-64" code="cache key image optimization" />
						</CodeBlock.Root>
					</Trace.CollapsibleContent>
				</Trace.Collapsible>
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</Example>
