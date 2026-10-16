<script lang="ts">
	import * as Trace from "$lib/registry/ui/trace/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";

	const SOURCES = [
		{
			title: "Caching build outputs | example.com",
			href: "https://example.com/docs/caching",
		},
		{
			title: "Image optimization reference | example.com",
			href: "https://example.com/docs/images",
		},
		{
			title: "Deploy hooks and cache keys | example.com",
			href: "https://example.com/docs/deploy-hooks",
		},
	];
</script>

<Example title="Sources">
	<Trace.Collapsible class="max-w-md" open>
		<Trace.CollapsibleTrigger>
			<Trace.Line>
				<Trace.Title>Used {SOURCES.length} sources</Trace.Title>
			</Trace.Line>
		</Trace.CollapsibleTrigger>
		<Trace.CollapsibleContent>
			<Trace.Root>
				{#each SOURCES as source, index (index)}
					<a href={source.href} target="_blank" rel="noreferrer">
						<Trace.Line>
							<Trace.Icon>
								<IconPlaceholder
									lucide="GlobeIcon"
									tabler="IconGlobe"
									hugeicons="Globe02Icon"
									phosphor="GlobeIcon"
									remixicon="RiGlobeLine"
								/>
							</Trace.Icon>
							<Trace.Title>
								{source.title}
								<span class="sr-only"> (opens in a new tab)</span>
							</Trace.Title>
							<Trace.Icon>
								<IconPlaceholder
									lucide="ArrowUpRightIcon"
									tabler="IconArrowUpRight"
									hugeicons="ArrowUpRight01Icon"
									phosphor="ArrowUpRightIcon"
									remixicon="RiArrowRightUpLine"
								/>
							</Trace.Icon>
						</Trace.Line>
					</a>
				{/each}
			</Trace.Root>
		</Trace.CollapsibleContent>
	</Trace.Collapsible>
</Example>
