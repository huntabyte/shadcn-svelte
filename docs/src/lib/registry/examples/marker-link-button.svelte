<script lang="ts">
	import * as Marker from "$lib/registry/ui/marker/index.js";
	import GitBranchIcon from "@lucide/svelte/icons/git-branch";
	import RotateCcwIcon from "@lucide/svelte/icons/rotate-ccw";
	import { toast } from "svelte-sonner";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Marker.Root>
		{#snippet child({ props })}
			<a href="#links-and-buttons" {...props}>
				<Marker.Icon>
					<GitBranchIcon />
				</Marker.Icon>
				<Marker.Content>View the pull request</Marker.Content>
			</a>
		{/snippet}
	</Marker.Root>
	<Marker.Root>
		{#snippet child({ props })}
			<button
				type="button"
				class="hover:text-foreground transition-colors"
				onclick={() => toast("You clicked the revert button")}
				{...props}
			>
				<Marker.Icon>
					<RotateCcwIcon />
				</Marker.Icon>
				<Marker.Content>Revert this change</Marker.Content>
			</button>
		{/snippet}
	</Marker.Root>
</div>
