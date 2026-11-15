<script lang="ts">
	import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import * as Dialog from "$lib/registry/ui/dialog/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";

	const results = [
		{
			title: "Caching build outputs",
			url: "https://nextjs.org/docs/app/guides/caching",
		},
		{
			title: "Image optimization reference",
			url: "https://nextjs.org/docs/app/api-reference/components/image",
		},
		{
			title: "Deploy hooks and cache keys",
			url: "https://vercel.com/docs/deploy-hooks",
		},
	];
</script>

<Trace.Root class="max-w-sm">
	<Dialog.Root>
		<Dialog.Trigger>
			<Trace.Line>
				<Trace.Icon>
					<GlobeIcon />
				</Trace.Icon>
				<Trace.Title>Searched the web for cache keys</Trace.Title>
				<Trace.Icon>
					<ChevronRightIcon />
				</Trace.Icon>
			</Trace.Line>
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>Searched the web for cache keys</Dialog.Title>
				<Dialog.Description>Three results were used in the response.</Dialog.Description>
			</Dialog.Header>
			<Trace.Root>
				{#each results as result, index (index)}
					<a href={result.url} target="_blank" rel="noreferrer">
						<Trace.Line>
							<Trace.Icon>
								<GlobeIcon />
							</Trace.Icon>
							<Trace.Title>
								{result.title}
								<span class="sr-only"> (opens in a new tab)</span>
							</Trace.Title>
							<Trace.Icon>
								<ArrowUpRightIcon />
							</Trace.Icon>
						</Trace.Line>
					</a>
				{/each}
			</Trace.Root>
		</Dialog.Content>
	</Dialog.Root>
</Trace.Root>
