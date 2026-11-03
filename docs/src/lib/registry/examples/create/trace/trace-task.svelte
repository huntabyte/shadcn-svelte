<script lang="ts">
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

{#snippet fileSearchGlyph()}
	<IconPlaceholder
		lucide="FileSearchIcon"
		tabler="IconFileSearch"
		hugeicons="FileSearchIcon"
		phosphor="FileMagnifyingGlassIcon"
		remixicon="RiFileSearchLine"
	/>
{/snippet}

<Example title="Task">
	<Trace.Collapsible class="max-w-md" open>
		<Trace.CollapsibleTrigger>
			<Trace.Line>
				<Trace.Title>Found the project files</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<Trace.Root>
				<Trace.Line>
					<Trace.Icon>{@render searchGlyph()}</Trace.Icon>
					<Trace.Title>Searched for app/page.tsx</Trace.Title>
				</Trace.Line>
				<a href="#task">
					<Trace.Line>
						<Trace.Icon>{@render fileGlyph()}</Trace.Icon>
						<Trace.Title>Read app/page.tsx</Trace.Title>
						<Trace.Icon>{@render chevronRightGlyph()}</Trace.Icon>
					</Trace.Line>
				</a>
				<Trace.Line>
					<Trace.Icon>{@render fileSearchGlyph()}</Trace.Icon>
					<Trace.Title>Scanned 52 files</Trace.Title>
				</Trace.Line>
				<a href="#task">
					<Trace.Line>
						<Trace.Icon>{@render fileGlyph()}</Trace.Icon>
						<Trace.Title>Read app/layout.tsx</Trace.Title>
						<Trace.Icon>{@render chevronRightGlyph()}</Trace.Icon>
					</Trace.Line>
				</a>
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</Example>
