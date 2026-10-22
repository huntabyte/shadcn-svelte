<script lang="ts">
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import LoaderCircleIcon from "@lucide/svelte/icons/loader-circle";
	import * as Trace from "$lib/registry/ui/trace/index.js";
</script>

<Trace.Root class="max-w-sm">
	<Trace.Collapsible open>
		<Trace.CollapsibleTrigger>
			<Trace.Line status="running">
				<Trace.Icon>
					<LoaderCircleIcon class="animate-spin" />
				</Trace.Icon>
				<Trace.Title>Running the research agent</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<Trace.Root>
				<Trace.Line>
					<Trace.Icon>
						<CircleCheckIcon />
					</Trace.Icon>
					<Trace.Title>Ran grep -rn cacheKey scripts</Trace.Title>
				</Trace.Line>
				<Trace.Line status="running">
					<Trace.Icon>
						<LoaderCircleIcon class="animate-spin" />
					</Trace.Icon>
					<Trace.Title>Running sed -n 13,15p scripts/optimize-images.ts</Trace.Title>
				</Trace.Line>
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</Trace.Root>
