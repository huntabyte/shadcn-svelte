<script lang="ts">
	import { toast } from "svelte-sonner";
	import * as Bubble from "$lib/registry/ui/bubble/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import Example from "../../../../../routes/(app)/(layout)/(create)/components/example.svelte";
</script>

<Example title="Reactions Buttons">
	<div class="flex w-full max-w-md flex-col gap-8">
		<Bubble.Root>
			<Bubble.Content>This is a one line message.</Bubble.Content>
			<Bubble.Reactions>
				<Button
					variant="outline"
					size="xs"
					onclick={() => toast("You clicked the button in the bubble reaction")}
				>
					Button
				</Button>
			</Bubble.Reactions>
		</Bubble.Root>
		<Bubble.Root align="end">
			<Bubble.Content>This is a one line message.</Bubble.Content>
			<Bubble.Reactions align="start">
				<Button variant="ghost" size="icon-xs" onclick={() => toast("Confetti!")}>🎉</Button>
			</Bubble.Reactions>
		</Bubble.Root>
		<Bubble.Root variant="tinted">
			<Bubble.Content>We are going to the movies first then dinner. Are you in?</Bubble.Content>
			<Bubble.Reactions class="gap-1 bg-background">
				<Button
					variant="secondary"
					size="icon-xs"
					aria-label="Thumbs up"
					onclick={() => toast("You agree!")}
				>
					<IconPlaceholder
						lucide="ThumbsUpIcon"
						tabler="IconThumbUp"
						hugeicons="ThumbsUpIcon"
						phosphor="ThumbsUpIcon"
						remixicon="RiThumbUpLine"
					/>
				</Button>
				<Button
					variant="secondary"
					size="icon-xs"
					aria-label="Thumbs down"
					onclick={() => toast("You disagree!")}
				>
					<IconPlaceholder
						lucide="ThumbsDownIcon"
						tabler="IconThumbDown"
						hugeicons="ThumbsDownIcon"
						phosphor="ThumbsDownIcon"
						remixicon="RiThumbDownLine"
					/>
				</Button>
			</Bubble.Reactions>
		</Bubble.Root>
	</div>
</Example>
