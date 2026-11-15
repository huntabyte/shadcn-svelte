<script lang="ts">
	import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import * as Trace from "$lib/registry/ui/trace/index.js";

	const sources = [
		{
			title: "Install Astro | docs.astro.build",
			href: "https://docs.astro.build/en/install-and-setup/",
		},
		{
			title: "create-astro | npmjs.com",
			href: "https://www.npmjs.com/package/create-astro",
		},
		{
			title: "Settings: minimumReleaseAge | pnpm.io",
			href: "https://pnpm.io/settings#minimumreleaseage",
		},
	];
</script>

<div class="w-full max-w-sm">
	<Trace.Collapsible open>
		<Trace.CollapsibleTrigger>
			<Trace.Line>
				<Trace.Icon>
					<GlobeIcon />
				</Trace.Icon>
				<Trace.Title>Used {sources.length} sources</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<Trace.Root>
				{#each sources as source, index (index)}
					<a href={source.href} target="_blank" rel="noreferrer">
						<Trace.Line>
							<Trace.Icon>
								<GlobeIcon />
							</Trace.Icon>
							<Trace.Title>
								{source.title}
								<span class="sr-only"> (opens in a new tab)</span>
							</Trace.Title>
							<Trace.Icon>
								<ArrowUpRightIcon />
							</Trace.Icon>
						</Trace.Line>
					</a>
				{/each}
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</div>
