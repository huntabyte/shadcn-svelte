<script lang="ts">
	import CircleIcon from "@lucide/svelte/icons/circle";
	import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
	import RouteIcon from "@lucide/svelte/icons/route";
	import * as Trace from "$lib/registry/ui/trace/index.js";

	const steps = [
		"Add a dark variant to the theme tokens",
		"Read the theme from a cookie on the server",
		"Add a toggle to the settings page",
		"Check contrast on the charts",
	];
</script>

<Trace.Root class="max-w-sm">
	<Trace.Collapsible open>
		<Trace.CollapsibleTrigger>
			<Trace.Line>
				<Trace.Icon>
					<RouteIcon />
				</Trace.Icon>
				<Trace.Title>Plan: add dark mode</Trace.Title>
				<Trace.Description>1 of {steps.length} done</Trace.Description>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent class="flex flex-col gap-3">
			<p>
				Store the theme in a cookie so the server renders the right one and the page does not flash
				on load.
			</p>
			<Trace.Root>
				{#each steps as step, index (index)}
					<Trace.Line status={index > 0 ? "pending" : undefined}>
						<Trace.Icon>
							{#if index === 0}
								<CircleCheckIcon />
							{:else}
								<CircleIcon />
							{/if}
						</Trace.Icon>
						<Trace.Title>{step}</Trace.Title>
					</Trace.Line>
				{/each}
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</Trace.Root>
