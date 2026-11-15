<script lang="ts">
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import * as Trace from "$lib/registry/ui/trace/index.js";
</script>

<Trace.Root class="max-w-sm">
	<Trace.Collapsible>
		<Trace.CollapsibleTrigger>
			<Trace.Line>
				<Trace.Icon>
					<CircleCheckIcon />
				</Trace.Icon>
				<Trace.Title>Thought</Trace.Title>
				<Trace.Description>12s</Trace.Description>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent class="whitespace-pre-wrap">
			The build log shows install and compile finish in under a minute. Image optimization takes
			almost four, and it reruns on every deploy because the cache key includes the commit hash.
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</Trace.Root>
