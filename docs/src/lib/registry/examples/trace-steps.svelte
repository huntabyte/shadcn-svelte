<script lang="ts">
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import SearchIcon from "@lucide/svelte/icons/search";
	import * as CodeBlock from "$lib/registry/ui/code-block/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
</script>

<div class="w-full max-w-sm">
	<Trace.Collapsible open>
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
							<Trace.Icon>
								<SearchIcon />
							</Trace.Icon>
							<Trace.Title>Searched for the checkout build log</Trace.Title>
						</Trace.Line>
					</Trace.CollapsibleTrigger>
					<Trace.CollapsibleContent class="flex flex-wrap gap-1.5">
						<Badge variant="secondary">vercel.com</Badge>
						<Badge variant="secondary">github.com</Badge>
					</Trace.CollapsibleContent>
				</Trace.Collapsible>
				<a href="#steps">
					<Trace.Line>
						<Trace.Icon>
							<FileTextIcon />
						</Trace.Icon>
						<Trace.Title>Read the last twelve deploys</Trace.Title>
						<Trace.Icon>
							<ChevronRightIcon />
						</Trace.Icon>
					</Trace.Line>
				</a>
				<Trace.Collapsible>
					<Trace.CollapsibleTrigger>
						<Trace.Line status="running">
							<Trace.Icon>
								<SearchIcon />
							</Trace.Icon>
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
</div>
