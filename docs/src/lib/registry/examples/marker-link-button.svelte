<script lang="ts">
	import GitBranchIcon from "@lucide/svelte/icons/git-branch";
	import RotateCcwIcon from "@lucide/svelte/icons/rotate-ccw";
	import { toast } from "svelte-sonner";
	import * as Marker from "$lib/registry/ui/marker/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-8 py-12">
	<Marker.Root>
		{#snippet child({ props })}
			<a {...props} href="#links-and-buttons">
				<Marker.Icon><GitBranchIcon /></Marker.Icon>
				<Marker.Content>View the pull request</Marker.Content>
			</a>
		{/snippet}
	</Marker.Root>
	<Marker.Root>
		{#snippet child({ props })}
			<button
				{...props}
				type="button"
				class="hover:text-foreground transition-colors"
				onclick={() => toast("You clicked the revert button")}
			>
				<Marker.Icon><RotateCcwIcon /></Marker.Icon>
				<Marker.Content>Revert this change</Marker.Content>
			</button>
		{/snippet}
	</Marker.Root>
</div>
