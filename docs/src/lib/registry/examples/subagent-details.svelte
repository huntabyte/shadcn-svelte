<script lang="ts">
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import { Badge } from "$lib/registry/ui/badge/index.js";
</script>

<Trace.Root class="max-w-sm">
	<Trace.Collapsible open>
		<Trace.CollapsibleTrigger>
			<Trace.Line>
				<Trace.Icon>
					<CircleCheckIcon />
				</Trace.Icon>
				<Trace.Title>Ran the research agent</Trace.Title>
				<Trace.Description>48s</Trace.Description>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent class="flex flex-col gap-3">
			<div class="flex flex-wrap gap-1.5">
				<Badge variant="secondary">anthropic/claude-sonnet-4.5</Badge>
				<Badge variant="outline" class="font-mono">runCommand</Badge>
			</div>
			<p>Find out why image optimization reruns on every deploy.</p>
			<Trace.Root>
				<Trace.Line>
					<Trace.Icon>
						<CircleCheckIcon />
					</Trace.Icon>
					<Trace.Title>Ran grep -rn cacheKey scripts</Trace.Title>
				</Trace.Line>
				<Trace.Line>
					<Trace.Icon>
						<CircleCheckIcon />
					</Trace.Icon>
					<Trace.Title>Ran sed -n 13,15p scripts/optimize-images.ts</Trace.Title>
				</Trace.Line>
			</Trace.Root>
			<p>The cache is keyed on the commit SHA.</p>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</Trace.Root>
