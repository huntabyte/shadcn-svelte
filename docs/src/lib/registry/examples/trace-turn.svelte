<script lang="ts">
	import BrainIcon from "@lucide/svelte/icons/brain";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import TerminalIcon from "@lucide/svelte/icons/terminal";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
</script>

<div class="w-full max-w-sm">
	<Trace.Collapsible open>
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
							<Trace.Icon>
								<BrainIcon />
							</Trace.Icon>
							<Trace.Title>Thought</Trace.Title>
							<Trace.Description>12s</Trace.Description>
						</Trace.Line>
					</Trace.CollapsibleTrigger>
					<Trace.CollapsibleContent class="whitespace-pre-wrap">
						I should check which package managers are installed before I scaffold anything.
					</Trace.CollapsibleContent>
				</Trace.Collapsible>
				<Trace.Collapsible open>
					<Trace.CollapsibleTrigger>
						<Trace.Line status="error">
							<Trace.Icon>
								<TerminalIcon />
							</Trace.Icon>
							<Trace.Title>Ran 2 commands, 1 failed</Trace.Title>
						</Trace.Line>
					</Trace.CollapsibleTrigger>
					<Trace.CollapsibleContent>
						<Trace.Root>
							<Trace.Line>
								<Trace.Icon>
									<TerminalIcon />
								</Trace.Icon>
								<Trace.Title>Ran node --version</Trace.Title>
							</Trace.Line>
							<Trace.Collapsible>
								<Trace.CollapsibleTrigger>
									<Trace.Line status="error">
										<Trace.Icon>
											<TerminalIcon />
										</Trace.Icon>
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
				<a href="#turn">
					<Trace.Line>
						<Trace.Icon>
							<FileTextIcon />
						</Trace.Icon>
						<Trace.Title>Read apps/v4/lib/docs.ts</Trace.Title>
						<Trace.Icon>
							<ChevronRightIcon />
						</Trace.Icon>
					</Trace.Line>
				</a>
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</div>
