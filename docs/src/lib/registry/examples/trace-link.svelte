<script lang="ts">
	import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import GlobeIcon from "@lucide/svelte/icons/globe";
	import * as Trace from "$lib/registry/ui/trace/index.js";
</script>

<Trace.Root class="max-w-sm">
	<a href="#link">
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
	<a href="https://docs.astro.build/en/install-and-setup/" target="_blank" rel="noreferrer">
		<Trace.Line>
			<Trace.Icon>
				<GlobeIcon />
			</Trace.Icon>
			<Trace.Title>
				Install Astro | docs.astro.build
				<span class="sr-only"> (opens in a new tab)</span>
			</Trace.Title>
			<Trace.Icon>
				<ArrowUpRightIcon />
			</Trace.Icon>
		</Trace.Line>
	</a>
</Trace.Root>
