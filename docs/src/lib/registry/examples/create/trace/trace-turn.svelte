<script lang="ts">
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const REASONING = `The user wants to know why the checkout deploy is slow, so I should start from the build log instead of guessing.

The install and compile steps finish in under a minute. Image optimization takes almost four, and it runs on every deploy because the cache key includes the commit hash.

Keying the cache on the lockfile and the image directory should let most deploys skip that step entirely.`;
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

{#snippet brainGlyph()}
	<IconPlaceholder
		lucide="BrainIcon"
		tabler="IconBrain"
		hugeicons="AiBrainIcon"
		phosphor="BrainIcon"
		remixicon="RiBrainLine"
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

{#snippet terminalGlyph()}
	<IconPlaceholder
		lucide="TerminalIcon"
		tabler="IconTerminal"
		hugeicons="ComputerTerminal01Icon"
		phosphor="TerminalIcon"
		remixicon="RiTerminalBoxLine"
	/>
{/snippet}

<Example title="Whole Turn" containerClass="md:col-span-2">
	<Trace.Collapsible class="max-w-md" open>
		<Trace.CollapsibleTrigger>
			<Trace.Line status="error">
				<Trace.Title>Worked for 2m 4s, 1 command failed</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent class="flex flex-col gap-2">
			<Trace.Root>
				<Trace.Collapsible>
					<Trace.CollapsibleTrigger>
						<Trace.Line>
							<Trace.Icon>{@render brainGlyph()}</Trace.Icon>
							<Trace.Title>Thought for 12 seconds</Trace.Title>
						</Trace.Line>
					</Trace.CollapsibleTrigger>
					<Trace.CollapsibleContent class="whitespace-pre-wrap">
						{REASONING}
					</Trace.CollapsibleContent>
				</Trace.Collapsible>
				<Trace.Collapsible open>
					<Trace.CollapsibleTrigger>
						<Trace.Line status="error">
							<Trace.Icon>{@render terminalGlyph()}</Trace.Icon>
							<Trace.Title>Ran 3 commands, 1 failed</Trace.Title>
						</Trace.Line>
					</Trace.CollapsibleTrigger>
					<Trace.CollapsibleContent>
						<Trace.Root>
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
							<Trace.Line>
								<Trace.Icon>{@render terminalGlyph()}</Trace.Icon>
								<Trace.Title>Ran mkdir -p dist</Trace.Title>
							</Trace.Line>
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
					</Trace.CollapsibleContent>
				</Trace.Collapsible>
			</Trace.Root>
			<p>Node is installed and pnpm is not. Reading the docs config.</p>
			<Trace.Root>
				<a href="#whole-turn">
					<Trace.Line>
						<Trace.Icon>{@render fileGlyph()}</Trace.Icon>
						<Trace.Title>Read apps/v4/lib/docs.ts</Trace.Title>
						<Trace.Icon>{@render chevronRightGlyph()}</Trace.Icon>
					</Trace.Line>
				</a>
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</Example>
