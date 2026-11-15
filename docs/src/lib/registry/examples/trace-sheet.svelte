<script lang="ts">
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	import FolderSearchIcon from "@lucide/svelte/icons/folder-search";
	import * as Sheet from "$lib/registry/ui/sheet/index.js";
	import * as Trace from "$lib/registry/ui/trace/index.js";
</script>

<Trace.Root class="max-w-sm">
	<Sheet.Root>
		<Sheet.Trigger>
			<Trace.Line>
				<Trace.Icon>
					<FolderSearchIcon />
				</Trace.Icon>
				<Trace.Title>Explored 4 files</Trace.Title>
				<Trace.Icon>
					<ChevronRightIcon />
				</Trace.Icon>
			</Trace.Line>
		</Sheet.Trigger>
		<Sheet.Content>
			<Sheet.Header>
				<Sheet.Title>Explored 4 files</Sheet.Title>
				<Sheet.Description>Files read while preparing the response.</Sheet.Description>
			</Sheet.Header>
			<ul class="flex flex-col gap-2 px-6 font-mono text-xs">
				<li>apps/v4/lib/docs.ts</li>
				<li>apps/v4/lib/components.ts</li>
				<li>apps/v4/next.config.mjs</li>
				<li>apps/v4/package.json</li>
			</ul>
		</Sheet.Content>
	</Sheet.Root>
</Trace.Root>
