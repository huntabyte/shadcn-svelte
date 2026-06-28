<script lang="ts">
	import InfoIcon from "@lucide/svelte/icons/info";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as Popover from "$lib/registry/ui/popover/index.js";
</script>

<div class="flex w-full max-w-sm flex-col gap-4 py-12">
	<Bubble.Root align="end">
		<Bubble.Content>Run the build script.</Bubble.Content>
	</Bubble.Root>
	<Bubble.Root variant="destructive">
		<Bubble.Content>Failed to run the command.</Bubble.Content>
		<Bubble.Reactions>
			<Popover.Root>
				<Popover.Trigger>
					{#snippet child({ props })}
						<Button
							{...props}
							variant="ghost"
							size="icon-xs"
							aria-label="Show error details"
							class="aria-expanded:text-destructive"
						>
							<InfoIcon />
						</Button>
					{/snippet}
				</Popover.Trigger>
				<Popover.Content>
					<Popover.Header>
						<Popover.Title class="text-sm">
							Command failed with exit code 1
						</Popover.Title>
						<Popover.Description class="text-sm">
							ENOENT: no such file or directory, open pnpm-lock.yaml
						</Popover.Description>
					</Popover.Header>
				</Popover.Content>
			</Popover.Root>
		</Bubble.Reactions>
	</Bubble.Root>
</div>
