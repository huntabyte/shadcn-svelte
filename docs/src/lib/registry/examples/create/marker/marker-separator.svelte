<script lang="ts">
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Spinner } from "$lib/registry/ui/spinner/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Separator" class="gap-8">
	<Marker.Root variant="separator">
		<Marker.Content>Worked for 42s</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="separator" role="status">
		<Marker.Icon>
			<Spinner />
		</Marker.Icon>
		<Marker.Content>Compacting conversation</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="separator" role="status">
		<Marker.Content class="shimmer">Reading 4 files</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="separator">
		<Marker.Icon>
			<IconPlaceholder
				lucide="CheckIcon"
				tabler="IconCheck"
				hugeicons="Tick02Icon"
				phosphor="CheckIcon"
				remixicon="RiCheckLine"
			/>
		</Marker.Icon>
		<Marker.Content>Conversation compacted</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="separator">
		<Marker.Content>
			With a <a href="#/">link to learn more</a>
		</Marker.Content>
	</Marker.Root>
	<Marker.Root variant="separator">
		<Marker.Content>
			<Button variant="outline">
				<IconPlaceholder
					lucide="GitBranchIcon"
					tabler="IconGitBranch"
					hugeicons="GitBranchIcon"
					phosphor="GitBranchIcon"
					remixicon="RiGitBranchLine"
				/>
				Button
			</Button>
		</Marker.Content>
	</Marker.Root>
</Example>
